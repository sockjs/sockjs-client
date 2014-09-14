'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , JSON3 = require('json3')
  , utils = require('./utils')
  , IframeTransport = require('./trans-iframe')
  ;

function InfoReceiverIframe(baseUrl) {
  var self = this;
  var go = function() {
    var ifr = new IframeTransport();
    ifr.protocol = 'w-iframe-info-receiver';
    var fun = function(r) {
      if (typeof r === 'string' && r.substr(0,1) === 'm') {
        var d = JSON3.parse(r.substr(1));
        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      } else {
        self.emit('finish');
      }
      ifr.doCleanup();
      ifr = null;
    };
    var mockRi = {
      _didClose: fun,
      _didMessage: fun
    };
    ifr.start(mockRi, baseUrl, baseUrl);
  };
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

util.inherits(InfoReceiverIframe, EventEmitter);

module.exports = InfoReceiverIframe;
