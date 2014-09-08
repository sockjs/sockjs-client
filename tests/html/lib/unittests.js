'use strict';
/* global test, SockJS */

var assert = require('assert');
var u = require('../../../lib/utils');
var protocols = require('../../../lib/protocols')

test('random_string', function() {
  var i, _i, _len, _ref;
  assert.notEqual(u.random_string(8), u.random_string(8));
  _ref = [1, 2, 3, 128];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    i = _ref[_i];
    assert.equal(u.random_string(i).length, i);
  }
});

test('random_number_string', function() {
  for (var i = 0; i <= 10; i++) {
    assert.equal(u.random_number_string(10).length, 1);
    assert.equal(u.random_number_string(100).length, 2);
    assert.equal(u.random_number_string(1000).length, 3);
    assert.equal(u.random_number_string(10000).length, 4);
    assert.equal(u.random_number_string(100000).length, 5);
  }
});

test('getOrigin', function() {
  assert.equal(u.getOrigin('http://a.b/'), 'http://a.b:80');
  assert.equal(u.getOrigin('http://a.b/c'), 'http://a.b:80');
  assert.equal(u.getOrigin('http://a.b:123/c'), 'http://a.b:123');
  assert.equal(u.getOrigin('https://a.b/'), 'https://a.b:443');
  assert.equal(u.getOrigin('file://a.b/'), null);
});

test('isSameOriginUrl', function() {
  assert.ok(u.isSameOriginUrl('http://localhost', 'http://localhost/'));
  assert.ok(u.isSameOriginUrl('http://localhost', 'http://localhost/abc'));
  assert.ok(u.isSameOriginUrl('http://localhost/', 'http://localhost'));
  assert.ok(u.isSameOriginUrl('http://localhost', 'http://localhost'));
  assert.ok(u.isSameOriginUrl('http://localhost', 'http://localhost:8080') === false);
  assert.ok(u.isSameOriginUrl('http://localhost:8080', 'http://localhost') === false);
  assert.ok(u.isSameOriginUrl('http://localhost:8080', 'http://localhost:8080/'));
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:80/', 'http://127.0.0.1:80/a'));
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:80', 'http://127.0.0.1:80/a'));
  assert.ok(u.isSameOriginUrl('http://localhost', 'http://localhost:80'));
  assert.ok(u.isSameOriginUrl('http://127.0.0.1/', 'http://127.0.0.1:80/a'));
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:9', 'http://127.0.0.1:9999') === false);
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:99', 'http://127.0.0.1:9999') === false);
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:999', 'http://127.0.0.1:9999') === false);
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:9999', 'http://127.0.0.1:9999'));
  assert.ok(u.isSameOriginUrl('http://127.0.0.1:99999', 'http://127.0.0.1:9999') === false);
});

test("getParentDomain", function() {
  var domains, k;
  domains = {
    'localhost': 'localhost',
    '127.0.0.1': '127.0.0.1',
    'a.b.c.d': 'b.c.d',
    'a.b.c.d.e': 'b.c.d.e',
    '[::1]': '[::1]',
    'a.org': 'org',
    'a2.a3.org': 'a3.org'
  };
  for (k in domains) {
    assert.equal(u.getParentDomain(k), domains[k]);
  }
});

test('objectExtend', function() {
  var a, b;
  assert.deepEqual(u.objectExtend({}, {}), {});
  a = {
    a: 1
  };
  assert.equal(u.objectExtend(a, {}), a);
  assert.equal(u.objectExtend(a, {
    b: 1
  }), a);
  a = {
    a: 1
  };
  b = {
    b: 2
  };
  assert.deepEqual(u.objectExtend(a, b), {
    a: 1,
    b: 2
  });
  assert.deepEqual(a, {
    a: 1,
    b: 2
  });
  assert.deepEqual(b, {
    b: 2
  });
});

test('bind', function() {
  var bound_fun, fun, o;
  o = {};
  fun = function() {
    return this;
  };
  assert.deepEqual(fun(), undefined);
  bound_fun = u.bind(fun, o);
  assert.deepEqual(bound_fun(), o);
});

