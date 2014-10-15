'use strict';
/* global suite, test, client_opts */
var arrIndexOf, batch_factory_factory, batch_factory_factory_amp, echo_factory_factory, escapable, factor_batch_large, factor_batch_large_amp, factor_echo_basic, factor_echo_from_child, factor_echo_large_message, factor_echo_rich, factor_echo_special_chars, factor_echo_unicode, factor_echo_utf_encoding, factor_echo_utf_encoding_simple, factor_server_close, factor_user_close, generate_killer_string, test_protocol_messages;

var assert = require('assert');
var u = require('../../../lib/utils');
var testutils = require('./testutils');
var protocols = require('../../../lib/protocols');

var TIMEOUT_MS = 10000;

batch_factory_factory = function(protocol, messages) {
  return function(done) {
    this.timeout(TIMEOUT_MS);
    this.runnable().globals(['_sockjs_global', '_jp', '_send_form', '_send_area']);
    var counter, r;
    //expect(3 + messages.length);
    r = testutils.newSockJS('/echo', protocol);
    assert.ok(r);
    counter = 0;
    r.onopen = function(e) {
      var msg, _i, _len;
      assert.ok(true);
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        msg = messages[_i];
        r.send(msg);
      }
    };
    r.onmessage = function(e) {
      assert.equal(e.data, messages[counter]);
      counter += 1;
      if (counter === messages.length) r.close();
    };
    r.onclose = function(e) {
      if (counter !== messages.length) {
        assert.ok(false, "Transport closed prematurely. " + e);
      } else {
        assert.ok(true);
      }
      done();
    };
  };
};

factor_batch_large = function(protocol) {
  var messages;
  messages = [new Array(Math.pow(2, 1)).join('x'), new Array(Math.pow(2, 2)).join('x'), new Array(Math.pow(2, 4)).join('x'), new Array(Math.pow(2, 8)).join('x'), new Array(Math.pow(2, 13)).join('x'), new Array(Math.pow(2, 13)).join('x')];
  return batch_factory_factory(protocol, messages);
};

batch_factory_factory_amp = function(protocol, messages) {
  return function(done) {
    this.timeout(TIMEOUT_MS);
    this.runnable().globals(['_sockjs_global', '_jp', '_send_form', '_send_area']);
    var counter, r;
    //expect(3 + messages.length);
    r = testutils.newSockJS('/amplify', protocol);
    assert.ok(r);
    counter = 0;
    r.onopen = function(e) {
      var msg, _i, _len;
      assert.ok(true);
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        msg = messages[_i];
        r.send('' + msg);
      }
    };
    r.onmessage = function(e) {
      assert.equal(e.data.length, Math.pow(2, messages[counter]), e.data);
      counter += 1;
      if (counter === messages.length) r.close();
    };
    r.onclose = function(e) {
      if (counter !== messages.length) {
        assert.ok(false, "Transport closed prematurely. " + e);
      } else {
        assert.ok(true);
      }
      done();
    };
  };
};

factor_batch_large_amp = function(protocol) {
  var messages;
  messages = [1, 2, 4, 8, 13, 15, 15];
  return batch_factory_factory_amp(protocol, messages);
};



factor_user_close = function(protocol) {
  return function(done) {
    this.runnable().globals(['_sockjs_global', '_jp', '_send_form', '_send_area']);
    var counter, r;
    //expect(5);
    r = testutils.newSockJS('/echo', protocol);
    assert.ok(r);
    counter = 0;
    r.onopen = function(e) {
      counter += 1;
      assert.ok(counter === 1);
      r.close(3000, "User message");
      assert.ok(counter === 1);
    };
    r.onmessage = function() {
      assert.ok(false);
      counter += 1;
    };
    r.onclose = function(e) {
      counter += 1;
      u.log('user_close ' + e.code + ' ' + e.reason);
      assert.equal(e.wasClean, true);
      assert.ok(counter === 2);
      done();
    };
  };
};

factor_server_close = function(protocol) {
  return function(done) {
    this.runnable().globals(['_sockjs_global', '_jp', '_send_form', '_send_area']);
    var r;
    //expect(5);
    r = testutils.newSockJS('/close', protocol);
    assert.ok(r);
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
      done();
    };
  };
};

test_protocol_messages = function(protocol) {
  suite(protocol);
  if (client_opts.disabled_transports && arrIndexOf(client_opts.disabled_transports, protocol) !== -1) {
    test("[disabled by config]", function() {
      assert.ok(true, 'Disabled by config: "' + protocol + '"');
    });
  } else {
    test("echo1", factor_echo_basic(protocol));
    test("echo2", factor_echo_rich(protocol));
    test("echo from child", factor_echo_from_child(protocol));
    test("unicode", factor_echo_unicode(protocol));
    test("utf encoding 0x00-0xFF", factor_echo_utf_encoding_simple(protocol));
    test("utf encoding killer message", factor_echo_utf_encoding(protocol));
    test("special_chars", factor_echo_special_chars(protocol));
    test("large message (ping-pong)", factor_echo_large_message(protocol));
    test("large message (batch)", factor_batch_large(protocol));
    test("large download", factor_batch_large_amp(protocol));
    test("user close", factor_user_close(protocol));
    test("server close", factor_server_close(protocol));
  }
};

var validProtocols = protocols(client_opts.url, [], { cookie_needed: false, null_origin: false });
for (var i = 0; i < validProtocols.length; i++) {
  var Protocol = validProtocols[i];
  test_protocol_messages(Protocol.transportName);
}
