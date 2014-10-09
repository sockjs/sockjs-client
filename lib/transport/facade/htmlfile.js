'use strict';

var util = require('util')
  , HtmlfileReceiver = require('../receiver/htmlfile')
  , XHRLocalObject = require('../sender/xhr-local')
  , AjaxBasedTransport = require('../lib/ajax-based')
  ;

function HtmlFileTransport(transUrl) {
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

util.inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.transportName = 'w-iframe-htmlfile';

module.exports = HtmlFileTransport;
