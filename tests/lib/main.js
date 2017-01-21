/* eslint new-cap: "off", no-new: "off" */
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

    it('should not remove basic authentication credentials (1/2)', function () {
      var s = new SockJS('http://user@localhost');
      expect(s).to.have.property('url', 'http://user@localhost');
      s.close();
    });

    it('should not remove basic authentication credentials (2/2)', function () {
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

    it('should generate 8-character-long session ids by default', function () {
      var s = SockJS('http://localhost');
      expect(s._generateSessionId().length).to.be(8);
      s.close();
    });

    it('should generate N-character-long session ids', function () {
      for (var i = 1; i <= 100; i++) {
        var s = SockJS('http://localhost', null, {sessionId: i});
        expect(s._generateSessionId().length).to.be(i);
        s.close();
      }
    });

    it('should generate sessionIds using the custom generator function', function () {
      var f = function() {
        return 'this_is_not_random';
      };
      var s = SockJS('http://localhost', null, {sessionId: f});
      expect(s._generateSessionId).to.be(f);
      s.close();
    });

    it('should throw TypeError if sessionId is neither a number nor a function', function () {
        expect(function () {
          new SockJS('http://localhost', null, {sessionId: 'this is wrong'});
        }).to.throwException(function (e) {
          expect(e).to.be.a(TypeError);
        });
    });
  });
});
