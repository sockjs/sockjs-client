'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , EventSourceReceiver = require('./receiver/eventsource')
  , XHRCorsObject = require('./sender/xhr-cors')
  ;

function EventSourceTransport(transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

util.inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function () {
  return ('EventSource' in global);
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;
