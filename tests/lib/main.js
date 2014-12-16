/* eslint new-cap: 0, no-new: 0 */
/* jshint ignore: start */
'use strict';

var expect = require('expect.js')
  , SockJS = require('../../lib/entry')
  ;

describe('SockJS', function() {
  describe('Constructor', function () {
    it('should support construction without new', function () {
      var s = SockJS('http://localhost');
      expect(s).to.be.a(SockJS);
      s.close();
    });

    it('create a valid WebSocket object', function () {
      var s = new SockJS('http://localhost');
      expect(s).to.have.property('url', 'http://localhost');
      expect(s).to.have.property('readyState', SockJS.CONNECTING);
      expect(s).to.have.property('extensions', '');
      expect(s).to.have.property('protocol', '');
      s.close();
    });

    it('should not remove basic authentication credentials', function () {
      var s = new SockJS('http://user:password@localhost');
      expect(s).to.have.property('url', 'http://user:password@localhost');
      s.close();
    });

    describe('WebSocket specification step #1', function () {
      it('should throw TypeError for a null url', function () {
        expect(function () {
          new SockJS();
        }).to.throwException(function (e) {
          expect(e).to.be.a(TypeError);
        });
      });

      it('should throw SyntaxError when the url contains a fragment', function () {
        expect(function () {
          new SockJS('http://localhost/#test');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });

      it('should throw SyntaxError for an invalid protocol', function () {
        expect(function () {
          new SockJS('ftp://localhost');
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });
    });

    describe('WebSocket specification step #5', function () {
      it('should throw SyntaxError for duplicated protocols', function () {
        expect(function () {
          new SockJS('http://localhost', ['test', 'test']);
        }).to.throwException(function (e) {
          expect(e).to.be.a(SyntaxError);
        });
      });
    });
  });
});
