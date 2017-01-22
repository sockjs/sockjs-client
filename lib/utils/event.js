import { string as randomString } from './random';

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

function attachEvent(event, listener) {
  if (typeof global.addEventListener !== 'undefined') {
    global.addEventListener(event, listener, false);
  } else if (global.document && global.attachEvent) {
    // IE quirks.
    // According to: http://stevesouders.com/misc/test-postmessage.php
    // the message gets delivered only to 'document', not 'window'.
    global.document.attachEvent('on' + event, listener);
    // I get 'window' for ie8.
    global.attachEvent('on' + event, listener);
  }
}

function detachEvent(event, listener) {
  if (typeof global.addEventListener !== 'undefined') {
    global.removeEventListener(event, listener, false);
  } else if (global.document && global.detachEvent) {
    global.document.detachEvent('on' + event, listener);
    global.detachEvent('on' + event, listener);
  }
}

function unloadAdd(listener) {
  if (isChromePackagedApp) {
    return null;
  }

  var ref = randomString(8);
  onUnload[ref] = listener;
  if (afterUnload) {
    setTimeout(triggerUnloadCallbacks, 0);
  }
  return ref;
}

function unloadDel(ref) {
  if (ref in onUnload) {
    delete onUnload[ref];
  }
}

function triggerUnloadCallbacks() {
  for (var ref in onUnload) {
    onUnload[ref]();
    delete onUnload[ref];
  }
}

function unloadTriggered() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  triggerUnloadCallbacks();
}

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  attachEvent('unload', unloadTriggered);
}

export {
  attachEvent,
  detachEvent,
  unloadAdd,
  unloadDel,
  triggerUnloadCallbacks
};
