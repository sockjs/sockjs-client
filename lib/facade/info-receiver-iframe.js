'use strict';

var XHRLocalObject = require('../xhr-local')
  , JSON3 = require('json3')
  , InfoReceiver = require('../info-receiver')
  ;

function WInfoReceiverIframe(ri, transUrl, baseUrl) {
  var ir = new InfoReceiver(baseUrl, XHRLocalObject);
  ir.on('finish', function(info, rtt) {
    ri._didMessage('m' + JSON3.stringify([info, rtt]));
    ri._didClose();
  });
}

WInfoReceiverIframe.prototype.close = function() {};

module.exports = WInfoReceiverIframe;
