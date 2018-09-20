'use strict';

var SockJS = require('../../lib/entry')
  , iframeUtils = require('../../lib/utils/iframe')
  , urlUtils = require('../../lib/utils/url')
  , random = require('../../lib/utils/random')
  ;

var MPrefix = '_sockjs_global';

module.exports = {
  getSameOriginUrl: function () {
    if (global.location) {
      return urlUtils.getOrigin(global.location.href) + '/sockjs-test';
    }
    // travis does not currently have IPv6 enabled for several envs
    return 'http://localhost:8081';
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
    hook.iobj = iframeUtils.createIframe(path + '?a=' + random.number(1000) + '#' + hook.id, function (err) {
      throw (err || new Error('iframe error'));
    });
    return hook;
  }
};
