/* eslint camelcase: 0 */
'use strict';

var expect = require('expect.js')
  , transportList = require('../../lib/transport-list')
  , testUtils = require('./test-utils')
  , echoTests = require('./echo-tests')
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

      echoTests.echoBasic(Trans.transportName);
      echoTests.echoRich(Trans.transportName);
      echoTests.echoUnicode(Trans.transportName);
      echoTests.echoSpecialChars(Trans.transportName);
      echoTests.echoLargeMessage(Trans.transportName);
      echoTests.echoUtfEncodingSimple(Trans.transportName);
      echoTests.echoUtfEncoding(Trans.transportName);
      echoTests.echoFromChild(Trans.transportName);
    });
  });
});
