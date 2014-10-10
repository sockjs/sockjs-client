'use strict';

var util = require('util')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, transUrl + urlSuffix, AjaxObject);
  this.poll.on('message', function (msg) {
    self.emit('message', msg);
  });
  this.poll.once('close', function (code, reason) {
    self.poll = null;
    self.stop();
    self.emit('close', code, reason);
    self.removeAllListeners();
  });
}

util.inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
  this.stop();
  this.emit('close', null, 'user');
  this.removeAllListeners();
};

module.exports = SenderReceiver;
