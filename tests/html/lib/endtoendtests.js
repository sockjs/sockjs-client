'use strict';
/* global expect, ok, QUnit, start, asyncTest, equal */

var u = require('../../../lib/utils');
var testutils = require('./testutils');

QUnit.module('End to End');

QUnit.module('connection errors');

asyncTest("invalid url 404", function() {
  var r;
  expect(4);
  r = testutils.newSockJS('/invalid_url', 'jsonp-polling');
  ok(r);
  r.onopen = function(e) {
    ok(false);
  };
  r.onmessage = function(e) {
    ok(false);
  };
  r.onclose = function(e) {
    if (u.isXHRCorsCapable() < 4) {
      equal(e.code, 1002);
      equal(e.reason, 'Can\'t connect to server');
    } else {
      equal(e.code, 2000);
      equal(e.reason, 'All transports failed');
    }
    equal(e.wasClean, false);
    start();
  };
});

asyncTest("invalid url port", function() {
  var dl, r;
  expect(4);
  dl = document.location;
  r = testutils.newSockJS(dl.protocol + '//' + dl.hostname + ':1079', 'jsonp-polling');
  ok(r);
  r.onopen = function(e) {
    ok(false);
  };
  r.onclose = function(e) {
    if (u.isXHRCorsCapable() < 4) {
      equal(e.code, 1002);
      equal(e.reason, 'Can\'t connect to server');
    } else {
      equal(e.code, 2000);
      equal(e.reason, 'All transports failed');
    }
    equal(e.wasClean, false);
    start();
  };
});

asyncTest("disabled websocket test", function() {
  var r;
  expect(3);
  r = testutils.newSockJS('/disabled_websocket_echo', 'websocket');
  r.onopen = function(e) {
    ok(false);
  };
  r.onmessage = function(e) {
    ok(false);
  };
  r.onclose = function(e) {
    equal(e.code, 2000);
    equal(e.reason, "All transports failed");
    equal(e.wasClean, false);
    start();
  };
});

asyncTest("close on close", function() {
  var r;
  expect(4);
  r = testutils.newSockJS('/close', 'jsonp-polling');
  r.onopen = function(e) {
    ok(true);
  };
  r.onmessage = function(e) {
    ok(false);
  };
  r.onclose = function(e) {
    equal(e.code, 3000);
    equal(e.reason, "Go away!");
    equal(e.wasClean, true);
    r.onclose = function() {
      ok(false);
    };
    r.close();
    u.delay(10, function() {
      start();
    });
  };
});

asyncTest("EventEmitter exception handling", function() {
  var prev_onerror, r;
  expect(1);
  r = testutils.newSockJS('/echo', 'xhr-streaming');
  prev_onerror = window.onerror;
  window.onerror = function(e) {
    ok(/onopen error/.test('' + e));
    window.onerror = prev_onerror;
    r.close();
  };
  r.onopen = function(e) {
    throw "onopen error";
  };
  r.onclose = function() {
    start();
  };
});
