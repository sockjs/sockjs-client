'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  ;

var InfoReceiverFake = function() {
  // It may not be possible to do cross domain AJAX to get the info
  // data, for example for IE7. But we want to run JSONP, so let's
  // fake the response, with rtt=2s (rto=6s).
  var self = this;
  process.nextTick(function() {
    self.emit('finish', {}, 2000);
  });
};

util.inherits(InfoReceiverFake, EventEmitter);

module.exports = InfoReceiverFake;
