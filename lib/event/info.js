'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function InfoEvent(info, rtt, headers) {
  Event.call(this);
  this.initEvent('info', false, false);
  this.info = info;
  this.rtt = rtt;
  this.headers = headers;
}

inherits(InfoEvent, Event);

module.exports = InfoEvent;
