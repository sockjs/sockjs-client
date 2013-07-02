/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

var indexOfListener = function(list, listener) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].listener === listener)
            return i;
    }
    return -1;
};

var REventTarget = function() {};
REventTarget.prototype.addEventListener = function (eventType, listener) {
    if(!this._listeners) {
         this._listeners = {};
    }
    if(!(eventType in this._listeners)) {
        this._listeners[eventType] = [];
    }
    var arr = this._listeners[eventType];
    if(indexOfListener(arr, listener) === -1) {
        arr.push({listener: listener, doomed: false});
    }
    return;
};

REventTarget.prototype.removeEventListener = function (eventType, listener) {
    if(!(this._listeners && (eventType in this._listeners))) {
        return;
    }
    var arr = this._listeners[eventType];
    var idx = indexOfListener(arr, listener);
    if (idx !== -1) {
        // Removing an event listener that has not yet run
        // mid-dispatch causes the listener to not run.
        arr[idx].doomed = true;
        if(arr.length > 1) {
            arr.splice(idx, 1);
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
    if (this['on'+t]) {
        this['on'+t].apply(this, args);
    }
    if (this._listeners && t in this._listeners) {
        // Make a copy of the listeners list; listeners added
        // mid-dispatch should NOT run.
        var listeners = this._listeners[t].slice(0);
        for(var i=0; i < listeners.length; i++) {
            if (!listeners[i].doomed)
                listeners[i].listener.apply(this, args);
        }
    }
};
