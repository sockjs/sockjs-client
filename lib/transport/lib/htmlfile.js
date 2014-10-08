'use strict';

var util = require('util')
  , HtmlfileReceiver = require('./receiver-htmlfile')
  , XHRLocalObject = require('../../xhr-local')
  , AjaxBasedTransport = require('./ajax-based')
  ;

function HtmlFileTransport(transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

util.inherits(HtmlFileTransport, AjaxBasedTransport);

module.exports = HtmlFileTransport;
