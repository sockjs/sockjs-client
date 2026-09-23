/* eslint no-unused-vars: "off" */
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

    it('send() returns the value reported by the transport', function() {
      var sjs = SockJS(testUtils.getSameOriginUrl());
      sjs.readyState = SockJS.OPEN;
      sjs._transport = { send: function() { return false; }, close: function() {} };
      expect(sjs.send('nope')).to.equal(false);

      sjs._transport = { send: function() { return true; }, close: function() {} };
      expect(sjs.send('yep')).to.equal(true);

      sjs.close();
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

    it('reports websocket backpressure through send()', function(done) {
      var sjs = new SockJS(testUtils.getSameOriginUrl() + '/echo', null, { transports: ['websocket'] });
      sjs.onopen = function() {
        var result = sjs.send('hello');
        sjs.close();

        try {
          expect(typeof result).to.equal('boolean');
          expect(result).to.equal(true);
        } catch (e) {
          done(e);
          return;
        }
        done();
      };
      sjs.onerror = function() {
        done(new Error('connection failed'));
      };
    });
  });
});
