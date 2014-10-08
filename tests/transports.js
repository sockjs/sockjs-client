'use strict';

var expect = require('expect.js')
  , fs = require('fs')
  , path = require('path')
  , EventTarget = require('../lib/polyfills/eventtarget')
  ;

var transportFiles = [];
var dir = path.resolve(__dirname, '../lib/transport');
var files = fs.readdirSync(dir);
files.forEach(function (file) {
  if (file[0] === '.') {
    return;
  }
  transportFiles.push(path.resolve(dir, file));
});

describe('Transports', function () {
  transportFiles.forEach(function (tf) {
    describe(path.basename(tf, '.js'), function () {
      it('has a valid interface', function () {
        var Trans = require(tf);
        expect(Trans).to.be.ok();
        expect(Trans).to.have.property('transportName');
        expect(Trans.transportName.length).to.be.greaterThan(0);

        expect(Trans).to.have.property('roundTrips');
        expect(Trans.roundTrips).to.be.a('number');

        expect(Trans).to.have.property('enabled');
        expect(Trans.enabled).to.be.a('function');

        //expect(new Trans('http://localhost')).to.be.an(EventTarget);
        // TODO tests for event emitting
      });
    });
  });
});
