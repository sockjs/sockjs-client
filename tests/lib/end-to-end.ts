'use strict';

var expect = require('expect.js')
  , testUtils = require('./test-utils')
  , XDR = require('../../lib/transport/sender/xdr')
  , XHRCors = require('../../lib/transport/sender/xhr-cors')
  , InfoIframe = require('../../lib/info-iframe')
  ;

describe('End to End', function () {
  // selenium needs a long time to timeout
  this.timeout(30000);

  describe('Connection Errors', function () {
    it('invalid url 404', function (done) {
      var test = this.runnable();
      var sjs = testUtils.newSockJs('/invalid_url', 'jsonp-polling');
      expect(sjs).to.be.ok();
      sjs.onopen = sjs.onmessage = function () {
        done(new Error('Open/Message event should not fire for an invalid url'));
        sjs.close();
      };
      sjs.onclose = function (e) {
        if (test.timedOut || test.duration) {
          return;
        }

        try {
          expect(e.code).to.equal(1002);
          expect(e.reason).to.equal('Cannot connect to server');
          expect(e.wasClean).to.equal(false);
        } catch (err) {
          done(err);
          return;
        }

        done();
      };
    });

    // TODO this isn't a great way to disable this test
    if (!XHRCors.enabled && !XDR.enabled && !InfoIframe.enabled()) {
      // CORS unsupported, won't actually hit info server
      it('invalid url port [unsupported]');
      return;
    } else {
      it('invalid url port', function (done) {
        var test = this.runnable();
        var badUrl;
        if (global.location) {
          badUrl = global.location.protocol + '//' + global.location.hostname + ':1079';
        } else {
          badUrl = 'http://localhost:1079';
        }

        var sjs = testUtils.newSockJs(badUrl, 'jsonp-polling');
        expect(sjs).to.be.ok();
        sjs.onopen = sjs.onmessage = function () {
          done(new Error('Open/Message event should not fire for an invalid port'));
          sjs.close();
        };
        sjs.onclose = function (e) {
          if (test.timedOut || test.duration) {
            return;
          }

          try {
            expect(e.code).to.equal(1002);
            expect(e.reason).to.equal('Cannot connect to server');
            expect(e.wasClean).to.equal(false);
          } catch (err) {
            done(err);
            return;
          }

          done();
        };
      });
    }

    it('disabled websocket test', function (done) {
      var test = this.runnable();
      var sjs = testUtils.newSockJs('/disabled_websocket_echo', 'websocket');
      expect(sjs).to.be.ok();
      sjs.onopen = sjs.onmessage = function () {
        done(new Error('Open/Message event should not fire for disabled websockets'));
        sjs.close();
      };
      sjs.onclose = function (e) {
        if (test.timedOut || test.duration) {
          return;
        }

        try {
          expect(e.code).to.equal(2000);
          expect(e.reason).to.equal('All transports failed');
          expect(e.wasClean).to.equal(false);
        } catch (err) {
          done(err);
          return;
        }
        done();
      };
    });

    it('close on close', function (done) {
      var test = this.runnable();
      var sjs = testUtils.newSockJs('/close');
      expect(sjs).to.be.ok();
      sjs.onopen = function () {
        expect(true).to.be.ok();
      };
      sjs.onmessage = function () {
        done(new Error('Message should not be emitted'));
        sjs.close();
      };
      sjs.onclose = function (e) {
        if (test.timedOut || test.duration) {
          return;
        }

        try {
          expect(e.code).to.equal(3000);
          expect(e.reason).to.equal('Go away!');
          expect(e.wasClean).to.equal(true);
        } catch (err) {
          done(err);
          return;
        }

        sjs.onclose = function () {
          done(new Error());
        };
        sjs.close();
        setTimeout(function () {
          done();
        }, 10);
      };
    });
  });
});
