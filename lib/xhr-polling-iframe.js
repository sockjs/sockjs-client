'use strict';

var util = require('util')
  , XhrReceiver = require('./trans-receiver-xhr')
  , XHRLocalObject = require('./xhr-local')
  , AjaxBasedTransport = require('./ajax-based')
  ;

// w-iframe-xhr-polling
function XhrPollingITransport(ri, transUrl) {
  this.run(ri, transUrl, '/xhr', XhrReceiver, XHRLocalObject);
}

util.inherits(XhrPollingITransport, AjaxBasedTransport);

module.exports = XhrPollingITransport;
