'use strict';

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (arguments.length < 2) {
    dispatchEventSingleArg(this, event);
  } else {
    // We need to copy arguments to local array for using it in another function call.
    // The only way js engine (like V8) will be able to optimize it.
    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }
    dispatchEventMultiArgs(this, event, args);
  }
};

function dispatchEventSingleArg(eventTarget, event) {
  var type = event.type;
  var typeWithOn = 'on' + type;
  if (eventTarget[typeWithOn]) {
    eventTarget[typeWithOn].call(eventTarget, event);
  }
  if (type in eventTarget._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = eventTarget._listeners[type];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].call(eventTarget, event);
    }
  }
}

function dispatchEventMultiArgs(eventTarget, event, args) {
  var type = event.type;
  var typeWithOn = 'on' + type;
  if (eventTarget[typeWithOn]) {
    eventTarget[typeWithOn].apply(eventTarget, args);
  }
  if (type in eventTarget._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = eventTarget._listeners[type];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(eventTarget, args);
    }
  }
}

module.exports = EventTarget;
