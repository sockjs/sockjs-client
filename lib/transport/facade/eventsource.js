'use strict';

var util = require('util')
  , AjaxBasedTransport = require('../lib/ajax-based')
  , EventSourceReceiver = require('../receiver/eventsource')
  , XHRLocalObject = require('../sender/xhr-local')
  ;

function EventSourceTransport(transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRLocalObject);
}

util.inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.transportName = 'w-iframe-eventsource';

module.exports = EventSourceTransport;
