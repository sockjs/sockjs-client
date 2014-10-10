'use strict';

var utils = require('./utils')
  , JSON3 = require('json3')
  , FacadeJS = require('./facade')
  , InfoIframeFacade = require('./transport/facade/info-receiver-iframe')
  , iframeUtils = require('./transports/lib/iframe-utils')
  , loc = require('./polyfills/location')
  ;

module.exports = function (SockJS, facadeTransports) {
  var transportMap = {};
  for (var i = 0; i < facadeTransports.length; i++) {
    transportMap[facadeTransports[i].transportName] = facadeTransports[i];
  }
  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeFacade.transportName] = InfoIframeFacade;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = global.location.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof utils.parentOrigin === 'undefined') {
        utils.parentOrigin = e.origin;
      }
      if (e.origin !== utils.parentOrigin) {
        return;
      }

      var windowId = e.data.slice(0, 8);
      var type = e.data.slice(8, 9);
      var data = e.data.slice(9);
      if (windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch(type) {
      case 's':
        var p = JSON3.parse(data);
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        // change this to semver logic
        if (version !== SockJS.version) {
          utils.log('Incompatibile SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!utils.isSameOriginUrl(transUrl, loc.href) ||
            !utils.isSameOriginUrl(baseUrl, loc.href)) {
          utils.log('Can\'t connect to different domain from within an ' +
                    'iframe. (' + JSON3.stringify([global.location.href, transUrl, baseUrl]) +
                    ')');
          return;
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    utils.attachMessage(onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};
