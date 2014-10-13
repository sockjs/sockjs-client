'use strict';

require('./shims');

var u = require('url')
  , util = require('util')
  , JSON3 = require('json3')
  , random = require('./utils/random')
  , escape = require('./utils/escape')
  , origin = require('./utils/origin')
  , SecurityError = require('./error/securityerror')
  , InvalidAccessError = require('./error/invalidaccesserror')
  , InvalidStateError = require('./error/invalidstateerror')
  , Event = require('./polyfills/event')
  , EventTarget = require('./polyfills/eventtarget')
  , loc = require('./polyfills/location')
  , CloseEvent = require('./transport/lib/closeevent')
  , TransportMessageEvent = require('./transport/lib/trans-message-event')
  , InfoReceiver = require('./info-receiver')
  ;

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, transportsWhitelist) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols);
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  // TODO attempt to remove and provide another way
  this._transportsWhitelist = transportsWhitelist;

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
  sortedProtocols.forEach(function (proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  this._origin = loc.origin ? loc.origin.toLowerCase() : null;

  // TODO do we want to allow relative urls? Spec says no

  // strip port numbers for 80 and 443 cases
  // Issue #74
  if (!secure && parsedUrl.port === '80') {
    parsedUrl.host = parsedUrl.port = null;
  } else if (secure && parsedUrl.port === '443') {
    parsedUrl.host = parsedUrl.port = null;
  }

  // remove the trailing slash
  parsedUrl.pathname = parsedUrl.pathname.replace(/[/]+$/, '');

  // store the sanitized url
  this.url = u.format(parsedUrl);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._ir = new InfoReceiver(this.url);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

util.inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code && (code === 1000 || (code >= 3000 && code <= 4999));
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (!userSetCode(code)) {
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

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  if (this.readyState === SockJS.CONNECTING) {
    throw new InvalidStateError('The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info.nullOrigin = global.document && !global.document.domain;
  info.sameOrigin = origin.isSameOriginUrl(this.url, loc.href);
  // determine list of desired and supported transports
  var enabledTransports = transports(this.url, this._transportsWhitelist, info);
  this._transports = enabledTransports.main;

  // setup iframe bootstrap
  require('./iframe-bootstrap')(SockJS, enabledTransports.facade);

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' && global.document.readyState !== 'complete')) {
        this._transports.unshift(Transport);
        // TODO attach to load event to call _connect
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);

    var transportUrl = this._transUrl + '/' + this._server + '/' + random.string(8);
    var transport = new Transport(transportUrl, this._transUrl);
    transport.on('message', this._transportMessage.bind(this));
    transport.once('close', this._transportClose.bind(this));
    this._transport = transport;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  if (this.readyState === SockJS.CONNECTING) {
    this._close(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  var self = this;
  var type = msg.slice(0, 1);
  var payload;
  switch (type) {
    case 'o':
      this._open();
      break;
    case 'a':
      payload = JSON3.parse(msg.slice(1) || '[]');
      payload.forEach(function (p) {
        self._dispatchMessage(new TransportMessageEvent(p));
      });
      break;
    case 'm':
      payload = JSON3.parse(msg.slice(1) || 'null');
      this._dispatchMessage(new TransportMessageEvent(payload));
      break;
    case 'c':
      payload = JSON3.parse(msg.slice(1) || '[]');
      this._close(payload[0], payload[1]);
      break;
    case 'h':
      this.dispatchEvent(new Event().initEvent('heartbeat'));
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  this._close(code, reason);
};

SockJS.prototype._open = function() {
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event().initEvent('open'));
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._dispatchMessage = function(data) {
  var e = new Event().initEvent('message');
  e.data = data;
  this.dispatchEvent(e);
};

SockJS.prototype._close = function(code, reason, wasClean) {
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    // strictly not necessary because each transport should do this, but good cleanup
    this._transport.removeAllListeners();
    this._transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new InvalidStateError('SockJS has already been closed');
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this.readyState = SockJS.CLOSING;
  process.nextTick(function () {
    this.readyState = SockJS.CLOSED;

    // TODO if required to fail the connection, fire error event

    var e = new CloseEvent();
    e.wasClean = wasClean;
    e.code = code;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
  }.bind(this));
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function (rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function (availableTransports) {
  transports = require('./transports')(availableTransports);
  return SockJS;
};
