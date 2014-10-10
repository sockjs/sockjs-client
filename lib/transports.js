'use strict';

module.exports = function (availableTransports) {
  return function (url, transportsWhitelist, info) {
    var transports = {
      main: []
    , facade: []
    };
    if (!transportsWhitelist) {
      transportsWhitelist = [];
    }

    availableTransports.forEach(function (trans) {
      if (!trans) {
        return;
      }

      if (transportsWhitelist.length &&
          transportsWhitelist.indexOf(trans.transportName) === -1) {
        return;
      }

      if (trans.enabled(url, info)) {
        transports.main.push(trans);
        if (trans.facadeTransport) {
          transports.facade.push(trans.facadeTransport);
        }
      }
    });
    return transports;
  };
};
