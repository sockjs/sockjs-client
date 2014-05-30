'use strict';
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var AjaxBasedTransport = require('./ajax-based');
var XdrStreamingTransport = require('./trans-xdr-streaming');
var XhrReceiver = require('./trans-receiver-xhr');
var XDRObject = require('./xdr');

function XdrPollingTransport(ri, trans_url) {
    this.run(ri, trans_url, '/xhr', XhrReceiver, XDRObject);
}

XdrPollingTransport.prototype = new AjaxBasedTransport();

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;