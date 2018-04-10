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
