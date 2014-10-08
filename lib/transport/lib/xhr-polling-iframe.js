'use strict';

var util = require('util')
  , XhrReceiver = require('./receiver-xhr')
  , XHRLocalObject = require('./xhr-local')
  , AjaxBasedTransport = require('../../ajax-based')
  ;

// w-iframe-xhr-polling
function XhrPollingITransport(ri, transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRLocalObject);
}

util.inherits(XhrPollingITransport, AjaxBasedTransport);

module.exports = XhrPollingITransport;
