'use strict';

// This transport generally works in any browser, but will cause a
// spinning cursor to appear in any browser other than IE.
// We may test this transport in all browsers - why not, but in
// production it should be only run in IE.

var util = require('util')
  , IframeTransport = require('../trans-iframe')
  ;

function HtmlFileIframeTransport() {
  this.protocol = 'w-iframe-htmlfile';
  this.start.apply(this, arguments);
}

util.inherits(HtmlFileIframeTransport, IframeTransport);

HtmlFileIframeTransport.enabled = function() {
  return IframeTransport.enabled();
};

HtmlFileIframeTransport.transportName = 'iframe-htmlfile';
HtmlFileIframeTransport.needBody = true;
HtmlFileIframeTransport.roundTrips = 3; // html, javascript, htmlfile

module.exports = HtmlFileIframeTransport;
