'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./ajax-based')
  , EventSourceReceiver = require('./trans-receiver-eventsource')
  , XHRLocalObject = require('./xhr-local')
  ;

function EventSourceTransport(ri, transUrl) {
  this.run(ri, transUrl, '/eventsource', EventSourceReceiver, XHRLocalObject);
}

util.inherits(EventSourceTransport, AjaxBasedTransport);

module.exports = EventSourceTransport;
