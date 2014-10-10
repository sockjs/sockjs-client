'use strict';

// currentWindowId comes from SockJS.bootstrap_iframe()
module.exports = {
  currentWindowId: null
, postMessage: function (type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(this.currentWindowId + type + (data || ''), '*');
    } else {
      console.log('Cannot postMessage, no parent window.', type, data);
    }
  }
};
