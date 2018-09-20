/* eslint quotes: "off", camelcase: "off" */
'use strict';

var expect = require('expect.js')
  , eventUtils = require('../../lib/utils/event')
  , browser = require('../../lib/utils/browser')
  , transportList = require('../../lib/transport-list')
  , testUtils = require('./test-utils')
  , echoTests = require('./echo-tests')
  , IframeTransport = require('../../lib/transport/iframe')
  ;

function onunloadTest (code, done) {
  var hook = testUtils.createIframe('/sockjs-test/iframe.html');
  var i = 0;
  hook.open = function () {
    i++;
    return hook.callback(code);
  };
  hook.load = function () {
    i++;
    return setTimeout(function () {
      hook.iobj.cleanup();
    }, 1);
  };
  hook.unload = function () {
    try {
      expect(i).to.equal(2);
    } catch (e) {
      done(e);
      hook.del();
      return;
    }

    hook.del();
    done();
  };
}

describe('iframe', function () {
  if (!IframeTransport.enabled()) {
    it('[unsupported]');
    return;
  }

  if (browser.isOpera()) {
    it('onunload [unsupported]');
  } else {
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
  }

  it('onmessage', function (done) {
    var hook = testUtils.createIframe('/sockjs-test/iframe.html');
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
            hook.iobj.post(hook.id + ' ' + 's', testUtils.getSameOriginUrl());
            break;
          case 'e':
            try {
              expect(i).to.equal(2);
            } catch (err) {
              done(err);
              hook.iobj.cleanup();
              hook.del();
              return;
            }

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
      if (!Trans.enabled({ cookie_needed: false, nullOrigin: false, sameScheme: true, sameOrigin: true })) {
        it('[unsupported]');
        return;
      }

      var transport = Trans.transportName;
      var soUrl = testUtils.getSameOriginUrl();
      describe('same origin', function () {
        echoTests.echoFromChild(soUrl, transport);
      });

      // var corsUrl = testUtils.getCrossOriginUrl();
      // if (corsUrl && corsUrl !== soUrl) {
      //   describe('cross origin', function () {
      //     echoTests.echoFromChild(corsUrl, transport);
      //   });
      // }
    });
  });
});
