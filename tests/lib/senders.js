'use strict';

var expect = require('expect.js')
  , testUtils = require('./test-utils')
  , XhrLocal = require('../../lib/transport/sender/xhr-local')
  , XhrCors = require('../../lib/transport/sender/xhr-cors')
  , Xdr = require('../../lib/transport/sender/xdr')
  ;

function ajaxSimple (Obj) {
  it('simple', function (done) {
    var x = new Obj('GET', testUtils.getSameOriginUrl() + '/simple.txt', null);
    x.on('finish', function (status, text) {
      try {
        expect(text.length).to.equal(2051);
        expect(text.slice(-2)).to.equal('b\n');
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });
}

function ajaxStreaming (Obj) {
  if (!XhrCors.enabled) {
    it('streaming [unsupported]');
    return;
  }

  it('streaming', function (done) {
    var test = this.runnable();
    var x = new Obj('GET', testUtils.getSameOriginUrl() + '/streaming.txt', null);
    var i = 0;
    x.on('chunk', function (status/*, text*/) {
      try {
        expect(status).to.equal(200);
      } catch (e) {
        done(e);
        x.abort();
        return;
      }
      i++;
      // 2051 because of transparent proxies
      //expect([2049, 2051]).to.contain(text.length);
    });
    x.on('finish', function (status, text) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(i).to.be.greaterThan(0);
        expect(status).to.equal(200);
        expect(text.slice(-4)).to.equal('a\nb\n');
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });
}

function wrongUrl(Obj, url, statuses) {
  it('wrong url ' + url, function (done) {
    var test = this.runnable();
    // Selenium has a long timeout for when it can't connect to the port
    this.timeout(30000);
    var x = new Obj('GET', url, null);
    x.timeout = 10000;
    x.on('chunk', function (status, text) {
      done(new Error('No chunk should be received: ' + status + ', ' + text));
      x.abort();
    });
    x.on('finish', function (status, text) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(statuses).to.contain(status);
        expect(text).not.to.be(undefined);
      } catch (e) {
        done(e);
        return;
      }
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
    // Sauce Labs/Selenium returns 400 when it can't connect to the port
    wrongUrl(Obj, badUrl + port + '/wrong_url_indeed.txt', [0, 400]);
  });
}

describe('Senders', function () {
  describe('xhr-local', function () {
    ajaxSimple(XhrLocal);
    ajaxStreaming(XhrLocal);
    // TODO senders don't have a timeouts so these tests can fail
    // BUT info-receiver has a timeout so they will never not-return
    // wrongPort(XhrLocal);
    wrongUrl(XhrLocal, testUtils.getSameOriginUrl() + '/wrong_url_indeed.txt', [0, 404]);
  });

  describe('xdr', function () {
    if (!Xdr.enabled) {
      it('[unsupported]');
      return;
    }
    ajaxSimple(Xdr);
    ajaxStreaming(Xdr);
    wrongPort(Xdr);
    wrongUrl(Xdr, testUtils.getSameOriginUrl() + '/wrong_url_indeed.txt', [0, 400]);
  });
});
