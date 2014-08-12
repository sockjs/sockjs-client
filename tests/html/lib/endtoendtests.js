'use strict';
/* global test, suite */

var assert = require('assert');
var u = require('../../../lib/utils');
var testutils = require('./testutils');

suite('End to End');

suite('Connection Errors');

test("invalid url 404", function(done) {
  this.runnable().globals(['_sockjs_global']);
  var r;
  //expect(4);
  r = testutils.newSockJS('/invalid_url', 'jsonp-polling');
  assert.ok(r);
  r.onopen = function(e) {
    assert.ok(false);
  };
  r.onmessage = function(e) {
    assert.ok(false);
  };
  r.onclose = function(e) {
    if (u.isXHRCorsCapable() < 4) {
      assert.equal(e.code, 1002);
      assert.equal(e.reason, 'Can\'t connect to server');
    } else {
      assert.equal(e.code, 2000);
      assert.equal(e.reason, 'All transports failed');
    }
    assert.equal(e.wasClean, false);
    done();
  };
});

test("invalid url port", function(done) {
  this.runnable().globals(['_sockjs_global']);
  var dl, r;
  //expect(4);
  dl = document.location;
  r = testutils.newSockJS(dl.protocol + '//' + dl.hostname + ':1079', 'jsonp-polling');
  assert.ok(r);
  r.onopen = function(e) {
    assert.ok(false);
  };
  r.onclose = function(e) {
    if (u.isXHRCorsCapable() < 4) {
      assert.equal(e.code, 1002);
      assert.equal(e.reason, 'Can\'t connect to server');
    } else {
      assert.equal(e.code, 2000);
      assert.equal(e.reason, 'All transports failed');
    }
    assert.equal(e.wasClean, false);
    done();
  };
});

test("disabled websocket test", function(done) {
  this.runnable().globals(['_sockjs_global']);
  var r;
  //expect(3);
  r = testutils.newSockJS('/disabled_websocket_echo', 'websocket');
  r.onopen = function(e) {
    assert.ok(false);
  };
  r.onmessage = function(e) {
    assert.ok(false);
  };
  r.onclose = function(e) {
    assert.equal(e.code, 2000);
    assert.equal(e.reason, "All transports failed");
    assert.equal(e.wasClean, false);
    done();
  };
});

test("close on close", function(done) {
  this.runnable().globals(['_sockjs_global', '_jp']);
  var r;
  //expect(4);
  r = testutils.newSockJS('/close', 'jsonp-polling');
  r.onopen = function(e) {
    assert.ok(true);
  };
  r.onmessage = function(e) {
    assert.ok(false);
  };
  r.onclose = function(e) {
    assert.equal(e.code, 3000);
    assert.equal(e.reason, "Go away!");
    assert.equal(e.wasClean, true);
    r.onclose = function() {
      assert.ok(false);
    };
    r.close();
    u.delay(10, function() {
      done();
    });
  };
});

test("EventEmitter exception handling", function(done) {
  this.runnable().globals(['_sockjs_global', '_jp']);
  var prev_onerror, r;
  //expect(1);
  r = testutils.newSockJS('/echo', 'xhr-streaming');
  prev_onerror = window.onerror;
  window.onerror = function(e) {
    assert.ok(/onopen error/.test('' + e));
    window.onerror = prev_onerror;
    r.close();
  };
  r.onopen = function(e) {
    throw "onopen error";
  };
  r.onclose = function() {
    done();
  };
});