test('amendUrl', function() {
  var dl, t;
  dl = window.location;
  assert.equal(u.amendUrl('//blah:1/abc'), dl.protocol + '//blah:1/abc');
  assert.equal(u.amendUrl('/abc'), dl.protocol + '//' + dl.host + '/abc');
  assert.equal(u.amendUrl('/'), dl.protocol + '//' + dl.host);
  assert.equal(u.amendUrl('http://a:1/abc'), 'http://a:1/abc');
  assert.equal(u.amendUrl('http://a:1/abc/'), 'http://a:1/abc');
  assert.equal(u.amendUrl('http://a:1/abc//'), 'http://a:1/abc');
  t = function() {
    return u.amendUrl('');
  };
  assert.throws(t, 'Wrong url');
  t = function() {
    return u.amendUrl(false);
  };
  assert.throws(t, 'Wrong url');
  t = function() {
    return u.amendUrl('http://abc?a=a');
  };
  assert.throws(t, 'Only basic urls are supported');
  t = function() {
    return u.amendUrl('http://abc#a');
  };
  assert.throws(t, 'Only basic urls are supported');
  assert.equal(u.amendUrl('http://a:80/abc'), 'http://a/abc');
  assert.equal(u.amendUrl('https://a:443/abc'), 'https://a/abc');
  assert.equal(u.amendUrl('https://a:80/abc'), 'https://a:80/abc');
  assert.equal(u.amendUrl('http://a:443/abc'), 'http://a:443/abc');
});

test('arrIndexOf', function() {
  var a;
  a = [1, 2, 3, 4, 5];
  assert.equal(u.arrIndexOf(a, 1), 0);
  assert.equal(u.arrIndexOf(a, 5), 4);
  assert.equal(u.arrIndexOf(a, null), -1);
  assert.equal(u.arrIndexOf(a, 6), -1);
});

test('arrSkip', function() {
  var a;
  a = [1, 2, 3, 4, 5];
  assert.deepEqual(u.arrSkip(a, 1), [2, 3, 4, 5]);
  assert.deepEqual(u.arrSkip(a, 2), [1, 3, 4, 5]);
  assert.deepEqual(u.arrSkip(a, 11), [1, 2, 3, 4, 5]);
  assert.deepEqual(u.arrSkip(a, 'a'), [1, 2, 3, 4, 5]);
  assert.deepEqual(u.arrSkip(a, '1'), [1, 2, 3, 4, 5]);
});

test('quote', function() {
  var all_chars, c, i;
  assert.equal(u.quote(''), '""');
  assert.equal(u.quote('a'), '"a"');
  assert.ok(u.arrIndexOf(['"\\t"', '"\\u0009"'], u.quote('\t')) !== -1);
  assert.ok(u.arrIndexOf(['"\\n"', '"\\u000a"'], u.quote('\n')) !== -1);
  assert.equal(u.quote('\x00\udfff\ufffe\uffff'), '"\\u0000\\udfff\\ufffe\\uffff"');
  assert.equal(u.quote('\ud85c\udff7\ud800\ud8ff'), '"\\ud85c\\udff7\\ud800\\ud8ff"');
  assert.equal(u.quote('\u2000\u2001\u0300\u0301'), '"\\u2000\\u2001\\u0300\\u0301"');
  c = (function() {
    var _results;
    _results = [];
    for (i = 0; i <= 65535; i++) {
      _results.push(String.fromCharCode(i));
    }
    return _results;
  })();
  all_chars = c.join('');
  assert.ok(JSON.parse(u.quote(all_chars)) === all_chars, "Quote/unquote all 64K chars.");
});

