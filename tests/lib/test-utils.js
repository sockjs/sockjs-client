'use strict';

var SockJS = require('../../lib/entry')
  , iframeUtils = require('../../lib/utils/iframe')
  , random = require('../../lib/utils/random')
  ;

var MPrefix = '_sockjs_global';

module.exports = {
  getOriginUrl: function () {
    if (global.location) {
      return global.location.origin;
    }
    return 'http://localhost:8081';
  }

, getUrl: function (path) {
    return /^http/.test(path) ? path : this.getOriginUrl() + path;
  }

, newSockJs: function (path, transport) {
    return new SockJS(this.getUrl(path), null, transport);
  }

, createHook: function () {
    var windowId = 'a' + random.string(8);
    if (!global[MPrefix]) {
      var map = {};
      global[MPrefix] = function(windowId) {
        if (!(windowId in map)) {
          map[windowId] = {
            id: windowId,
            del: function() {delete map[windowId];}
          };
        }
        return map[windowId];
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
