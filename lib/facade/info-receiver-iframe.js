'use strict';

var XHRLocalObject = require('../xhr-local')
  , JSON3 = require('json3')
  , InfoReceiver = require('../info-receiver')
  , util = require('util')
  , EventTarget = require('../polyfills/eventtarget')
  , TransportMessageEvent = require('../trans-message-event')
  , CloseEvent = require('../closeevent')
  ;

function WInfoReceiverIframe(transUrl, baseUrl) {
  EventTarget.call(this);

  var ir = new InfoReceiver(baseUrl, XHRLocalObject);
  ir.on('finish', function(info, rtt) {
    self.dispatchEvent(new TransportMessageEvent('m' + JSON3.stringify([info, rtt])));
    self.dispatchEvent(new CloseEvent());
  });
}

util.inherits(WInfoReceiverIframe, EventTarget);

WInfoReceiverIframe.prototype.close = function() {};

module.exports = WInfoReceiverIframe;
