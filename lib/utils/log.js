'use strict';

module.exports = {
  info: function() {
    if (global.console && global.console.log && global.console.apply) {
      global.console.log.apply(global.console, arguments);
    }
  }
};
