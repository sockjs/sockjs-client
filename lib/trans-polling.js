'use strict';

function Polling(ri, Receiver, receiveUrl, AjaxObject) {
  this.ri = ri;
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

Polling.prototype._scheduleReceiver = function() {
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
  poll.onmessage = function(e) {
    self.ri._didMessage(e.data);
  };
  poll.onclose = function(e) {
    self.poll = poll = poll.onmessage = poll.onclose = null;
    if (!self.pollIsClosing) {
      if (e.reason === 'permanent') {
        self.ri._didClose(1006, 'Polling error (' + e.reason + ')');
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
