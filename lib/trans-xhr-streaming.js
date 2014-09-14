'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./ajax-based')
  , XhrReceiver = require('./trans-receiver-xhr')
  , XHRCorsObject = require('./xhr-cors')
  , utils = require('./utils')
  ;

function XhrStreamingTransport(ri, transUrl) {
  this.run(ri, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

util.inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(url, info) {
  if (info.null_origin) {
    return false;
  }
  // Opera doesn't support xhr-streaming
  if (/opera/i.test(navigator.userAgent)) {
    return false;
  }
  if (window.XMLHttpRequest && utils.isSameOriginUrl(url)) {
    return true;
  }

  return utils.isXHRCorsCapable() === 1;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
XhrStreamingTransport.needBody = true;

module.exports = XhrStreamingTransport;
