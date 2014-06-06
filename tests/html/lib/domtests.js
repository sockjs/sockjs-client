'use strict';
/* global expect, ok, QUnit, start, test, asyncTest, SockJS, equal */
var ajax_simple_factory, ajax_streaming_factory, ajax_wrong_port_factory, onunload_test_factory, test_wrong_url;

QUnit.module('Dom');

var u = require('../../../lib/utils');
var testutils = require('./testutils');

onunload_test_factory = function(code) {
  return function() {
    var hook;
    expect(3);
    hook = testutils.newIframe();
    hook.open = function() {
      ok(true, 'open hook called by an iframe');
      return hook.callback(code);
    };
    hook.load = function() {
      var f;
      ok(true, 'onload hook called by an iframe');
      f = function() {
        return hook.iobj.cleanup();
      };
      return setTimeout(f, 1);
    };
    hook.unload = function() {
      ok(true, 'onunload hook called by an iframe');
      hook.del();
      start();
    };
  };
};

if (navigator.userAgent.indexOf('Konqueror') !== -1 || navigator.userAgent.indexOf('Opera') !== -1) {
  test("onunload [unsupported by client]", function() {
    ok(true);
  });
} else {
  asyncTest('onunload', onunload_test_factory("var u = SockJS.getUtils();\nu.attachEvent('load', function(){\n    hook.load();\n});\nvar w = 0;\nvar run = function(){\n    if(w === 0) {\n        w = 1;\n        hook.unload();\n    }\n};\nu.attachEvent('beforeunload', run);\nu.attachEvent('unload', run);"));
}

if (!require('../../../lib/trans-iframe').enabled()) {
  test("onmessage [unsupported by client]", function() {
    ok(true);
  });
} else {
  asyncTest('onmessage', function() {
    var hook;
    expect(3);
    hook = testutils.newIframe();
    hook.open = function() {
      ok(true, 'open hook called by an iframe');
      hook.callback("var u = SockJS.getUtils();\nu.attachMessage(function(e) {\n    var b = e.data;\n    parent.postMessage(window_id + ' ' + 'e', '*');\n});\nparent.postMessage(window_id + ' ' + 's', '*');");
    };
    u.attachMessage(function(e) {
      var data, origin, window_id, _ref;
      _ref = e.data.split(' '), window_id = _ref[0], data = _ref[1];
      if (window_id === hook.id) {
        switch (data) {
          case 's':
            hook.iobj.loaded();
            ok(true, 'start frame send');
            origin = u.getOrigin(u.amendUrl('/'));
            hook.iobj.post(hook.id + ' ' + 's', origin);
            break;
          case 'e':
            ok(true, 'done hook called by an iframe');
            hook.iobj.cleanup();
            hook.del();
            start();
            break;
        }
      }
    });
  });
}

ajax_simple_factory = function(name, Obj) {
  asyncTest(name + ' simple', function() {
    var x;
    expect(2);
    x = new Obj('GET', '/simple.txt', null);
    x.onfinish = function(status, text) {
      equal(text.length, 2051);
      equal(text.slice(-2), 'b\n');
      start();
    };
  });
};

ajax_streaming_factory = function(name, Obj) {
  asyncTest(name + ' streaming', function() {
    var x;
    expect(4);
    x = new Obj('GET', '/streaming.txt', null);
    x.onchunk = function(status, text) {
      equal(status, 200);
      ok(text.length <= 2049, 'Most likely you\'re behind a transparent Proxy that can\'t do streaming. QUnit tests won\'t work properly. Sorry!');
      delete x.onchunk;
    };
    return x.onfinish = function(status, text) {
      equal(status, 200);
      equal(text.slice(-4), 'a\nb\n');
      start();
    };
  });
};

test_wrong_url = function(name, Obj, url, statuses) {
  var x;
  if (window.console && console.log) {
    console.log(' [*] Connecting to wrong url ' + url);
  }
  expect(2);
  x = new Obj('GET', url, null);
  x.onchunk = function() {
    ok(false, "chunk shall not be received");
  };
  x.onfinish = function(status, text) {
    ok(u.arrIndexOf(statuses, status) !== -1);
    equal(text, '');
    start();
  };
};

ajax_wrong_port_factory = function(name, Obj) {
  var port, _i, _len, _ref;
  _ref = [25, 8999, 65300];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    port = _ref[_i];
    asyncTest(name + ' wrong port ' + port, function() {
      test_wrong_url(name, Obj, 'http://localhost:' + port + '/wrong_url_indeed.txt', [0]);
    });
  }
};

var XHRLocalObject = require('../../../lib/xhr-local');
var XDRObject = require('../../../lib/xdr');

ajax_simple_factory('XHRLocalObject', XHRLocalObject);

if (window.XDomainRequest) ajax_simple_factory('XDRObject', XDRObject);

if (!window.ActiveXObject) ajax_streaming_factory('XHRLocalObject', XHRLocalObject);

if (window.XDomainRequest) ajax_streaming_factory('XDRObject', XDRObject);

ajax_wrong_port_factory('XHRLocalObject', XHRLocalObject);

if (window.XDomainRequest) ajax_wrong_port_factory('XDRObject', XDRObject);

asyncTest('XHRLocalObject wrong url', function() {
  test_wrong_url('XHRLocalObject', XHRLocalObject, '/wrong_url_indeed.txt', [0, 404]);
});

if (window.XDomainRequest) {
  asyncTest('XDRObject wrong url', function() {
    test_wrong_url('XDRObject', XDRObject, '/wrong_url_indeed.txt', [0]);
  });
}
