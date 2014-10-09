'use strict';

var util = require('util')
  , Event = require('../../polyfills/event')
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

util.inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;
