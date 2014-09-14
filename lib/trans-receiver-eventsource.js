'use strict';

var util = require('util')
  , SimpleEvent = require('./simpleevent')
  , REventTarget = require('./reventtarget')
  ;

function EventSourceReceiver(url) {
  var self = this;
  var es = new EventSource(url);
  es.onmessage = function(e) {
    self.dispatchEvent(new SimpleEvent('message', {'data': decodeURI(e.data)}));
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
      self.dispatchEvent(new SimpleEvent('close', {reason: reason}));
    }, 200);
  };
}

util.inherits(EventSourceReceiver, REventTarget);

EventSourceReceiver.prototype.abort = function() {
  if (this.esClose) {
    this.esClose({}, true);
  }
};

module.exports = EventSourceReceiver;
