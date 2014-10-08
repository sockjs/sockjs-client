'use strict';

var util = require('util')
  , SimpleEvent = require('../../simpleevent')
  , EventTarget = require('../../polyfills/eventtarget')
  ;

function XhrReceiver(url, AjaxObject) {
  EventTarget.call(this);
  var self = this;
  var bufPos = 0;

  this.xo = new AjaxObject('POST', url, null);
  function chunkHandler(status, text) {
    if (status !== 200) {
      return;
    }
    for(;;) {
      var buf = text.slice(bufPos);
      var p = buf.indexOf('\n');
      if (p === -1) {
        break;
      }
      bufPos += p + 1;
      var msg = buf.slice(0, p);
      self.dispatchEvent(new SimpleEvent('message', {data: msg}));
    }
  }
  this.xo.on('chunk', chunkHandler);
  this.xo.on('finish', function(status, text) {
    chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    self.dispatchEvent(new SimpleEvent('close', {reason: reason}));
  });
}

util.inherits(XhrReceiver, EventTarget);

XhrReceiver.prototype.abort = function() {
  if (this.xo) {
    this.xo.close();
    this.dispatchEvent(new SimpleEvent('close', {reason: 'user'}));
    this.xo = null;
  }
};

module.exports = XhrReceiver;
