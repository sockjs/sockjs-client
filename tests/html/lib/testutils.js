'use strict';
/* global jQuery, client_opts, SockJS */

var u = require('../../../lib/utils');

module.exports = {

newIframe: function(path) {
  var err, hook;
  if (!path) path = '/iframe.html';
  hook = u.createHook();
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