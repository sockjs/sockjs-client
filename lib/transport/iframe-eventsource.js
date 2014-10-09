'use strict';

var util = require('util')
  , IframeTransport = require('./lib/iframe')
  ;

function EventSourceIframeTransport(transUrl, baseUrl) {
  IframeTransport.call(this, 'w-iframe-eventsource', transUrl, baseUrl);
}

util.inherits(EventSourceIframeTransport, IframeTransport);

EventSourceIframeTransport.enabled = function () {
  return ('EventSource' in global) && IframeTransport.enabled();
};

EventSourceIframeTransport.transportName = 'iframe-eventsource';
EventSourceIframeTransport.needBody = true;
EventSourceIframeTransport.roundTrips = 3; // html, javascript, eventsource

EventSourceIframeTransport.facadeTransport = require('./facade/eventsource');

module.exports = EventSourceIframeTransport;
