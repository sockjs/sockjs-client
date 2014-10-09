'use strict';

var util = require('util')
  , EventTarget = require('../../polyfills/eventtarget')
  , TransMessageEvent = require('./trans-message-event')
  , CloseEvent = require('./closeevent')
  ;

function Polling(Receiver, receiveUrl, AjaxObject) {
  EventTarget.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

util.inherits(Polling, EventTarget);

Polling.prototype._scheduleReceiver = function() {
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
  poll.onmessage = function(e) {
    self.dispatchEvent(new TransMessageEvent(e.data));
  };
  poll.onclose = function(e) {
    self.poll = poll = poll.onmessage = poll.onclose = null;
    if (!self.pollIsClosing) {
      if (e.reason === 'network') {
        self._scheduleReceiver();
      } else {
        var ce = new CloseEvent();
        ce.code = e.code || 1000;
        ce.reason = e.reason;
        self.dispatchEvent(ce);
      }
    }
  };
};

Polling.prototype.abort = function() {
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;
