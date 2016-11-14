'use strict';

var Driver = (<any>global).WebSocket || (<any>global).MozWebSocket;
if (Driver) {
  module.exports = function WebSocketBrowserDriver(url) {
    return new Driver(url);
  };
}
