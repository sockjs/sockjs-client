'use strict';

var expect = require('expect.js')
  , JSON3 = require('json3')
  ;

describe('utils', function () {
  describe('random', function () {
    var random = require('../../lib/utils/random');
    describe('string', function () {
      it('should generate unique outputs', function () {
        expect(random.string(8)).not.to.equal(random.string(8));
      });

      it('should have the correct length', function () {
        var lengths = [1, 2, 3, 128];
        lengths.forEach(function (len) {
          expect(random.string(len).length).to.equal(len);
        });
      });
    });

    describe('numberString', function () {
      it('should have the correct length based on the max', function () {
        expect(random.numberString(10).length).to.equal(1);
        expect(random.numberString(100).length).to.equal(2);
        expect(random.numberString(1000).length).to.equal(3);
        expect(random.numberString(10000).length).to.equal(4);
        expect(random.numberString(100000).length).to.equal(5);
      });
    });
  });

  describe('origin', function () {
    var origin = require('../../lib/utils/origin');
    it('getOrigin', function () {
      expect(origin.getOrigin('http://a.b/')).to.equal('http://a.b:80');
      expect(origin.getOrigin('http://a.b/c')).to.equal('http://a.b:80');
      expect(origin.getOrigin('http://a.b:123/c')).to.equal('http://a.b:123');
      expect(origin.getOrigin('https://a.b/')).to.equal('https://a.b:443');
      expect(origin.getOrigin('file://a.b/')).to.equal(null);
    });

    it('isSameOriginUrl', function () {
      expect(origin.isSameOriginUrl('http://localhost', 'http://localhost/')).to.be.ok();
      expect(origin.isSameOriginUrl('http://localhost', 'http://localhost/abc')).to.be.ok();
      expect(origin.isSameOriginUrl('http://localhost/', 'http://localhost')).to.be.ok();
      expect(origin.isSameOriginUrl('http://localhost', 'http://localhost')).to.be.ok();
      expect(origin.isSameOriginUrl('http://localhost', 'http://localhost:8080')).to.not.be.ok();
      expect(origin.isSameOriginUrl('http://localhost:8080', 'http://localhost')).to.not.be.ok();
      expect(origin.isSameOriginUrl('http://localhost:8080', 'http://localhost:8080/')).to.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:80/', 'http://127.0.0.1:80/a')).to.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:80', 'http://127.0.0.1:80/a')).to.be.ok();
      expect(origin.isSameOriginUrl('http://localhost', 'http://localhost:80')).to.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1/', 'http://127.0.0.1:80/a')).to.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:9', 'http://127.0.0.1:9999')).to.not.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:99', 'http://127.0.0.1:9999')).to.not.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:999', 'http://127.0.0.1:9999')).to.not.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:9999', 'http://127.0.0.1:9999')).to.be.ok();
      expect(origin.isSameOriginUrl('http://127.0.0.1:99999', 'http://127.0.0.1:9999')).to.not.be.ok();
    });

    it('isSameOriginScheme', function () {
      expect(origin.isSameOriginScheme('http://localhost', 'http://localhost/')).to.be.ok();
      expect(origin.isSameOriginScheme('http://localhost', 'https://localhost/')).to.not.be.ok();
      expect(origin.isSameOriginScheme('http://localhost', 'file://localhost/')).to.not.be.ok();
    });
  });

  describe('escape', function () {
    var escape = require('../../lib/utils/escape');
    describe('quote', function () {
      it('handles empty string', function () {
        expect(escape.quote('')).to.equal('""');
      });

      it('handles non-empty string', function () {
        expect(escape.quote('a')).to.equal('"a"');
      });

      it('handles tab and newline', function () {
        expect(['"\\t"', '"\\u0009"']).to.contain(escape.quote('\t'));
        expect(['"\\n"', '"\\u000a"']).to.contain(escape.quote('\n'));
      });

      it('handles unicode', function () {
        expect(escape.quote('\x00\udfff\ufffe\uffff')).to.equal('"\\u0000\\udfff\\ufffe\\uffff"');
        expect(escape.quote('\ud85c\udff7\ud800\ud8ff')).to.equal('"\\ud85c\\udff7\\ud800\\ud8ff"');
        expect(escape.quote('\u2000\u2001\u0300\u0301')).to.equal('"\\u2000\\u2001\\u0300\\u0301"');
      });

      it('handles all 64K characters round-trip', function () {
        var c = [];
        for (var i = 0; i <= 65536; i++) {
          c.push(String.fromCharCode(i));
        }
        var allChars = c.join('');
        expect(JSON3.parse(escape.quote(allChars))).to.equal(allChars);
      });
    });
  });

  describe('object', function () {
    var objectUtils = require('../../lib/utils/object');
    it('extend', function () {
      var a, b;
      expect(objectUtils.extend({}, {})).to.eql({});
      a = {
        a: 1
      };
      expect(objectUtils.extend(a, {})).to.eql(a);
      expect(objectUtils.extend(a, {
        b: 1
      })).to.eql(a);
      a = {
        a: 1
      };
      b = {
        b: 2
      };
      expect(objectUtils.extend(a, b)).to.eql({
        a: 1,
        b: 2
      });
      expect(a).to.eql({
        a: 1,
        b: 2
      });
      expect(b).to.eql({
        b: 2
      });
    });
  });
});
