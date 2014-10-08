'use strict';

module.exports = function (availableTransports) {
  return function (url, transportsWhitelist, info) {
    var transports = [];
    if (!transportsWhitelist) {
      transportsWhitelist = [];
    }

    for (var i = 0; i < availableTransports.length; i++) {
      var trans = availableTransports[i];
      if (!trans) {
        continue;
      }

      if (transportsWhitelist.length &&
          transportsWhitelist.indexOf(trans.transportName) === -1) {
        continue;
      }

      if (trans.enabled(url, info)) {
        transports.push(trans);
      }
    }
    return transports;
  };
};
