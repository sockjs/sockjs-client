'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./ajax-based')
  , XhrReceiver = require('./trans-receiver-xhr')
  , XDRObject = require('./xdr')
  , utils = require('./utils')
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(ri, transUrl) {
  this.run(ri, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

util.inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(url, info) {
  if (info.cookie_needed || info.null_origin) {
    return false;
  }
  // IE 8/9 if the request target uses the same scheme - #79
  return !!(window.XDomainRequest && document.domain && utils.isSameOriginScheme(url));
};

XdrStreamingTransport.transportName = 'xdr-streaming';

XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;
