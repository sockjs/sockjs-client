'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.stop();
    self.emit('close', code, reason);
    self.removeAllListeners();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  debug('close');
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
  this.stop();
  this.emit('close', null, 'user');
  this.removeAllListeners();
};

module.exports = SenderReceiver;
