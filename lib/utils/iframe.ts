'use strict';

import eventUtils = require('./event');
var JSON3 = require('json3');
import browser = require('./browser');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:iframe');
}

export var WPrefix = '_jp'
export var currentWindowId = null

export function polluteGlobalNamespace() {
  if (!(module.exports.WPrefix in global)) {
    global[module.exports.WPrefix] = {};
  }
}

export function postMessage(type, data?) {
  if ((<any>global).parent !== global) {
    (<any>global).parent.postMessage(JSON3.stringify({
      windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
    }), '*');
  } else {
    debug('Cannot postMessage, no parent window.', type, data);
  }
}

export function createIframe(iframeUrl, errorCallback) {
  var iframe = (<any>global).document.createElement('iframe');
  var tref, unloadRef;
  var unattach = function () {
    debug('unattach');
    clearTimeout(tref);
    // Explorer had problems with that.
    try {
      iframe.onload = null;
    } catch (x) {
      // intentionally empty
    }
    iframe.onerror = null;
  };
  var cleanup = function () {
    debug('cleanup');
    if (iframe) {
      unattach();
      // This timeout makes chrome fire onbeforeunload event
      // within iframe. Without the timeout it goes straight to
      // onunload.
      setTimeout(function () {
        if (iframe) {
          iframe.parentNode.removeChild(iframe);
        }
        iframe = null;
      }, 0);
      eventUtils.unloadDel(unloadRef);
    }
  };
  var on_error = function (err) {
    debug('onerror', err);
    if (iframe) {
      cleanup();
      errorCallback(err);
    }
  };
  var post = function (msg, origin) {
    debug('post', msg, origin);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      setTimeout(function () {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(msg, origin);
        }
      }, 0);
    } catch (x) {
      // intentionally empty
    }
  };

  iframe.src = iframeUrl;
  iframe.style.display = 'none';
  iframe.style.position = 'absolute';
  iframe.onerror = function () {
    on_error('onerror');
  };
  iframe.onload = function () {
    debug('onload');
    // `onload` is triggered before scripts on the iframe are
    // executed. Give it few seconds to actually load stuff.
    clearTimeout(tref);
    tref = setTimeout(function () {
      on_error('onload timeout');
    }, 2000);
  };
  (<any>global).document.body.appendChild(iframe);
  tref = setTimeout(function () {
    on_error('timeout');
  }, 15000);
  unloadRef = eventUtils.unloadAdd(cleanup);
  return {
    post: post
    , cleanup: cleanup
    , loaded: unattach
  };
}

/* jshint undef: false, newcap: false */
/* eslint no-undef: 0, new-cap: 0 */
export function createHtmlfile(iframeUrl, errorCallback) {
  var axo = ['Active'].concat('Object').join('X');
  var doc = new global[axo]('htmlfile');
  var tref, unloadRef;
  var iframe;
  var unattach = function () {
    clearTimeout(tref);
    iframe.onerror = null;
  };
  var cleanup = function () {
    if (doc) {
      unattach();
      eventUtils.unloadDel(unloadRef);
      iframe.parentNode.removeChild(iframe);
      iframe = doc = null;
      CollectGarbage();
    }
  };
  var on_error = function (r) {
    debug('onerror', r);
    if (doc) {
      cleanup();
      errorCallback(r);
    }
  };
  var post = function (msg, origin) {
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      setTimeout(function () {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(msg, origin);
        }
      }, 0);
    } catch (x) {
      // intentionally empty
    }
  };

  doc.open();
  doc.write(`<html><script>document.domain="${(<any>global).document.domain}";</script></html>`);
  doc.close();
  doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
  var c = doc.createElement('div');
  doc.body.appendChild(c);
  iframe = doc.createElement('iframe');
  c.appendChild(iframe);
  iframe.src = iframeUrl;
  iframe.onerror = function () {
    on_error('onerror');
  };
  tref = setTimeout(function () {
    on_error('timeout');
  }, 15000);
  unloadRef = eventUtils.unloadAdd(cleanup);
  return {
    post: post
    , cleanup: cleanup
    , loaded: unattach
  };
}

export var iframeEnabled = false;
if ((<any>global).document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof (<any>global).postMessage === 'function' ||
    typeof (<any>global).postMessage === 'object') && (!browser.isKonqueror());
}
