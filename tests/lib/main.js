/* eslint new-cap: 0, no-new: 0 */
/* jshint ignore: start */
'use strict';

var expect = require('expect.js')
  // , proxyquire = require('proxyquire')
  // , SecurityError = require('../../lib/error/securityerror')
  , SockJS = require('../../lib/entry')
  ;

describe('SockJS', function() {
  describe('Constructor', function () {
    it('should support construction without new', function () {
      var s = SockJS('http://sockjs.org');
      expect(s).to.be.a(SockJS);
    });

    it('create a valid WebSocket object', function () {
      var s = new SockJS('http://sockjs.org');
      expect(s).to.have.property('url', 'http://sockjs.org');
      expect(s).to.have.property('readyState', SockJS.CONNECTING);
      expect(s).to.have.property('extensions', '');
      expect(s).to.have.property('protocol', '');
    });

    describe('WebSocket specification step #1', function () {
      it('should throw SyntaxError for an invalid url', function () {
        expect(function () {
          new SockJS('//sockjs.org');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });

        expect(function () {
          new SockJS('http://');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });

      it('should throw SyntaxError when the url contains a querystring or fragment', function () {
        expect(function () {
          new SockJS('http://sockjs.org/?test');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });

         expect(function () {
          new SockJS('http://sockjs.org/#test');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });

      it('should throw SyntaxError for an invalid protocol', function () {
        expect(function () {
          new SockJS('ftp://sockjs.org');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });
    });

    // describe('WebSocket specification step #2', function () {
    //   it('should throw SecurityError for an insecure url from a secure page', function () {
    //     var main = proxyquire('../../lib/main', { './polyfills/location': {
    //       protocol: 'https'
    //     }});
    //     var sjs = proxyquire('../../lib/entry', { './main': main });
    //     expect(function () {
    //       sjs('http://sockjs.org');
    //     }).to.throwException(function (e) {
    //       expect(e).to.be.a(SecurityError);
    //     });
    //   });
    // });

    describe('WebSocket specification step #5', function () {
      it('should throw SyntaxError for duplicated protocols', function () {
        expect(function () {
          new SockJS('http://sockjs.org', ['test', 'test']);
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });
    });
  });
});
