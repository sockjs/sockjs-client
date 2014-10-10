'use strict';

var utils = require('../utils/event')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , WebsocketDriver = require('./driver/websocket')
  ;

function WebSocketTransport(transUrl) {
  EventEmitter.call(this);

  var self = this;
  var url = transUrl + '/websocket';
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url);
  this.ws.onmessage = function(e) {
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function(){
    self.ws.close();
  });
  this.ws.onclose = this.ws.onerror = function() {
    self.emit('close', 1006, 'WebSocket connection broken');
    self.removeAllListeners();
  };
}

util.inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  this.ws.send('[' + data + ']');
};

WebSocketTransport.prototype.close = function() {
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
    ws.close();
    utils.unloadDel(this.unloadRef);
    this.unloadRef = this.ws = null;
  }
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;
