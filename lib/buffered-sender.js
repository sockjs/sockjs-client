'use strict';

function BufferedSender() {}
BufferedSender.prototype.sendConstructor = function(sender) {
  this.sendBuffer = [];
  this.sender = sender;
};
BufferedSender.prototype.doSend = function(message) {
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
    this.sendStop = this.sender(this.transUrl, payload, function(success, abortReason) {
      self.sendStop = null;
      if (success === false) {
        self.ri._didClose(1006, 'Sending error ' + abortReason);
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype.sendDestructor = function() {
  if (this._sendStop) {
    this._sendStop();
  }
  this._sendStop = null;
};

module.exports = BufferedSender;
