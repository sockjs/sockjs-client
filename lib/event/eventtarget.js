/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

class EventTarget {
  constructor() {
    this._listeners = {};
  }

  addEventListener(eventType, listener) {
    if (!(eventType in this._listeners)) {
      this._listeners[eventType] = [];
    }

    let array = this._listeners[eventType];
    // #4
    if (!array.includes(listener)) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      array = [...array, listener];
    }

    this._listeners[eventType] = array;
  }

  removeEventListener(eventType, listener) {
    const array = this._listeners[eventType];
    if (!array) {
      return;
    }

    const idx = array.indexOf(listener);
    if (idx !== -1) {
      if (array.length > 1) {
        // Make a copy so as not to interfere with a current dispatchEvent.
        this._listeners[eventType] = [...array.slice(0, idx), ...array.slice(idx + 1)];
      } else {
        delete this._listeners[eventType];
      }
    }
  }

  dispatchEvent(...args) {
    const t = args[0].type;
    // TODO: This doesn't match the real behavior; per spec, onfoo get
    // their place in line from the /first/ time they're set from
    // non-null. Although WebKit bumps it to the end every time it's
    // set.
    if (this['on' + t]) {
      this['on' + t](...args);
    }

    if (t in this._listeners) {
      // Grab a reference to the listeners list. removeEventListener may alter the list.
      const listeners = this._listeners[t];
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
  }
}

export default EventTarget;
