'use strict';

var util = require('util')
  , SimpleEvent = require('../../simpleevent')
  , EventTarget = require('../../polyfills/eventtarget')
  ;

function XhrReceiver(url, AjaxObject) {
  EventTarget.call(this);
  var self = this;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.on('finish', function(status, text) {
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    self.dispatchEvent(new SimpleEvent('close', {reason: reason}));
  });
}

util.inherits(XhrReceiver, EventTarget);

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
    self.dispatchEvent(new SimpleEvent('message', {data: msg}));
  });
};

XhrReceiver.prototype.abort = function() {
  if (this.xo) {
    this.xo.close();
    this.dispatchEvent(new SimpleEvent('close', {reason: 'user'}));
    this.xo = null;
  }
};

module.exports = XhrReceiver;
