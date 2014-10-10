'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , JSON3 = require('json3')
  , utils = require('./utils/event')
  , IframeTransport = require('./transport/iframe')
  ;

function InfoIframe(url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport('w-iframe-info-receiver', url, url);

    ifr.on('message', function (msg) {
      if (msg && msg.substr(0,1) === 'm') {
        var d = JSON3.parse(msg.substr(1));
        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function () {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

util.inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function (url) {
  return IframeTransport.enabled(url);
};

InfoIframe.prototype.close = function () {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;
