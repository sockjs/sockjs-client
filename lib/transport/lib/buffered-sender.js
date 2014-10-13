'use strict';

var util = require('util')
  , EventEmitter = require('events').EventEmitter
  ;

function BufferedSender(url, sender) {
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

util.inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  var self = this;
  var tref;
  this.sendStop = function() {
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self._cleanup();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function () {
  this.removeAllListeners();
};

BufferedSender.prototype.stop = function() {
  if (this.sendStop) {
    this.sendStop();
  }
  this.sendStop = null;
  this._cleanup();
};

module.exports = BufferedSender;
