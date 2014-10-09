'use strict';

var util = require('util')
  , IframeTransport = require('./lib/iframe')
  ;

function XhrPollingIframeTransport(transUrl, baseUrl) {
  IframeTransport.call(this, 'w-iframe-xhr-polling', transUrl, baseUrl);
}

util.inherits(XhrPollingIframeTransport, IframeTransport);

XhrPollingIframeTransport.enabled = function () {
  return global.XMLHttpRequest && IframeTransport.enabled();
};

XhrPollingIframeTransport.transportName = 'iframe-xhr-polling';
XhrPollingIframeTransport.needBody = true;
XhrPollingIframeTransport.roundTrips = 3; // html, javascript, xhr

XhrPollingIframeTransport.facadeTransport = require('./facade/xhr-polling-iframe');

module.exports = XhrPollingIframeTransport;
