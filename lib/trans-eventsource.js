'use strict';

var AjaxBasedTransport = require('./ajax-based');
var EventSourceReceiver = require('./trans-receiver-eventsource');
var XHRLocalObject = require('./xhr-local');

function EventSourceTransport(ri, trans_url) {
    this.run(ri, trans_url, '/eventsource', EventSourceReceiver, XHRLocalObject);
}
EventSourceTransport.prototype = new AjaxBasedTransport();

module.exports = EventSourceTransport;