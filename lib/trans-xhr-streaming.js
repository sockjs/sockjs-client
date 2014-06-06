'use strict';
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var AjaxBasedTransport = require('./ajax-based');
var XhrReceiver = require('./trans-receiver-xhr');
var XHRCorsObject = require('./xhr-cors');
var utils = require('./utils');

function XhrStreamingTransport(ri, trans_url) {
    this.run(ri, trans_url, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

XhrStreamingTransport.prototype = new AjaxBasedTransport();

XhrStreamingTransport.enabled = function(url) {
    // Opera doesn't support xhr-streaming
    if (/opera/i.test(navigator.userAgent)) return false;
    if (window.XMLHttpRequest && utils.isSameOriginUrl(url)) return true;

    return utils.isXHRCorsCapable() === 1;
};
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
XhrStreamingTransport.need_body = true;

module.exports = XhrStreamingTransport;