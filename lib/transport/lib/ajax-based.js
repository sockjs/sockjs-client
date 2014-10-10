'use strict';

var util = require('util')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type':'text/plain'};
    }
    var xo = new AjaxObject('POST', url + '/xhr_send', payload, opt);
    xo.on('finish', function(status) {
      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      callback();
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  var self = this;
  BufferedSender.call(this, transUrl, createAjaxSender(AjaxObject));

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

util.inherits(AjaxBasedTransport, BufferedSender);

AjaxBasedTransport.prototype.close = function() {
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
  this.stop();
  this.emit('close', null, 'user');
  this.removeAllListeners();
};

module.exports = AjaxBasedTransport;
