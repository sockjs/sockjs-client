'use strict';

var XHRLocalObject = require('../sender/xhr-local')
  , JSON3 = require('json3')
  , InfoReceiver = require('../../info-receiver')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  ;

function WInfoReceiverIframe(transUrl, baseUrl) {
  var self = this;
  EventEmitter.call(this);

  var ir = new InfoReceiver(baseUrl, XHRLocalObject);
  ir.on('finish', function(info, rtt) {
    self.emit('message', 'm' + JSON3.stringify([info, rtt]) );
    self.emit('close');
  });
}

util.inherits(WInfoReceiverIframe, EventEmitter);

WInfoReceiverIframe.transportName = 'w-iframe-info-receiver';

WInfoReceiverIframe.prototype.close = function() {};

module.exports = WInfoReceiverIframe;
