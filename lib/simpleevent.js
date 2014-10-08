'use strict';

var util = require('util')
  , Event = require('./polyfills/event')
  ;

var SimpleEvent = function(type, obj) {
  Event.call(this);
  this.initEvent(type);

  if (typeof obj !== 'undefined') {
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) {
        continue;
      }
      this[k] = obj[k];
    }
  }
};

util.inherits(SimpleEvent, Event);

module.exports = SimpleEvent;
