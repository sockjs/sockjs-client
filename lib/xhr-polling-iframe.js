'use strict';

var XhrReceiver = require('./trans-receiver-xhr');
var XHRLocalObject = require('./xhr-local');
var AjaxBasedTransport = require('./ajax-based');

// w-iframe-xhr-polling
function XhrPollingITransport(ri, trans_url) {
    this.run(ri, trans_url, '/xhr', XhrReceiver, XHRLocalObject);
}

XhrPollingITransport.prototype = new AjaxBasedTransport();

module.exports = XhrPollingITransport;