'use strict';
var expect = require('expect.js')
  , testUtils = require('./test-utils')
  ;

function batchFactory(transport, messages) {
  return function(done) {
    this.timeout(10000);
    var sjs = testUtils.newSockJs('/echo', transport);
    var counter = 0;
    sjs.onopen = function () {
      messages.forEach(function (m) {
        sjs.send(m);
      });
    };
    sjs.onmessage = function (e) {
      expect(e.data).to.eql(messages[counter]);
      counter++;
      if (counter === messages.length) {
        sjs.close();
      }
    };
    sjs.onclose = function (e) {
      expect(e.code).to.equal(1000);
      expect(counter).to.equal(messages.length);
      done();
    };
  };
}

module.exports.largeMessage = function(transport) {
  var messages = [new Array(Math.pow(2, 1)).join('x'), new Array(Math.pow(2, 2)).join('x'), new Array(Math.pow(2, 4)).join('x'), new Array(Math.pow(2, 8)).join('x'), new Array(Math.pow(2, 13)).join('x'), new Array(Math.pow(2, 13)).join('x')];
  it('large message (batch)', batchFactory(transport, messages));
};

function amplifyFactory(transport, messages) {
  return function(done) {
    this.timeout(10000);
    var sjs = testUtils.newSockJs('/amplify', transport);
    var counter = 0;
    sjs.onopen = function () {
      messages.forEach(function (m) {
        sjs.send(m);
      });
    };
    sjs.onmessage = function (e) {
      expect(e.data).to.have.length(Math.pow(2, messages[counter]));
      counter++;
      if (counter === messages.length) {
        sjs.close();
      }
    };
    sjs.onclose = function (e) {
      expect(e.code).to.equal(1000);
      expect(counter).to.equal(messages.length);
      done();
    };
  };
}

module.exports.largeDownload = function(transport) {
  var messages = [1, 2, 4, 8, 13, 15, 15];
  it('large download', amplifyFactory(transport, messages));
};
