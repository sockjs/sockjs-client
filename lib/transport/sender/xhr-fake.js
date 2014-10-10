'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  ;

function XHRFake(method, url, payload, opts) {
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, 2000);
}

util.inherits(XHRFake, EventEmitter);

module.exports = XHRFake;
