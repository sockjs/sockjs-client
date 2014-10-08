'use strict';

var util = require('util')
  , AjaxBasedTransport = require('./ajax-based')
  , EventSourceReceiver = require('./receiver-eventsource')
  , XHRLocalObject = require('../../xhr-local')
  ;

function EventSourceTransport(transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRLocalObject);
}

util.inherits(EventSourceTransport, AjaxBasedTransport);

module.exports = EventSourceTransport;