// test('detectProtocols', function() {
//   var chrome_probed, ie10_probed, ie6_probed, ie8_probed, opera_probed;
//   chrome_probed = {
//     'websocket': true,
//     'xdr-streaming': false,
//     'xhr-streaming': true,
//     'iframe-eventsource': true,
//     'iframe-htmlfile': true,
//     'xdr-polling': false,
//     'xhr-polling': true,
//     'iframe-xhr-polling': true,
//     'jsonp-polling': true
//   };
//   assert.deepEqual(u.detectProtocols(chrome_probed, null, {}), ['websocket', 'xhr-streaming', 'xhr-polling']);
//   assert.deepEqual(u.detectProtocols(chrome_probed, null, {
//     websocket: false
//   }), ['xhr-streaming', 'xhr-polling']);
//   opera_probed = {
//     'websocket': false,
//     'xdr-streaming': false,
//     'xhr-streaming': false,
//     'iframe-eventsource': true,
//     'iframe-htmlfile': true,
//     'xdr-polling': false,
//     'xhr-polling': false,
//     'iframe-xhr-polling': true,
//     'jsonp-polling': true
//   };
//   assert.deepEqual(u.detectProtocols(opera_probed, null, {}), ['iframe-eventsource', 'iframe-xhr-polling']);
//   ie6_probed = {
//     'websocket': false,
//     'xdr-streaming': false,
//     'xhr-streaming': false,
//     'iframe-eventsource': false,
//     'iframe-htmlfile': false,
//     'xdr-polling': false,
//     'xhr-polling': false,
//     'iframe-xhr-polling': false,
//     'jsonp-polling': true
//   };
//   assert.deepEqual(u.detectProtocols(ie6_probed, null, {}), ['jsonp-polling']);
//   ie8_probed = {
//     'websocket': false,
//     'xdr-streaming': true,
//     'xhr-streaming': false,
//     'iframe-eventsource': false,
//     'iframe-htmlfile': true,
//     'xdr-polling': true,
//     'xhr-polling': false,
//     'iframe-xhr-polling': true,
//     'jsonp-polling': true
//   };
//   assert.deepEqual(u.detectProtocols(ie8_probed, null, {}), ['xdr-streaming', 'xdr-polling']);
//   assert.deepEqual(u.detectProtocols(ie8_probed, null, {
//     cookie_needed: true
//   }), ['iframe-htmlfile', 'iframe-xhr-polling']);
//   ie10_probed = {
//     'websocket': true,
//     'xdr-streaming': true,
//     'xhr-streaming': true,
//     'iframe-eventsource': false,
//     'iframe-htmlfile': true,
//     'xdr-polling': true,
//     'xhr-polling': true,
//     'iframe-xhr-polling': true,
//     'jsonp-polling': true
//   };
//   assert.deepEqual(u.detectProtocols(ie10_probed, null, {}), ['websocket', 'xhr-streaming', 'xhr-polling']);
//   assert.deepEqual(u.detectProtocols(ie10_probed, null, {
//     cookie_needed: true
//   }), ['websocket', 'xhr-streaming', 'xhr-polling']);
//   assert.deepEqual(u.detectProtocols(chrome_probed, null, {
//     null_origin: true
//   }), ['websocket', 'iframe-eventsource', 'iframe-xhr-polling']);
//   assert.deepEqual(u.detectProtocols(chrome_probed, null, {
//     websocket: false,
//     null_origin: true
//   }), ['iframe-eventsource', 'iframe-xhr-polling']);
//   assert.deepEqual(u.detectProtocols(opera_probed, null, {
//     null_origin: true
//   }), ['iframe-eventsource', 'iframe-xhr-polling']);
//   assert.deepEqual(u.detectProtocols(ie6_probed, null, {
//     null_origin: true
//   }), ['jsonp-polling']);
//   assert.deepEqual(u.detectProtocols(ie8_probed, null, {
//     null_origin: true
//   }), ['iframe-htmlfile', 'iframe-xhr-polling']);
//   assert.deepEqual(u.detectProtocols(ie10_probed, null, {
//     null_origin: true
//   }), ['websocket', 'iframe-htmlfile', 'iframe-xhr-polling']);
// });

test("EventEmitter", function() {
  var bluff, handler0, handler1, handler2, handler3, handler4, log, r, single;
  r = new SockJS('//1.2.3.4/wrongurl', null, {
    protocols_whitelist: []
  });
  r.addEventListener('message', function() {
    return assert.ok(true);
  });
  r.onmessage = function() {
    return assert.ok(false);
  };
  bluff = function() {
    return assert.ok(false);
  };
  r.addEventListener('message', bluff);
  r.removeEventListener('message', bluff);
  r.addEventListener('message', bluff);
  r.addEventListener('message', function() {
    return assert.ok(true);
  });
  r.onmessage = function() {
    return assert.ok(true);
  };
  r.removeEventListener('message', bluff);
  r.dispatchEvent({
    type: 'message'
  });
  handler0 = function() {
    return log.push(0);
  };
  handler1 = function() {
    log.push(1);
    r.removeEventListener('test', handler0);
    r.removeEventListener('test', handler2);
    r.addEventListener('test', handler3);
    return r.addEventListener('test', handler4);
  };
  handler2 = function() {
    return log.push(2);
  };
  handler3 = function() {
    log.push(3);
    r.removeEventListener('test', handler1);
    r.removeEventListener('test', handler3);
    return r.removeEventListener('test', handler4);
  };
  handler4 = function() {
    return log.push(4);
  };
  r.addEventListener('test', handler0);
  r.addEventListener('test', handler1);
  r.addEventListener('test', handler2);
  log = [];
  r.dispatchEvent({
    type: 'test'
  });
  assert.deepEqual(log, [0, 1, 2]);
  log = [];
  r.dispatchEvent({
    type: 'test'
  });
  assert.deepEqual(log, [1, 3, 4]);
  log = [];
  r.dispatchEvent({
    type: 'test'
  });
  assert.deepEqual(log, []);
  single = function() {
    return assert.ok(true);
  };
  r.addEventListener('close', single);
  r.addEventListener('close', single);
  r.dispatchEvent({
    type: 'close'
  });
  r.removeEventListener('close', single);
  r.dispatchEvent({
    type: 'close'
  });
  r.close();
});

test("NoConstructor", function() {
  var r;
  r = new SockJS('//1.2.3.4/blah', null, {
    protocols_whitelist: []
  });
  assert.ok(r instanceof SockJS);
  r.close();
  /* jshint newcap: false */
  r = SockJS('//1.2.3.4/blah', null, {
    protocols_whitelist: []
  });
  assert.ok(r instanceof SockJS);
  r.close();
});
