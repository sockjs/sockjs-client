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

function JsonPTransport(transUrl) {
  var self = this;
  BufferedSender.call(this, transUrl, jsonpSender);
  
  this.poll = new Polling(JsonpReceiver, this.transUrl + '/jsonp');
  this.poll.onmessage = this.poll.onclose = function (e) {
    self.dispatchEvent(e);
  };
}

util.inherits(JsonPTransport, BufferedSender);

JsonPTransport.prototype.close = function() {
  if (this.poll) {
    this.poll.abort();
    this.poll.onmessage = this.poll.onclose = null;
    this.poll = null;
  }
  this.stop();
};

JsonPTransport.enabled = function() {
  return true;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;
