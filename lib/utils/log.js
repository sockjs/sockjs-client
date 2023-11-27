'use strict';

var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = globalThis.console && globalThis.console[level] && globalThis.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return globalThis.console[level].apply(globalThis.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;
