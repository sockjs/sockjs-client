'use strict';

import random = require('./random');

var onUnload = {}
  , afterUnload = false
  // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = (<any>global).chrome && (<any>global).chrome.app && (<any>global).chrome.app.runtime
  ;

export function attachEvent(event, listener) {
  if (typeof (<any>global).addEventListener !== 'undefined') {
    (<any>global).addEventListener(event, listener, false);
  } else if ((<any>global).document && (<any>global).attachEvent) {
    // IE quirks.
    // According to: http://stevesouders.com/misc/test-postmessage.php
    // the message gets delivered only to 'document', not 'window'.
    (<any>global).document.attachEvent('on' + event, listener);
    // I get 'window' for ie8.
    (<any>global).attachEvent('on' + event, listener);
  }
}

export function detachEvent(event, listener) {
  if (typeof (<any>global).addEventListener !== 'undefined') {
    (<any>global).removeEventListener(event, listener, false);
  } else if ((<any>global).document && (<any>global).detachEvent) {
    (<any>global).document.detachEvent('on' + event, listener);
    (<any>global).detachEvent('on' + event, listener);
  }
}

export function unloadAdd(listener) {
  if (isChromePackagedApp) {
    return null;
  }

  var ref = random.string(8);
  onUnload[ref] = listener;
  if (afterUnload) {
    setTimeout(triggerUnloadCallbacks, 0);
  }
  return ref;
}

export function unloadDel(ref) {
  if (ref in onUnload) {
    delete onUnload[ref];
  }
}

export function triggerUnloadCallbacks() {
  for (var ref in onUnload) {
    onUnload[ref]();
    delete onUnload[ref];
  }
}

var unloadTriggered = function () {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}
