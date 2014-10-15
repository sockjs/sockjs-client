'use strict';

var expect = require('expect.js')
  , testUtils = require('./test-utils')
  , XhrLocal = require('../../lib/transport/sender/xhr-local')
  , Xdr = require('../../lib/transport/sender/xdr')
  ;

function ajaxSimple (Obj) {
  it('simple', function (done) {
    var x = new Obj('GET', testUtils.getOriginUrl() + '/simple.txt', null);
    x.on('finish', function (status, text) {
      expect(text.length).to.equal(2051);
      expect(text.slice(-2)).to.equal('b\n');
      done();
    });
  });
}

function ajaxStreaming (Obj) {
  it('streaming', function (done) {
    var x = new Obj('GET', testUtils.getOriginUrl() + '/streaming.txt', null);
    x.on('chunk', function (status, text) {
      expect(status).to.equal(200);
      expect(text.length).to.be.lessThan(2050);
      x.removeAllListeners('chunk');
    });
    x.on('finish', function (status, text) {
      expect(status).to.equal(200);
      expect(text.slice(-4)).to.equal('a\nb\n');
      done();
    });
  });
}

function wrongUrl(Obj, url, statuses) {
  it('wrong url ' + url, function (done) {
    var x = new Obj('GET', url, null);
    x.on('chunk', function () {
      expect().fail('No chunk should be received');
    });
    x.on('finish', function (status, text) {
      expect(statuses).to.contain(status);
      expect(text).not.to.be(undefined);
      done();
    });
  });
}

function wrongPort (Obj) {
  var badUrl;
  if (global.location) {
    badUrl = global.location.protocol + '//' + global.location.hostname + ':';
  } else {
    badUrl = 'http://localhost:';
  }

  var ports = [25, 8999, 65300];
  ports.forEach(function (port) {
    wrongUrl(Obj, badUrl + port + '/wrong_url_indeed.txt', [0]);
  });
}

describe('Senders', function () {
  describe('xhr-local', function () {
    ajaxSimple(XhrLocal);
    ajaxStreaming(XhrLocal);
    wrongPort(XhrLocal);
    wrongUrl(XhrLocal, testUtils.getOriginUrl() + '/wrong_url_indeed.txt', [0, 404]);
  });

  describe('xdr', function () {
    if (!Xdr.enabled) {
      it('[unsupported]', function() { expect(true).to.be.ok(); });
      return;
    }
    ajaxSimple(Xdr);
    ajaxStreaming(Xdr);
    wrongPort(Xdr);
    wrongUrl(Xdr, testUtils.getOriginUrl() + '/wrong_url_indeed.txt', [0]);
  });
});
