'use strict';

var util = require('util')
  , EventEmitter = require('events').EventEmitter
  ;

function XhrReceiver(url, AjaxObject) {
  EventEmitter.call(this);
  var self = this;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.on('finish', function(status, text) {
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    self.emit('close', null, reason);
    self._cleanup();
  });
}

util.inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function (status, text) {
  if (status !== 200 || !text) {
    return;
  }

  var self = this;
  var messages = text.split('\n');
  messages.forEach(function (msg) {
    if (!msg) {
      return;
    }
    self.emit('message', msg);
  });
};

XhrReceiver.prototype._cleanup = function () {
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  if (this.xo) {
    this.xo.close();
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;
