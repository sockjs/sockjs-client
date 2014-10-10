'use strict';

utils.log = function() {
  if (global.console && console.log && console.log.apply) {
    console.log.apply(console, arguments);
  }
};
