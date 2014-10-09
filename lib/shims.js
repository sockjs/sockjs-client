'use strict';

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

if (!Function.prototype.bind) {
  /* eslint no-extend-native: 0 */
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        self = this,
        NOP = function () {},
        Bound = function () {
          return self.apply(this instanceof NOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    NOP.prototype = this.prototype;
    Bound.prototype = new NOP();

    return Bound;
  };
}
