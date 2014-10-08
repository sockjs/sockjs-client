'use strict';

var util = require('util')
  , EventTarget = require('../../polyfills/eventtarget')
  , TransMessageEvent = require('../../trans-message-event')
  , CloseEvent = require('../../closeevent')
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
      if (e.reason === 'permanent') {
        var ce = new CloseEvent();
        ce.code = 1006;
        ce.reason = 'Polling error (' + e.reason + ')';
        self.dispatchEvent(ce);
      } else {
        self._scheduleReceiver();
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
