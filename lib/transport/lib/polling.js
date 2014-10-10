'use strict';

var util = require('util')
  , EventEmitter = require('events').EventEmitter
  ;

function Polling(Receiver, receiveUrl, AjaxObject) {
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

util.inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1000, reason);
      }
    }
  });
};

Polling.prototype.abort = function() {
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
  this.removeAllListeners();
};

module.exports = Polling;
