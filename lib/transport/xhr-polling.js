'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./lib/receiver-xhr')
  , XHRCorsObject = require('../xhr-cors')
  , utils = require('../utils')
  ;

function XhrPollingTransport(ri, transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

util.inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(url, info) {
  if (info.nullOrigin) {
    return false;
  }
  if (global.XMLHttpRequest && utils.isSameOriginUrl(url)) {
    return true;
  }
  return utils.isXHRCorsCapable() === 1;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;
