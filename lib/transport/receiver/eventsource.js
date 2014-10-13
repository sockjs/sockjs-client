'use strict';

var util = require('util')
  , EventEmitter = require('events').EventEmitter
  ;

function EventSourceReceiver(url) {
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new global.EventSource(url);
  es.onmessage = function(e) {
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function () {
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self.close(reason);
  };
}

util.inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function () {
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function (reason) {
  var self = this;
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;
