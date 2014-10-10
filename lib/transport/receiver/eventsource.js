'use strict';

var util = require('util')
  , EventEmitter = require('events').EventEmitter
  ;

function EventSourceReceiver(url) {
  EventEmitter.call(this);

  var self = this;
  var es = new global.EventSource(url);
  es.onmessage = function(e) {
    self.emit('message', decodeURI(e.data));
  };
  this.esClose = es.onerror = function(e, abortReason) {
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = abortReason ? 'user' :
        (es.readyState !== 2 ? 'network' : 'permanent');
    self.esClose = es.onmessage = es.onerror = null;
    // EventSource reconnects automatically.
    es.close();
    es = null;
    // Safari and chrome < 15 crash if we close window before
    // waiting for ES cleanup. See:
    //   https://code.google.com/p/chromium/issues/detail?id=89155
    setTimeout(function() {
      self.emit('close', null, reason);
      self.removeAllListeners();
    }, 200);
  };
}

util.inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  if (this.esClose) {
    this.esClose({}, true);
  }
};

module.exports = EventSourceReceiver;
