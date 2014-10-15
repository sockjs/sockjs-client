'use strict';

var expect = require('expect.js')
  , proxyquire = require('proxyquire')
  , SecurityError = require('../../lib/error/securityerror')
  ;

describe('SockJS', function() {
  describe('Constructor', function () {

    describe('WebSocket specification step #2', function () {
      it('should throw SecurityError for an insecure url from a secure page', function () {
        var main = proxyquire('../../lib/main', { './polyfills/location': {
          protocol: 'https'
        }});
        var sjs = proxyquire('../../lib/entry', { './main': main });
        expect(function () {
          sjs('http://localhost');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SecurityError);
        });
      });
    });

  });
});
