'use strict';

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function arrayIndexOf(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return i;
    }
  }
  return -1;
}

var REventTarget = function() {
  this._listeners = {};
};

REventTarget.prototype.addEventListener = function (eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  if (arrayIndexOf(arr, listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
  return;
};

REventTarget.prototype.removeEventListener = function (eventType, listener) {
  if (!(eventType in this._listeners)) {
    return;
  }
  var arr = this._listeners[eventType];
  var idx = arrayIndexOf(arr, listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfer with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
  return;
};

REventTarget.prototype.dispatchEvent = function (event) {
  var t = event.type;
  var args = Array.prototype.slice.call(arguments, 0);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = global.EventTarget || REventTarget;
