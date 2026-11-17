'use strict';

var expect = require('expect.js')
  , proxyquire = require('proxyquire')
  ;

describe('SockJS', function() {
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

  describe('close while CONNECTING', function () {
    var SockJS = require('../../lib/entry');

    function expectFailedClose(s, done) {
      var events = [];
      s.onerror = function () {
        events.push('error');
      };
      s.onclose = function (e) {
        try {
          expect(events).to.eql(['error']);
          expect(e.code).to.be(1006);
          expect(e.wasClean).to.be(false);
          done();
        } catch (err) {
          done(err);
        }
      };
      s.close();
    }

    it('should fail the connection while the info request is pending', function (done) {
      expectFailedClose(new SockJS('http://localhost'), done);
    });

    it('should fail the connection while a transport connects', function (done) {
      var s = new SockJS('http://localhost');
      // The info request is done, so _close() has no InfoReceiver to close.
      s._ir.close();
      s._ir = null;
      expectFailedClose(s, done);
    });
  });
});
