'use strict';

module.exports = {
  attachMessage: function(listener) {
    this.attachEvent('message', listener);
  }

, attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachMessage: function(listener) {
    this.detachEvent('message', listener);
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }
};


var onUnload = {};
// Things registered after beforeunload are to be called immediately.
var afterUnload = false;

var triggerUnloadCallbacks = function() {
  for(var ref in onUnload) {
    onUnload[ref]();
    delete onUnload[ref];
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.

// TODO see if we need to uncomment this
//utils.attachEvent('unload', unloadTriggered);

utils.unloadAdd = function(listener) {
  var ref = utils.randomString(8);
  onUnload[ref] = listener;
  if (afterUnload) {
    process.nextTick(triggerUnloadCallbacks);
  }
  return ref;
};
utils.unloadDel = function(ref) {
  if (ref in onUnload) {
    delete onUnload[ref];
  }
};
