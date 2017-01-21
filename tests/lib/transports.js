/* eslint camelcase: "off" */
'use strict';

var expect = require('expect.js')
  , transportList = require('../../lib/transport-list')
  , testUtils = require('./test-utils')
  , echoTests = require('./echo-tests')
  , batchTests = require('./batch-tests')
  , SockJS = require('../../lib/entry')
  ;

function userClose(url, transport) {
  it('user close', function (done) {
    var test = this.runnable();
    this.timeout(10000);
    var sjs = new SockJS(url + '/echo', null, { transports: transport });
    expect(sjs).to.be.ok();
    var counter = 0;

    sjs.onopen = function() {
      counter++;
      try {
        expect(counter).to.equal(1);
        sjs.close(3000, 'User message');
        expect(counter).to.equal(1);
      } catch (e) {
        done(e);
      }
    };
    sjs.onmessage = function() {
      done(new Error());
      sjs.close();
      counter++;
    };
    sjs.onclose = function(e) {
      if (test.timedOut || test.duration) {
        return;
      }

      counter++;
      try {
        expect(e.wasClean).to.equal(true);
        expect(counter).to.equal(2);
      } catch (err) {
        done(err);
        return;
      }

      done();
    };
  });
}

function serverClose(url, transport) {
  it('server close', function (done) {
    var test = this.runnable();
    this.timeout(10000);
    var sjs = new SockJS(url + '/close', null, { transports: transport });
    expect(sjs).to.be.ok();
    var i = 0;
    sjs.onopen = function() {
      i++;
    };
    sjs.onmessage = function() {
      done(new Error());
      sjs.close();
    };
    sjs.onclose = function(e) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(i).to.equal(1);
        expect(e.code).to.equal(3000);
        expect(e.reason).to.equal('Go away!');
        expect(e.wasClean).to.equal(true);
      } catch (err) {
        done(err);
        return;
      }
      done();
    };
  });
}

function runTests(url, transport) {
  echoTests.echoBasic(url, transport);
  echoTests.echoQueryString(url, transport);
  echoTests.echoRich(url, transport);
  echoTests.echoUnicode(url, transport);
  echoTests.echoSpecialChars(url, transport);
  echoTests.echoLargeMessage(url, transport);
  echoTests.echoUtfEncodingSimple(url, transport);
  echoTests.echoUtfEncoding(url, transport);

  batchTests.largeMessage(url, transport);
  batchTests.largeDownload(url, transport);

  userClose(url, transport);
  serverClose(url, transport);
}

describe('Transports', function () {
  transportList.forEach(function (Trans) {
    describe(Trans.transportName, function () {
      it('has a valid interface', function () {
        expect(Trans).to.be.ok();
        expect(Trans).to.have.property('transportName');
        expect(Trans.transportName.length).to.be.greaterThan(0);

        expect(Trans).to.have.property('roundTrips');
        expect(Trans.roundTrips).to.be.a('number');

        expect(Trans).to.have.property('enabled');
        expect(Trans.enabled).to.be.a('function');

        expect(Trans.prototype).to.have.property('send');
        expect(Trans.prototype.send).to.be.a('function');

        expect(Trans.prototype).to.have.property('close');
        expect(Trans.prototype.close).to.be.a('function');

        //var t = new Trans('http://localhost');
        //expect(t).to.be.an(EventEmitter);
        // TODO tests for event emitting
      });

      if (!Trans.enabled({ cookie_needed: false, nullOrigin: false, sameScheme: true, sameOrigin: true })) {
        it('[unsupported]');
        return;
      }

      var transport = Trans.transportName;

      var soUrl = testUtils.getSameOriginUrl();
      describe('same origin', function () {
        runTests(soUrl, transport);
      });

      // var corsUrl = testUtils.getCrossOriginUrl();
      // if (corsUrl && corsUrl !== soUrl) {
      //   describe('cross origin', function () {
      //     runTests(corsUrl, transport);
      //   });
      // }
    });
  });
});
