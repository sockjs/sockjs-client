import { unloadAdd, unloadDel } from './event';
import { isKonqueror } from './browser';
import JSON3 from './json';
import Debug from 'debug';
var debug = Debug('sockjs-client:utils:iframe');

var WPrefix = '_jp';
var currentWindowId = null;

function setCurrentWindowId(val) {
  currentWindowId = val;
}

function polluteGlobalNamespace() {
  if (!(WPrefix in global)) {
    global[WPrefix] = {};
  }
}

function postMessage(type, data) {
  if (global.parent !== global) {
    global.parent.postMessage(JSON3.stringify({
      windowId: currentWindowId
    , type: type
    , data: data || ''
    }), '*');
  } else {
    debug('Cannot postMessage, no parent window.', type, data);
  }
}

function createIframe(iframeUrl, errorCallback) {
  var iframe = global.document.createElement('iframe');
  var tref, unloadRef;
  var unattach = function() {
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
  var cleanup = function() {
    debug('cleanup');
    if (iframe) {
      unattach();
      // This timeout makes chrome fire onbeforeunload event
      // within iframe. Without the timeout it goes straight to
      // onunload.
      setTimeout(function() {
        if (iframe) {
          iframe.parentNode.removeChild(iframe);
        }
        iframe = null;
      }, 0);
      unloadDel(unloadRef);
    }
  };
  var onerror = function(err) {
    debug('onerror', err);
    if (iframe) {
      cleanup();
      errorCallback(err);
    }
  };
  var post = function(msg, origin) {
    debug('post', msg, origin);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      setTimeout(function() {
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
  iframe.onerror = function() {
    onerror('onerror');
  };
  iframe.onload = function() {
    debug('onload');
    // `onload` is triggered before scripts on the iframe are
    // executed. Give it few seconds to actually load stuff.
    clearTimeout(tref);
    tref = setTimeout(function() {
      onerror('onload timeout');
    }, 2000);
  };
  global.document.body.appendChild(iframe);
  tref = setTimeout(function() {
    onerror('timeout');
  }, 15000);
  unloadRef = unloadAdd(cleanup);
  return {
    post: post
  , cleanup: cleanup
  , loaded: unattach
  };
}

/* eslint no-undef: "off", new-cap: "off" */
function createHtmlfile(iframeUrl, errorCallback) {
  var axo = ['Active'].concat('Object').join('X');
  var doc = new global[axo]('htmlfile');
  var tref, unloadRef;
  var iframe;
  var unattach = function() {
    clearTimeout(tref);
    iframe.onerror = null;
  };
  var cleanup = function() {
    if (doc) {
      unattach();
      unloadDel(unloadRef);
      iframe.parentNode.removeChild(iframe);
      iframe = doc = null;
      CollectGarbage();
    }
  };
  var onerror = function(r) {
    debug('onerror', r);
    if (doc) {
      cleanup();
      errorCallback(r);
    }
  };
  var post = function(msg, origin) {
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      setTimeout(function() {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
        }
      }, 0);
    } catch (x) {
      // intentionally empty
    }
  };

  doc.open();
  doc.write('<html><s' + 'cript>' +
            'document.domain="' + global.document.domain + '";' +
            '</s' + 'cript></html>');
  doc.close();
  doc.parentWindow[WPrefix] = global[WPrefix];
  var c = doc.createElement('div');
  doc.body.appendChild(c);
  iframe = doc.createElement('iframe');
  c.appendChild(iframe);
  iframe.src = iframeUrl;
  iframe.onerror = function() {
    onerror('onerror');
  };
  tref = setTimeout(function() {
    onerror('timeout');
  }, 15000);
  unloadRef = unloadAdd(cleanup);
  return {
    post: post
  , cleanup: cleanup
  , loaded: unattach
  };
}

var iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!isKonqueror());
}

export {
  WPrefix,
  currentWindowId,
  setCurrentWindowId,
  polluteGlobalNamespace,
  postMessage,
  createIframe,
  createHtmlfile,
  iframeEnabled
};
