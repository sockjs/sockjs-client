'use strict';

var util = require('util')
  , XhrReceiver = require('../receiver/xhr')
  , XHRLocalObject = require('../sender/xhr-local')
  , AjaxBasedTransport = require('../lib/ajax-based')
  ;

function XhrPollingITransport(ri, transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRLocalObject);
}

util.inherits(XhrPollingITransport, AjaxBasedTransport);

XhrPollingITransport.transportName = 'w-iframe-xhr-polling';

module.exports = XhrPollingITransport;
