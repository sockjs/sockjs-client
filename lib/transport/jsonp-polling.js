'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var util = require('util')
  , BufferedSender = require('./lib/buffered-sender')
  , Polling = require('./lib/polling')
  , JsonpReceiver = require('./receiver/jsonp')
  , jsonpSender = require('./sender/jsonp')
  ;

// TODO this logic is very similar to ajax-based. See if we could combine.

function JsonPTransport(transUrl) {
  var self = this;
  BufferedSender.call(this, transUrl, jsonpSender);

  this.poll = new Polling(JsonpReceiver, this.transUrl + '/jsonp');
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

util.inherits(JsonPTransport, BufferedSender);

JsonPTransport.prototype.close = function() {
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
  this.stop();
  this.emit('close', null, 'user');
  this.removeAllListeners();
};

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;
