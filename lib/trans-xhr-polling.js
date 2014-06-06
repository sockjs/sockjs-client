'use strict';
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var AjaxBasedTransport = require('./ajax-based');
var XhrStreamingTransport = require('./trans-xhr-streaming');
var XhrReceiver = require('./trans-receiver-xhr');
var XHRCorsObject = require('./xhr-cors');

function XhrPollingTransport(ri, trans_url) {
    this.run(ri, trans_url, '/xhr', XhrReceiver, XHRCorsObject);
}

XhrPollingTransport.prototype = new AjaxBasedTransport();

XhrPollingTransport.enabled = XhrStreamingTransport.enabled;
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;