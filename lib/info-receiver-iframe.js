'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , JSON3 = require('json3')
  , utils = require('./utils/event')
  , IframeTransport = require('./transport/iframe')
  ;

function InfoReceiverIframe(method, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = new IframeTransport('w-iframe-info-receiver', url, url);
    var fun = function(e) {
      if (e.data && e.data.substr(0,1) === 'm') {
        var d = JSON3.parse(e.data.substr(1));
        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      } else {
        self.emit('finish');
      }
      ifr.doCleanup();
      ifr = null;
    };
    ifr.onmessage = ifr.onclose = fun;
  };
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

util.inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.prototype.close = function () {
  // TODO maybe cleanup ifr?
};

module.exports = InfoReceiverIframe;
