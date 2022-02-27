import EventTarget from './eventtarget.js';

class EventEmitter extends EventTarget {
  removeAllListeners(type) {
    if (type) {
      delete this._listeners[type];
    } else {
      this._listeners = {};
    }
  }

  once(type, listener) {
    let fired = false;

    const g = function (...args) {
      this.removeListener(type, g);

      if (!fired) {
        fired = true;
        Reflect.apply(listener, this, args);
      }
    }.bind(this);

    this.on(type, g);
  }

  emit(...args) {
    const type = args[0];
    const listeners = this._listeners[type];
    if (!listeners) {
      return;
    }

    // Equivalent of Array.prototype.slice.call(arguments, 1);
    const l = args.length;
    const copyArgs = Array.from({length: l - 1});
    for (let ai = 1; ai < l; ai++) {
      copyArgs[ai - 1] = args[ai];
    }

    for (const listener of listeners) {
      listener.apply(this, copyArgs);
    }
  }
}

EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.on = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

export {EventEmitter};
