'use strict';

var util = require('util')
  , HtmlfileReceiver = require('./trans-receiver-htmlfile')
  , XHRLocalObject = require('./xhr-local')
  , AjaxBasedTransport = require('./ajax-based')
  ;

function HtmlFileTransport(ri, transUrl) {
  this.run(ri, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

util.inherits(HtmlFileTransport, AjaxBasedTransport);

module.exports = HtmlFileTransport;
