'use strict';

var util = require('util')
  , AjaxBasedTransport = require('../ajax-based')
  , XdrStreamingTransport = require('./xdr-streaming')
  , XhrReceiver = require('../trans-receiver-xhr')
  , XDRObject = require('../xdr')
  ;

function XdrPollingTransport(ri, transUrl) {
  this.run(ri, transUrl, '/xhr', XhrReceiver, XDRObject);
}

util.inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;
