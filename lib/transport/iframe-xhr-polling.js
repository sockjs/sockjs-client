'use strict';

var util = require('util')
  , IframeTransport = require('../trans-iframe')
  ;

function XhrPollingIframeTransport() {
  this.protocol = 'w-iframe-xhr-polling';
  this.start.apply(this, arguments);
}

util.inherits(XhrPollingIframeTransport, IframeTransport);

XhrPollingIframeTransport.enabled = function () {
  return window.XMLHttpRequest && IframeTransport.enabled();
};

XhrPollingIframeTransport.transportName = 'iframe-xhr-polling';
XhrPollingIframeTransport.needBody = true;
XhrPollingIframeTransport.roundTrips = 3; // html, javascript, xhr

module.exports = XhrPollingIframeTransport;
