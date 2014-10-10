'use strict';
/* global jQuery, client_opts, SockJS */

var random = require('../../../lib/utils/random');

// May be used by htmlfile jsonp and transports.
var MPrefix = '_sockjs_global';
var createHook = function() {
  var windowId = 'a' + random.string(8);
  if (!(MPrefix in window)) {
    var map = {};
    window[MPrefix] = function(windowId) {
      if (!(windowId in map)) {
        map[windowId] = {
          id: windowId,
          del: function() {delete map[windowId];}
        };
      }
      return map[windowId];
    };
  }
  return window[MPrefix](windowId);
};

module.exports = {

  newIframe: function(path) {
    var err, hook;
    if (!path) {
      path = '/iframe.html';
    }
    hook = createHook();
    err = function() {
      return u.log('iframe error. bad.');
    };
    hook.iobj = u.createIframe(path + '?a=' + Math.random() + '#' + hook.id, err);
    return hook;
  },

  newSockJS: function(path, protocol) {
    var options, url;
    url = /^http/.test(path) ? path : client_opts.url + path;
    options = jQuery.extend({}, client_opts.sockjs_opts);
    if (protocol) options.protocols_whitelist = [protocol];
    return new SockJS(url, null, options);
  }

};