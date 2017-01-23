'use strict';

var SockJS = require('../../lib/entry')
  , iframeUtils = require('../../lib/utils/iframe')
  , urlUtils = require('../../lib/utils/url')
  , random = require('../../lib/utils/random')
  ;

var MPrefix = '_sockjs_global';
var localServerAddress = 'http://localhost:8081';

module.exports = {
  getSameOriginUrl: function () {
    if (global.location) {
      return urlUtils.getOrigin(global.location.href);
    }
    // travis does not currently have IPv6 enabled for several envs
    return localServerAddress;
  }

, updateTestServerAddress: function(server) {
    var addr = server.address();
    localServerAddress = addr.family === 'IPv6'
      ? 'http://[::1]:' + addr.port
      : 'http://localhost:' + addr.port;
  }

, getCrossOriginUrl: function () {
    if (global.clientOptions) {
      return global.clientOptions.url;
    }
    return null;
  }

, getUrl: function (path) {
    return /^http/.test(path) ? path : this.getSameOriginUrl() + path;
  }

, newSockJs: function (path, transport) {
    return new SockJS(this.getUrl(path), null, { transports: transport });
  }

, createHook: function () {
    var windowId = 'a' + random.string(8);
    if (!global[MPrefix]) {
      var map = {};
      global[MPrefix] = function(id) {
        if (!(id in map)) {
          map[id] = {
            id: id,
            del: function() {
              delete map[id];
            }
          };
        }
        return map[id];
      };
    }
    return global[MPrefix](windowId);
  }

, createIframe: function (path) {
    path = path || '/iframe.html';
    var hook = this.createHook();
    hook.iobj = iframeUtils.createIframe(path + '?a=' + random.number(1000) + '#' + hook.id, function () {
      throw new Error('iframe error');
    });
    return hook;
  }
};
