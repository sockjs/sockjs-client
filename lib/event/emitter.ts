import {EventTarget} from './eventtarget';

export class EventEmitter extends EventTarget {
  constructor() {
    super();
  }

  removeAllListeners(type) {
    if (type) {
      delete this._listeners[type];
    } else {
      this._listeners = {};
    }
  }

  once(type, listener) {
    var self = this
      , fired = false;

    function g() {
      self.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }

    this.on(type, g);
  }

  emit() {
    var type = arguments[0];
    var listeners = this._listeners[type];
    if (!listeners) {
      return;
    }
    // equivalent of Array.prototype.slice.call(arguments, 1);
    var l = arguments.length;
    var args = new Array(l - 1);
    for (var ai = 1; ai < l; ai++) {
      args[ai - 1] = arguments[ai];
    }
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }

  addListener = super.addEventListener;
  on = super.addEventListener;
  removeListener = super.removeEventListener;
}
