import {unloadAdd, unloadDel} from './event.js';
import {isKonqueror} from './browser.js';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:utils:iframe');

export const WPrefix = '_jp';

let currentWindowId = null;
export function getCurrentWindowId() {
  return currentWindowId;
}

export function setCurrentWindowId(id) {
  currentWindowId = id;
}

export function polluteGlobalNamespace() {
  if (!(WPrefix in global)) {
    global[WPrefix] = {};
  }
}

export function postMessage(type, data) {
  if (global.parent === global) {
    debug('Cannot postMessage, no parent window.', type, data);
  } else {
    global.parent.postMessage(JSON.stringify({
      windowId: currentWindowId,
      type,
      data: data || '',
    }), '*');
  }
}

export function createIframe(iframeUrl, errorCallback) {
  let iframe = global.document.createElement('iframe');
  let unloadRef = null;
  const unattach = function () {
    debug('unattach');
    clearTimeout(tref);
    // Explorer had problems with that.
    try {
      iframe.removeEventListener('load', iframeLoad);
    } catch {
      // Intentionally empty
    }

    iframe.removeEventListener('error', onerror);
  };

  const cleanup = function () {
    debug('cleanup');
    if (iframe) {
      unattach();
      // This timeout makes chrome fire onbeforeunload event
      // within iframe. Without the timeout it goes straight to
      // onunload.
      setTimeout(() => {
        if (iframe) {
          iframe.remove();
        }

        iframe = null;
      }, 0);
      unloadDel(unloadRef);
    }
  };

  const onerror = function (error) {
    debug('onerror', error);
    if (iframe) {
      cleanup();
      errorCallback(error);
    }
  };

  const post = function (message, origin) {
    debug('post', message, origin);
    setTimeout(() => {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(message, origin);
        }
      } catch {
        // Intentionally empty
      }
    }, 0);
  };

  iframe.src = iframeUrl;
  iframe.style.display = 'none';
  iframe.style.position = 'absolute';
  iframe.addEventListener('error', onerror);

  const iframeLoad = function () {
    debug('onload');
    // `onload` is triggered before scripts on the iframe are
    // executed. Give it few seconds to actually load stuff.
    clearTimeout(tref);
    tref = setTimeout(() => {
      onerror('onload timeout');
    }, 2000);
  };

  iframe.addEventListener('load', iframeLoad);

  global.document.body.append(iframe);
  let tref = setTimeout(() => {
    onerror('timeout');
  }, 15_000);
  unloadRef = unloadAdd(cleanup);
  return {
    post,
    cleanup,
    loaded: unattach,
  };
}

/* eslint no-undef: "off", new-cap: "off" */
export function createHtmlfile(iframeUrl, errorCallback) {
  const axo = ['Active', 'Object'].join('X');
  let doc = new global[axo]('htmlfile');
  let tref = null;
  let unloadRef = null;
  let iframe;
  const unattach = function () {
    clearTimeout(tref);
    iframe.removeEventListener('error', onerror);
  };

  const cleanup = function () {
    if (doc) {
      unattach();
      unloadDel(unloadRef);
      iframe.remove();
      doc = null;
      iframe = null;
      CollectGarbage();
    }
  };

  const onerror = function (r) {
    debug('onerror', r);
    if (doc) {
      cleanup();
      errorCallback(r);
    }
  };

  const post = function (message, origin) {
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      setTimeout(() => {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(message, origin);
        }
      }, 0);
    } catch {
      // Intentionally empty
    }
  };

  doc.open();
  /* eslint-disable no-useless-concat */
  doc.write('<html><s' + 'cript>'
            + 'document.domain="' + global.document.domain + '";'
            + '</s' + 'cript></html>');
  /* eslint-enable no-useless-concat */
  doc.close();
  doc.parentWindow[WPrefix] = global[WPrefix];
  const c = doc.createElement('div');
  doc.body.append(c);
  iframe = doc.createElement('iframe');
  c.append(iframe);
  iframe.src = iframeUrl;
  iframe.addEventListener('error', onerror);

  tref = setTimeout(() => {
    onerror('timeout');
  }, 15_000);
  unloadRef = unloadAdd(cleanup);
  return {
    post,
    cleanup,
    loaded: unattach,
  };
}

export const iframeEnabled = (function () {
  if (global.document) {
    // PostMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
    // huge delay, or not at all.
    return (typeof global.postMessage === 'function'
      || typeof global.postMessage === 'object') && (!isKonqueror());
  }

  return false;
})();
