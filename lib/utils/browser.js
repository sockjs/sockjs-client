'use strict';

module.exports = {
  isOpera: function() {
    return globalThis.navigator &&
      /opera/i.test(globalThis.navigator.userAgent);
  }

, isKonqueror: function() {
    return globalThis.navigator &&
      /konqueror/i.test(globalThis.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!globalThis.document) {
      return true;
    }

    try {
      return !!globalThis.document.domain;
    } catch (e) {
      return false;
    }
  }
};
