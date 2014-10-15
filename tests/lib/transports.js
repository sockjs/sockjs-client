/* eslint camelcase: 0 */
'use strict';

var expect = require('expect.js')
  , transportList = require('../../lib/transport-list')
  , testUtils = require('./test-utils')
  ;

function echoFactory(transport, messages) {
  return function (done) {
    this.timeout(10000);
    var msgs = messages.slice(0);

    var sjs = testUtils.newSockJs('/echo', transport);
    sjs.onopen = function () {
      sjs.send(msgs[0]);
    };
    sjs.onmessage = function (e) {
      // TODO don't like having to force the element toString here
      expect(e.data).to.eql('' + msgs[0]);
      msgs.shift();
      if (typeof msgs[0] === 'undefined') {
        sjs.close();
      } else {
        sjs.send(msgs[0]);
      }
    };
    sjs.onclose = function (e) {
      expect(e.code).to.equal(1000);
      expect(msgs).to.have.length(0);
      done();
    };
  };
}

function echoBasic(transport) {
  var messages = ['data'];
  it('echo basic', echoFactory(transport, messages));
}

function echoRich(transport) {
  var messages = [
    [1, 2, 3, 'data'], null, false, 'data', 1, 12.0, {
      a: 1,
      b: 2
    }
  ];
  it('echo rich', echoFactory(transport, messages));
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

      if (!Trans.enabled(testUtils.getUrl('/echo'), { cookie_needed: false, nullOrigin: false })) {
        it('[unsupported]', function () { expect(true).to.be.ok(); });
        return;
      }

      echoBasic(Trans.transportName);
      echoRich(Trans.transportName);
    });
  });
});
