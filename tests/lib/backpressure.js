'use strict';

var expect = require('expect.js')
  , EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , proxyquire = require('proxyquire')
  , testUtils = require('./test-utils')
  , SockJS = require('../../lib/entry')
  ;

// A minimal stand-in for the Node WebSocket driver (faye-websocket), which is
// the only driver reporting backpressure today: `send()` returns a boolean and
// a `drain` event is emitted once the socket buffer has been flushed.
//
// Note that this fake only models the EventEmitter side of the driver (the one
// used for `drain`). It deliberately does not implement the
// `onmessage`/`onclose`/`onerror` property side that `WebSocketTransport` uses
// for messages and closes, so it is not a general-purpose driver fake.
function FakeDriver(url) {
  EventEmitter.call(this);
  this.url = url;
  this.sendResult = true;
  this.sent = [];
}
inherits(FakeDriver, EventEmitter);
FakeDriver.prototype.send = function(message) {
  this.sent.push(message);
  return this.sendResult;
};
FakeDriver.prototype.close = function() {
  this.emit('close', { code: 1000, reason: '' });
};

var WebSocketTransport = proxyquire('../../lib/transport/websocket', {
  './driver/websocket': FakeDriver
});

describe('backpressure', function() {

  describe('WebSocketTransport', function() {
    function newTransport() {
      return new WebSocketTransport(testUtils.getSameOriginUrl(), testUtils.getSameOriginUrl());
    }

    it('returns the value reported by the underlying socket', function() {
      var transport = newTransport();

      transport.ws.sendResult = false;
      expect(transport.send('one')).to.equal(false);

      transport.ws.sendResult = true;
      expect(transport.send('two')).to.equal(true);

      expect(transport.ws.sent).to.eql(['[one]', '[two]']);
      transport.close();
    });

    it('forwards drain events from the underlying socket', function(done) {
      var transport = newTransport();
      transport.on('drain', function() {
        transport.close();
        done();
      });
      transport.ws.emit('drain');
    });

    it('stops forwarding drain events once closed', function() {
      var transport = newTransport();
      var ws = transport.ws;
      var drained = 0;

      transport.on('drain', function() { drained++; });
      ws.emit('drain');
      expect(drained).to.equal(1);

      transport.close();
      expect(transport.listenerCount('drain')).to.equal(0);

      ws.emit('drain');
      expect(drained).to.equal(1);
    });
  });

  describe('SockJS', function() {
    it('send() returns false once the connection is no longer open', function() {
      var sjs = SockJS(testUtils.getSameOriginUrl());
      sjs.close();
      expect(sjs.readyState).to.not.equal(SockJS.OPEN);
      expect(sjs.send('nope')).to.equal(false);
    });

    it('send() normalizes the transport reply to a boolean', function(done) {
      // Use a real connection so that the transport below is a real one, and
      // put it back before close() so the connection is actually torn down.
      var sjs = testUtils.newSockJs('/echo', 'websocket');

      sjs.onopen = function() {
        var transport = sjs._transport;

        function stub(result) {
          return { send: function() { return result; }, close: function() {} };
        }

        try {
          // The transport reports backpressure: `send()` says "back off".
          sjs._transport = stub(false);
          expect(sjs.send('nope')).to.equal(false);

          // The transport accepted the message.
          sjs._transport = stub(true);
          expect(sjs.send('yep')).to.equal(true);

          // Transports with no backpressure signal return `undefined` (the
          // native browser WebSocket, BufferedSender, ...). They did accept the
          // message, so `send()` must report `true` and not the falsy
          // `undefined` - the documented `if (!sock.send(chunk))` idiom would
          // otherwise stall them.
          sjs._transport = stub(undefined);
          expect(sjs.send('maybe')).to.equal(true);
        } catch (e) {
          sjs._transport = transport;
          sjs.close();
          done(e);
          return;
        }

        sjs._transport = transport;
        sjs.close();
        done();
      };

      sjs.onerror = function() {
        done(new Error('connection failed'));
      };
    });

    it('dispatches drain events coming from the transport', function(done) {
      var sjs = new SockJS(testUtils.getSameOriginUrl() + '/echo', null, { transports: ['websocket'] });
      sjs.onopen = function() {
        expect(sjs.transport).to.equal('websocket');

        sjs.addEventListener('drain', function() {
          sjs.close();
          done();
        });

        // The transport is a websocket one, so it is an EventEmitter.
        sjs._transport.emit('drain');
      };
      sjs.onerror = function() {
        done(new Error('connection failed'));
      };
    });

    // The synthetic tests above prove the wiring. This one proves the premise:
    // that a real faye-websocket client ever returns `false`, that a real
    // `drain` follows it, and that sends are accepted again afterwards. It is
    // also the test that would catch faye-websocket quietly changing this.
    //
    // `faye-websocket`'s `send()` returns the result of `messages.write()` and
    // re-emits the `drain` produced by the same stream, so this is not two
    // buffers that can diverge: `websocket-driver` sets `messages._paused` to
    // `true` only from `IO#pause()` (i.e. the socket pipe backed up) and emits
    // `drain` from `IO#resume()`, which clears that same flag. A `false` is
    // therefore always followed by a `drain`.
    it('reports real backpressure from the underlying socket, then drains', function(done) {
      this.timeout(10000);

      var sjs = new SockJS(testUtils.getSameOriginUrl() + '/echo', null, { transports: ['websocket'] });
      var payload = new Array(65537).join('x'); // 64 KiB per message
      var maxSends = 500; // ~32 MiB; a cap so a regression fails instead of hanging
      var sent = 0;
      var sawBackpressure = false;
      var drainTimer;

      function fail(err) {
        clearTimeout(drainTimer);
        sjs.close();
        done(err);
      }

      sjs.onopen = function() {
        // Send synchronously, without ever yielding to the event loop, so the
        // socket write buffer fills up and the transport has to report
        // backpressure.
        for (; sent < maxSends; sent++) {
          if (sjs.send(payload) === false) {
            sawBackpressure = true;
            break;
          }
        }

        if (!sawBackpressure) {
          fail(new Error('send() never reported backpressure after ' + sent + ' sends'));
          return;
        }

        // Only the Node websocket transport emits `drain`, so guard the wait:
        // if the signal stops being forwarded the test should fail, not hang.
        drainTimer = setTimeout(function() {
          fail(new Error('no drain event after backpressure'));
        }, 5000);

        sjs.addEventListener('drain', function onDrain() {
          sjs.removeEventListener('drain', onDrain);
          clearTimeout(drainTimer);

          try {
            expect(sawBackpressure).to.equal(true);
            // The buffer has been flushed: sending is accepted again.
            expect(sjs.send('after-drain')).to.equal(true);
          } catch (e) {
            fail(e);
            return;
          }
          sjs.close();
          done();
        });
      };

      sjs.onerror = function() {
        fail(new Error('connection failed'));
      };
    });
  });
});
