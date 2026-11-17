'use strict';

var expect = require('expect.js')
  , proxyquire = require('proxyquire')
  ;

describe('SockJS', function() {
  describe('A listener that throws', function () {
    var SockJS = require('../../lib/entry');

    it('should not stop the other listeners and the rest of a frame', function (done) {
      var s = new SockJS('http://localhost');
      // an open socket, with a stub transport
      s._transport = { transportName: 'stub', close: function () {} };
      s._transportMessage('o');

      // The exception is reported in a new task. The test takes the reports
      // from mocha for this time, and then gives them back.
      var handlers = process.listeners('uncaughtException');
      var reported = [];
      process.removeAllListeners('uncaughtException');
      process.on('uncaughtException', function (err) {
        reported.push(err.message);
      });

      var first = [];
      var second = [];
      s.onmessage = function (e) {
        first.push(e.data);
        if (e.data === '1') {
          throw new Error('listener error');
        }
      };
      s.addEventListener('message', function (e) {
        second.push(e.data);
      });
      var thrown = null;
      try {
        s._transportMessage('a["1","2","3"]');
      } catch (err) {
        thrown = err.message;
      }

      setTimeout(function () {
        process.removeAllListeners('uncaughtException');
        handlers.forEach(function (h) {
          process.on('uncaughtException', h);
        });
        s.close();
        try {
          expect(thrown).to.be(null);
          expect(first).to.eql(['1', '2', '3']);
          expect(second).to.eql(['1', '2', '3']);
          expect(reported).to.eql(['listener error']);
          done();
        } catch (err) {
          done(err);
        }
      }, 10);
    });
  });

  describe('Constructor', function () {

    describe('WebSocket specification step #2', function () {
      var main = proxyquire('../../lib/main', { './location': {
        protocol: 'https:'
      }});
      var sjs = proxyquire('../../lib/entry', { './main': main });

      it('should throw SecurityError for an insecure url from a secure page', function () {
        expect(function () {
          sjs('http://localhost');
        }).to.throwException(function (e) {
          expect(e).to.be.a(Error);
          expect(e.message).to.contain('SecurityError');
        });
      });

      // https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
      it('should NOT throw SecurityError for 127.0.0.1/8 url from a secure page', function () {
        expect(function () {
          sjs('http://127.0.0.1');
        }).to.not.throwException();
      });

      it('should NOT throw SecurityError for ::1 url from a secure page', function () {
        expect(function () {
          sjs('http://[::1]');
        }).to.not.throwException();
      });

      it('should throw SyntaxError for an invalid url', function () {
        expect(function () {
          sjs('//localhost');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });

      it('should throw SyntaxError for an empty url - #8', function () {
        expect(function () {
          sjs('');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });
    });

  });
});
