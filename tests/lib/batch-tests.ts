'use strict';
var expect = require('expect.js')
  , testUtils = require('./test-utils')
  , debug = require('debug')('sockjs-client:tests:batch')
  ;

function batchFactory(transport, messages, url) {
  return function(done) {
    var test = this.runnable();
    var title = test.fullTitle();
    debug('start', title);
    this.timeout(10000);
    var sjs = testUtils.newSockJs(url + '/echo', transport);
    var counter = 0;
    sjs.onopen = function () {
      messages.forEach(function (m) {
        sjs.send(m);
      });
    };
    sjs.onmessage = function (e) {
      try {
        expect(e.data).to.eql(messages[counter]);
      } catch (err) {
        done(err);
        sjs.close();
        return;
      }

      counter++;
      if (counter === messages.length) {
        sjs.close();
      }
    };
    sjs.onclose = function (e) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(e.code).to.equal(1000);
        expect(counter).to.equal(messages.length);
      } catch (err) {
        done(err);
        return;
      }
      done();
      debug('end', title);
    };
  };
}

module.exports.largeMessage = function(url, transport) {
  var messages = [new Array(Math.pow(2, 1)).join('x'), new Array(Math.pow(2, 2)).join('x'), new Array(Math.pow(2, 4)).join('x'), new Array(Math.pow(2, 8)).join('x'), new Array(Math.pow(2, 13)).join('x'), new Array(Math.pow(2, 13)).join('x')];
  it('large message (batch)', batchFactory(transport, messages, url));
};

function amplifyFactory(transport, messages, url) {
  return function(done) {
    var test = this.runnable();
    var title = test.fullTitle();
    debug('start', title);
    this.timeout(10000);
    var sjs = testUtils.newSockJs(url + '/amplify', transport);
    var counter = 0;
    sjs.onopen = function () {
      messages.forEach(function (m) {
        sjs.send(m);
      });
    };
    sjs.onmessage = function (e) {
      try {
        expect(e.data).to.have.length(Math.pow(2, messages[counter]));
      } catch (err) {
        done(err);
        sjs.close();
        return;
      }
      counter++;
      if (counter === messages.length) {
        sjs.close();
      }
    };
    sjs.onclose = function (e) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(e.code).to.equal(1000);
        expect(counter).to.equal(messages.length);
      } catch (err) {
        done(err);
        return;
      }

      done();
      debug('end', title);
    };
  };
}

module.exports.largeDownload = function(url, transport) {
  var messages = [1, 2, 4, 8, 13, 15, 15];
  it('large download', amplifyFactory(transport, messages, url));
};
