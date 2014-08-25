'use strict';
/* global suite, test */
/* jshint multistr: true */
var ajax_simple_factory, ajax_streaming_factory, ajax_wrong_port_factory, onunload_test_factory, test_wrong_url;

suite('DOM');

var assert = require('assert');
var u = require('../../../lib/utils');
var testutils = require('./testutils');

onunload_test_factory = function(code, done) {
  var hook;
  //expect(3);
  hook = testutils.newIframe();
  hook.open = function() {
    assert.ok(true, 'open hook called by an iframe');
    return hook.callback(code);
  };
  hook.load = function() {
    var f;
    assert.ok(true, 'onload hook called by an iframe');
    f = function() {
      return hook.iobj.cleanup();
    };
    return setTimeout(f, 1);
  };
  hook.unload = function() {
    assert.ok(true, 'onunload hook called by an iframe');
    hook.del();
    done();
  };
};

if (navigator.userAgent.indexOf('Konqueror') !== -1 || navigator.userAgent.indexOf('Opera') !== -1) {
  test("onunload [unsupported by client]", function() {
    assert.ok(true);
  });
} else {
  test('onunload', function (done) {
    this.timeout(5000);
    this.runnable().globals(['_sockjs_global']);
    onunload_test_factory("\
      function attachEvent(event, listener) {\n\
          if (typeof window.addEventListener !== 'undefined') {\n\
              window.addEventListener(event, listener, false);\n\
          } else {\n\
              document.attachEvent('on' + event, listener);\n\
              window.attachEvent('on' + event, listener);\n\
          }\n\
      }\n\
      attachEvent('load', function(){\n\
          hook.load();\n\
      });\n\
      var w = 0;\n\
      var run = function(){\n\
          if(w === 0) {\n\
              w = 1;\n\
              hook.unload();\n\
          }\n\
      };\n\
      attachEvent('beforeunload', run);\n\
      attachEvent('unload', run);", done);
  });
}

if (!require('../../../lib/trans-iframe').enabled()) {
  test("onmessage [unsupported by client]", function() {
    assert.ok(true);
  });
} else {
  test('onmessage', function(done) {
    this.runnable().globals(['_sockjs_global']);
    var hook;
    //expect(3);
    hook = testutils.newIframe();
    hook.open = function() {
      assert.ok(true, 'open hook called by an iframe');
      hook.callback("\
        function attachEvent(event, listener) {\n\
            if (typeof window.addEventListener !== 'undefined') {\n\
                window.addEventListener(event, listener, false);\n\
            } else {\n\
                document.attachEvent('on' + event, listener);\n\
                window.attachEvent('on' + event, listener);\n\
            }\n\
        }\n\
        attachMessage(function(e) {\n\
            var b = e.data;\n\
            parent.postMessage(window_id + ' ' + 'e', '*');\n\
        });\n\
        parent.postMessage(window_id + ' ' + 's', '*');");
    };
    u.attachMessage(function(e) {
      var _ref = e.data.split(' ')
        , window_id = _ref[0]
        , data = _ref[1]
        , origin
        ;
      if (window_id === hook.id) {
        switch (data) {
          case 's':
            hook.iobj.loaded();
            assert.ok(true, 'start frame send');
            origin = u.getOrigin(u.amendUrl('/'));
            hook.iobj.post(hook.id + ' ' + 's', origin);
            break;
          case 'e':
            assert.ok(true, 'done hook called by an iframe');
            hook.iobj.cleanup();
            hook.del();
            done();
            break;
        }
      }
    });
  });
}

ajax_simple_factory = function(name, Obj) {
  test(name + ' simple', function(done) {
    this.runnable().globals(['_sockjs_global']);
    var x;
    //expect(2);
    x = new Obj('GET', '/simple.txt', null);
    x.on('finish', function(status, text) {
      assert.equal(text.length, 2051);
      assert.equal(text.slice(-2), 'b\n');
      done();
    });
  });
};

ajax_streaming_factory = function(name, Obj) {
  test(name + ' streaming', function(done) {
    this.runnable().globals(['_sockjs_global']);
    var x;
    //expect(4);
    x = new Obj('GET', '/streaming.txt', null);
    x.on('chunk', function(status, text) {
      assert.equal(status, 200);
      assert.ok(text.length <= 2049, 'Most likely you\'re behind a transparent Proxy that can\'t do streaming. QUnit tests won\'t work properly. Sorry!');
      x.removeAllListeners('chunk');
    });
    x.on('finish', function(status, text) {
      assert.equal(status, 200);
      assert.equal(text.slice(-4), 'a\nb\n');
      done();
    });
  });
};

test_wrong_url = function(name, Obj, url, statuses, done) {
  var x;
  if (window.console && console.log) {
    console.log(' [*] Connecting to wrong url ' + url);
  }
  //expect(2);
  x = new Obj('GET', url, null);
  x.on('chunk', function() {
    assert.ok(false, "chunk shall not be received");
  });
  x.on('finish', function(status, text) {
    assert.ok(u.arrIndexOf(statuses, status) !== -1);
    assert.equal(text, '');
    done();
  });
};

ajax_wrong_port_factory = function(name, Obj) {
  var port, _i, _len, _ref;
  _ref = [25, 8999, 65300];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    port = _ref[_i];
    test(name + ' wrong port ' + port, function(done) {
      this.runnable().globals(['_sockjs_global']);
      test_wrong_url(name, Obj, 'http://localhost:' + port + '/wrong_url_indeed.txt', [0], done);
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

test('XHRLocalObject wrong url', function(done) {
  this.runnable().globals(['_sockjs_global']);
  test_wrong_url('XHRLocalObject', XHRLocalObject, '/wrong_url_indeed.txt', [0, 404], done);
});

if (window.XDomainRequest) {
  test('XDRObject wrong url', function(done) {
    this.runnable().globals(['_sockjs_global']);
    test_wrong_url('XDRObject', XDRObject, '/wrong_url_indeed.txt', [0], done);
  });
}
