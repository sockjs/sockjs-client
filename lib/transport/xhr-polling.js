'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , utils = require('../utils')
  , loc = require('../polyfills/location')
  ;

function XhrPollingTransport(ri, transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

util.inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(url, info) {
  if (info.nullOrigin) {
    return false;
  }
  if (global.XMLHttpRequest && utils.isSameOriginUrl(url, loc.href)) {
    return true;
  }
  return XHRCorsObject.capable();
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;
