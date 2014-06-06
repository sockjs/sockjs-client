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
var XDRObject = require('./xdr');
var utils = require('./utils');

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(ri, trans_url) {
    this.run(ri, trans_url, '/xhr_streaming', XhrReceiver, XDRObject);
}

XdrStreamingTransport.prototype = new AjaxBasedTransport();

XdrStreamingTransport.enabled = function(url) {
    // IE 8/9 if the request target uses the same scheme - #79
    return !!(window.XDomainRequest && document.domain && utils.isSameOriginScheme(url));
};

XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;