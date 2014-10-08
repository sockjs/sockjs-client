'use strict';

function Event() {}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = Date.now();
  return this;
};

module.exports = global.Event || Event;
