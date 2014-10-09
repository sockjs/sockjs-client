'use strict';

// This transport generally works in any browser, but will cause a
// spinning cursor to appear in any browser other than IE.
// We may test this transport in all browsers - why not, but in
// production it should be only run in IE.

var util = require('util')
  , IframeTransport = require('./lib/iframe')
  ;

function HtmlFileIframeTransport(transUrl, baseUrl) {
  IframeTransport.call(this, 'w-iframe-htmlfile', transUrl, baseUrl);
}

util.inherits(HtmlFileIframeTransport, IframeTransport);

HtmlFileIframeTransport.enabled = function() {
  return IframeTransport.enabled();
};

HtmlFileIframeTransport.transportName = 'iframe-htmlfile';
HtmlFileIframeTransport.needBody = true;
HtmlFileIframeTransport.roundTrips = 3; // html, javascript, htmlfile

HtmlFileIframeTransport.facadeTransport = require('./facade/htmlfile');

module.exports = HtmlFileIframeTransport;
