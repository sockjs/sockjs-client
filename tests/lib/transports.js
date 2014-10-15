/* eslint camelcase: 0 */
'use strict';

var expect = require('expect.js')
  , transportList = require('../../lib/transport-list')
  , testUtils = require('./test-utils')
  , echoTests = require('./echo-tests')
  , batchTests = require('./batch-tests')
  ;

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

      if (!Trans.enabled(testUtils.getUrl('/echo'), { cookie_needed: false, nullOrigin: false })) {
        it('[unsupported]', function () { expect(true).to.be.ok(); });
        return;
      }

      var transport = Trans.transportName;
      echoTests.echoBasic(transport);
      echoTests.echoRich(transport);
      echoTests.echoUnicode(transport);
      echoTests.echoSpecialChars(transport);
      echoTests.echoLargeMessage(transport);
      echoTests.echoUtfEncodingSimple(transport);
      echoTests.echoUtfEncoding(transport);
      echoTests.echoFromChild(transport);

      batchTests.largeMessage(transport);
      batchTests.largeDownload(transport);

      userClose(transport);
      serverClose(transport);
    });
  });
});

function userClose(transport) {
  it('user close', function (done) {
    var sjs = testUtils.newSockJs('/echo', transport);
    expect(sjs).to.be.ok();
    var counter = 0;

    sjs.onopen = function() {
      counter++;
      expect(counter).to.equal(1);
      sjs.close(3000, 'User message');
      expect(counter).to.equal(1);
    };
    sjs.onmessage = function() {
      expect().fail();
      counter++;
    };
    sjs.onclose = function(e) {
      counter++;
      expect(e.wasClean).to.equal(true);
      expect(counter).to.equal(2);
      done();
    };
  });
}

function serverClose(transport) {
  it('server close', function (done) {
    var sjs = testUtils.newSockJs('/close', transport);
    expect(sjs).to.be.ok();
    var i = 0;
    sjs.onopen = function() {
      i++;
    };
    sjs.onmessage = function() {
      expect().fail();
    };
    sjs.onclose = function(e) {
      expect(i).to.equal(1);
      expect(e.code).to.equal(3000);
      expect(e.reason).to.equal('Go away!');
      expect(e.wasClean).to.equal(true);
      done();
    };
  });
}
