'use strict';

var random = require('./random');

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = globalThis.chrome && globalThis.chrome.app && globalThis.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof globalThis.addEventListener !== 'undefined') {
      globalThis.addEventListener(event, listener, false);
    } else if (globalThis.document && globalThis.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      globalThis.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      globalThis.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof globalThis.addEventListener !== 'undefined') {
      globalThis.removeEventListener(event, listener, false);
    } else if (globalThis.document && globalThis.detachEvent) {
      globalThis.document.detachEvent('on' + event, listener);
      globalThis.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
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
