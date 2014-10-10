'use strict';

module.exports = {
  isOpera: function () {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function () {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }
};
