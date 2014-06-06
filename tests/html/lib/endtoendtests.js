'use strict';
/* global expect, ok, QUnit, start, test, asyncTest, SockJS, equal, client_opts */
var factory_body_check;

var u = require('../../../lib/utils');
var testutils = require('./testutils');

QUnit.module('End to End');

factory_body_check = function(protocol) {
  var n;
  if (!SockJS[protocol] || !SockJS[protocol].enabled(client_opts.sockjs_opts)) {
    n = " " + protocol + " [unsupported by client]";
    test(n, function() {
      u.log('Unsupported protocol (by client): "' + protocol + '"');
    });
  } else {
    asyncTest(protocol, function() {
      var code, hook, url;
      expect(5);
      url = client_opts.url + '/echo';
      code = "hook.test_body(!!document.body, typeof document.body);\n\nvar sock = new SockJS('" + url + "', null,\n{protocols_whitelist:['" + protocol + "']});\nsock.onopen = function() {\n    var m = hook.onopen();\n    sock.send(m);\n};\nsock.onmessage = function(e) {\n    hook.onmessage(e.data);\n    sock.close();\n};";
      hook = testutils.newIframe('sockjs-in-head.html');
      hook.open = function() {
        hook.iobj.loaded();
        ok(true, 'open');
        hook.callback(code);
      };
      hook.test_body = function(is_body, type) {
        equal(is_body, false, 'body not yet loaded ' + type);
      };
      hook.onopen = function() {
        ok(true, 'onopen');
        return 'a';
      };
      hook.onmessage = function(m) {
        equal(m, 'a');
        ok(true, 'onmessage');
        hook.iobj.cleanup();
        hook.del();
        start();
      };
    });
  }
};

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
