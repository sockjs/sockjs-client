'use strict';

module.exports = {
  log: function() {
    if (global.console && console.log && console.log.apply) {
      console.log.apply(console, arguments);
    }
  }
};
