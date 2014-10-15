/* eslint quotes: 0, camelcase: 0 */
'use strict';

var expect = require('expect.js')
  , eventUtils = require('../../lib/utils/event')
  , transportList = require('../../lib/transport-list')
  , testUtils = require('./test-utils')
  , echoTests = require('./echo-tests')
  , IframeTransport = require('../../lib/transport/iframe')
  ;

function onunloadTest (code, done) {
  var hook = testUtils.createIframe();
  var i = 0;
  hook.open = function () {
    i++;
    return hook.callback(code);
  };
  hook.load = function () {
    i++;
    return setTimeout(function () { hook.iobj.cleanup(); }, 1);
  };
  hook.unload = function () {
    expect(i).to.equal(2);
    hook.del();
    done();
  };
}

describe('iframe', function () {
  if (!IframeTransport.enabled()) {
    it('[unsupported]', function () { expect(true).to.be.ok(); });
    return;
  }

  it('onunload', function (done) {
    this.timeout(5000);
    onunloadTest("function attachEvent(event, listener) {" +
      "    if (typeof window.addEventListener !== 'undefined') {" +
      "        window.addEventListener(event, listener, false);" +
      "    } else {" +
      "        document.attachEvent('on' + event, listener);" +
      "        window.attachEvent('on' + event, listener);" +
      "    }" +
      "}" +
      "attachEvent('load', function(){" +
      "    hook.load();" +
      "});" +
      "var w = 0;" +
      "var run = function(){" +
      "    if(w === 0) {" +
      "        w = 1;" +
      "        hook.unload();" +
      "    }" +
      "};" +
      "attachEvent('beforeunload', run);" +
      "attachEvent('unload', run);", done);
  });

  it('onmessage', function (done) {
    var hook = testUtils.createIframe();
    var i = 0;
    hook.open = function () {
      i++;
      hook.callback("" +
        "function attachEvent(event, listener) {" +
        "    if (typeof window.addEventListener !== 'undefined') {" +
        "        window.addEventListener(event, listener, false);" +
        "    } else {" +
        "        document.attachEvent('on' + event, listener);" +
        "        window.attachEvent('on' + event, listener);" +
        "    }" +
        "}" +
        "attachEvent('message', function(e) {" +
        "    var b = e.data;" +
        "    parent.postMessage(window_id + ' ' + 'e', '*');" +
        "});" +
        "parent.postMessage(window_id + ' ' + 's', '*');");
    };
    eventUtils.attachEvent('message', function (e) {
      var msgParts = e.data.split(' ')
        , windowId = msgParts[0]
        , data = msgParts[1]
        ;
      if (windowId === hook.id) {
        switch (data) {
          case 's':
            hook.iobj.loaded();
            i++;
            hook.iobj.post(hook.id + ' ' + 's', testUtils.getOriginUrl());
            break;
          case 'e':
            expect(i).to.equal(2);
            hook.iobj.cleanup();
            hook.del();
            done();
            break;
        }
      }
    });
  });
});

describe('Transports', function () {
  transportList.forEach(function (Trans) {
    describe(Trans.transportName, function () {
      if (!Trans.enabled(testUtils.getUrl('/echo'), { cookie_needed: false, nullOrigin: false })) {
        return;
      }

      var transport = Trans.transportName;
      echoTests.echoFromChild(transport);
    });
  });
});
