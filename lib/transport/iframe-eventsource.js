'use strict';

var util = require('util')
  , IframeTransport = require('./lib/iframe')
  ;

function EventSourceIframeTransport() {
  this.protocol = 'w-iframe-eventsource';
  this.start.apply(this, arguments);
}

util.inherits(EventSourceIframeTransport, IframeTransport);

EventSourceIframeTransport.enabled = function () {
  return ('EventSource' in window) && IframeTransport.enabled();
};

EventSourceIframeTransport.transportName = 'iframe-eventsource';
EventSourceIframeTransport.needBody = true;
EventSourceIframeTransport.roundTrips = 3; // html, javascript, eventsource

module.exports = EventSourceIframeTransport;
