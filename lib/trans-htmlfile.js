'use strict';

var HtmlfileReceiver = require('./trans-receiver-htmlfile');
var XHRLocalObject = require('./xhr-local');
var AjaxBasedTransport = require('./ajax-based');

function HtmlFileTransport(ri, trans_url) {
    this.run(ri, trans_url, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

HtmlFileTransport.prototype = new AjaxBasedTransport();

module.exports = HtmlFileTransport;