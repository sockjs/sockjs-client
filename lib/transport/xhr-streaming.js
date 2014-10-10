'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  , utils = require('../utils/origin')
  , browser = require('../utils/browser')
  , loc = require('../polyfills/location')
  ;

function XhrStreamingTransport(transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

util.inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(url, info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming
  if (browser.isOpera()) {
    return false;
  }

  if (XHRLocalObject.enabled && utils.isSameOriginUrl(url, loc.href)) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
XhrStreamingTransport.needBody = true;

module.exports = XhrStreamingTransport;
