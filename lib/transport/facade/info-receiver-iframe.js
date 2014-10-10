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
  ir.once('finish', function(info, rtt) {
    self.emit('message', JSON3.stringify([info, rtt]) );
  });
}

util.inherits(WInfoReceiverIframe, EventEmitter);

WInfoReceiverIframe.transportName = 'w-iframe-info-receiver';

WInfoReceiverIframe.prototype.close = function() {};

module.exports = WInfoReceiverIframe;
