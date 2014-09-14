'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./ajax-based')
  , XhrReceiver = require('./trans-receiver-xhr')
  , XHRCorsObject = require('./xhr-cors')
  , utils = require('./utils')
  ;

function XhrPollingTransport(ri, transUrl) {
  this.run(ri, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

util.inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(url, info) {
  if (info.null_origin) {
    return false;
  }
  if (window.XMLHttpRequest && utils.isSameOriginUrl(url)) {
    return true;
  }
  return utils.isXHRCorsCapable() === 1;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;
