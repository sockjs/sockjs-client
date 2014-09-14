'use strict';

var util = require('util')
  , Event = require('./event')
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

util.inherits(CloseEvent, Event);

module.exports = CloseEvent;
