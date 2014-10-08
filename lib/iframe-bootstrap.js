'use strict';

var utils = require('./utils')
  , JSON3 = require('json3')
  , FacadeJS = require('./facade')
  ;

module.exports = function (SockJS) {
  SockJS.bootstrap_iframe = function() {
    var facade;
    utils.curr_window_id = global.location.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof utils.parent_origin === 'undefined') {
        utils.parent_origin = e.origin;
      }
      if (e.origin !== utils.parent_origin) {
        return;
      }

      var windowId = e.data.slice(0, 8);
      var type = e.data.slice(8, 9);
      var data = e.data.slice(9);
      if (windowId !== utils.curr_window_id) {
        return;
      }
      switch(type) {
      case 's':
        var p = JSON3.parse(data);
        var version = p[0];
        var protocol = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        // change this to semver logic
        if (version !== SockJS.version) {
          utils.log('Incompatibile SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }
        if (!utils.flatUrl(transUrl) || !utils.flatUrl(baseUrl)) {
          utils.log('Only basic urls are supported in SockJS');
          return;
        }

        if (!utils.isSameOriginUrl(transUrl) ||
            !utils.isSameOriginUrl(baseUrl)) {
          utils.log('Can\'t connect to different domain from within an ' +
                    'iframe. (' + JSON3.stringify([global.location.href, transUrl, baseUrl]) +
                    ')');
          return;
        }
        facade = new FacadeJS(new FacadeJS[protocol](transUrl, baseUrl));
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
    utils.postMessage('s');
  };
};
