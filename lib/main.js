'use strict';

require('./shims');

var u = require('url')
  , util = require('util')
  , SecurityError = require('./securityerror')
  , InvalidAccessError = require('./invalidaccesserror')
  , InvalidStateError = require('./invalidstateerror')
  , CloseEvent = require('./closeevent')
  , EventTarget = require('./eventtarget')
  , loc = require('./location')
  ;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols);
  }

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // Step 1 of WS spec - parse and validate the url
  var parsedUrl = u.parse(url);
  if (!parsedUrl.host || !parsedUrl.pathname || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.search || parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a query string or fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https' && !secure) {
    throw new SecurityError('An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (typeof protocols === 'undefined') {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  for (var i = 0; i < sortedProtocols.length; i++) {
    var proto = sortedProtocols[i];
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  }

  // Step 6 - convert origin
  this._origin = loc.origin ? loc.origin.toLowerCase() : null;

  // Step 7 - start connection in background
  this.url = parsedUrl.href;

  // TODO initiate info request
}

util.inherits(SockJS, EventTarget);

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && code !== 1000 && (code < 3000 || code > 4999)) {
    throw new InvalidAccessError('Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  var wasClean = true;
  // TODO if connection not established, stop it

  // TODO start closing handshake
  this.readyState = SockJS.CLOSING;
  process.nextTick(function () {
    this.readyState = SockJS.CLOSED;

    // TODO if required to fail the connection, fire error event

    var e = new CloseEvent();
    e.wasClean = wasClean;
    e.code = code;
    e.reason = reason;

    this.dispatchEvent(e);
  }.bind(this));
};

SockJS.prototype.send = function(/* data */) {
  if (this.readyState === SockJS.CONNECTING) {
    throw new InvalidStateError('connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }

  // TODO send data
};

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

module.exports = SockJS;
