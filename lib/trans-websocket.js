'use strict';

var utils = require('./utils');

function WebSocketTransport(ri, transUrl) {
  var self = this;
  var url = transUrl + '/websocket';
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.ri = ri;
  this.url = url;
  var Constructor = window.WebSocket || window.MozWebSocket;

  this.ws = new Constructor(this.url);
  this.ws.onmessage = function(e) {
    self.ri._didMessage(e.data);
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
    self.ri._didMessage(utils.closeFrame(1006, 'WebSocket connection broken'));
  };
}

WebSocketTransport.prototype.doSend = function(data) {
  this.ws.send('[' + data + ']');
};

WebSocketTransport.prototype.doCleanup = function() {
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
    ws.close();
    utils.unloadDel(this.unloadRef);
    this.unloadRef = this.ri = this.ws = null;
  }
};

WebSocketTransport.enabled = function() {
  return !!(window.WebSocket || window.MozWebSocket);
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;
