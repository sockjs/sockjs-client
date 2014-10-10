'use strict';

var expect = require('expect.js')
  , fs = require('fs')
  , path = require('path')
  ;

var transportFiles = [];
var dir = path.resolve(__dirname, '../lib/transport');
var files = fs.readdirSync(dir);
files.forEach(function (file) {
  if (file[0] === '.') {
    return;
  }
  var fileName = path.resolve(dir, file);
  var stat = fs.statSync(fileName);
  if (stat && stat.isDirectory()) {
    return;
  }
  transportFiles.push(fileName);
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

        //var t = new Trans('http://localhost');

        expect(Trans.prototype).to.have.property('send');
        expect(Trans.prototype.send).to.be.a('function');

        expect(Trans.prototype).to.have.property('close');
        expect(Trans.prototype.close).to.be.a('function');

        //expect().to.be.an(EventTarget);
        // TODO tests for event emitting
      });
    });
  });
});
