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
          sjs('http://example.com');
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

      it('should NOT throw SecurityError for localhost and *.localhost urls from a secure page', function () {
        ['http://localhost', 'http://localhost:3008', 'http://LOCALHOST', 'http://localhost.', 'http://app.localhost', 'http://a.b.localhost:8080'].forEach(function (url) {
          expect(function () {
            sjs(url);
          }).to.not.throwException();
        });
      });

      it('should throw SecurityError for a host that only contains localhost', function () {
        ['http://notlocalhost', 'http://localhost.example.com', 'http://localhostx'].forEach(function (url) {
          expect(function () {
            sjs(url);
          }).to.throwException(function (e) {
            expect(e.message).to.contain('SecurityError');
          });
        });
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
