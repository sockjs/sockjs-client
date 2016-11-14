'use strict';

require('./shims');

var URL = require('url-parse');
var JSON3 = require('json3');
import * as random from './utils/random';
import * as escape from './utils/escape';
import * as urlUtils from './utils/url';
import * as eventUtils from './utils/event';
import {transport} from './utils/transport';
import * as objectUtils from './utils/object';
import * as browser from './utils/browser';
import log = require('./utils/log');
import {Event} from './event/event';
import {EventTarget} from './event/eventtarget';
import loc = require('./location');
import {CloseEvent} from './event/close';
import {TransportMessageEvent} from './event/trans-message';
import {InfoReceiver} from './info-receiver';
import {iframeBootstrap} from './iframe-bootstrap';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:main');
}

var transports;

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
class SockJS extends EventTarget {
  private readyState;
  private extensions;
  private protocol;
  private _transportsWhitelist;
  private _transportOptions;
  _generateSessionId;
  private _server;
  private _origin;
  private url;
  private _urlInfo;
  private _ir;
  private _transport;
  private _rto;
  private _transUrl;
  private _transports;
  private _transportTimeoutId;
  private transport;
  onopen;
  onmessage;
  onclose;

  constructor(url?, protocols?, options?) {
    super();
    if (!(this instanceof SockJS)) {
      return new SockJS(url, protocols, options);
    }
    if (arguments.length < 1) {
      throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
    }

    this.readyState = SockJS.CONNECTING;
    this.extensions = '';
    this.protocol = '';

    // non-standard extension
    options = options || {};
    if (options.protocols_whitelist) {
      log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
    }
    this._transportsWhitelist = options.transports;
    this._transportOptions = options.transportOptions || {};

    var sessionId = options.sessionId || 8;
    if (typeof sessionId === 'function') {
      this._generateSessionId = sessionId;
    } else if (typeof sessionId === 'number') {
      this._generateSessionId = function () {
        return random.string(sessionId);
      };
    } else {
      throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
    }

    this._server = options.server || random.numberString(1000);

    // Step 1 of WS spec - parse and validate the url. Issue #8
    var parsedUrl = new URL(url, null, null);
    if (!parsedUrl.host || !parsedUrl.protocol) {
      throw new SyntaxError("The URL '" + url + "' is invalid");
    } else if (parsedUrl.hash) {
      throw new SyntaxError('The URL must not contain a fragment');
    } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
    }

    var secure = parsedUrl.protocol === 'https:';
    // Step 2 - don't allow secure origin with an insecure protocol
    if (loc.protocol === 'https' && !secure) {
      throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
    }

    // Step 3 - check port access - no need here
    // Step 4 - parse protocols argument
    if (!protocols) {
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
    var o = urlUtils.getOrigin(loc.href);
    this._origin = o ? o.toLowerCase() : null;

    // remove the trailing slash
    parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

    // store the sanitized url
    this.url = parsedUrl.href;
    debug('using url', this.url);

    // Step 7 - start connection in background
    // obtain server info
    // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
    this._urlInfo = {
      nullOrigin: !browser.hasDomain()
      , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
      , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
    };

    this._ir = new InfoReceiver(this.url, this._urlInfo);
    this._ir.once('finish', this._receiveInfo.bind(this));
  }

  close(code?, reason?) {
    // Step 1
    if (code && !userSetCode(code)) {
      throw new Error('InvalidAccessError: Invalid code');
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
  }

  send(data) {
    // #13 - convert anything non-string to string
    // TODO this currently turns objects into [object Object]
    if (typeof data !== 'string') {
      data = '' + data;
    }
    if (this.readyState === SockJS.CONNECTING) {
      throw new Error('InvalidStateError: The connection has not been established yet');
    }
    if (this.readyState !== SockJS.OPEN) {
      return;
    }
    this._transport.send(escape.quote(data));
  }

  static version = require('./version');

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  _receiveInfo(info, rtt) {
    debug('_receiveInfo', rtt);
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
    info = objectUtils.extend(info, this._urlInfo);
    debug('info', info);
    // determine list of desired and supported transports
    var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
    this._transports = enabledTransports.main;
    debug(this._transports.length + ' enabled transports');

    this._connect();
  }

  _connect() {
    for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
      debug('attempt', Transport.transportName);
      if (Transport.needBody) {
        if (!(<any>global).document.body ||
          (typeof (<any>global).document.readyState !== 'undefined' &&
          (<any>global).document.readyState !== 'complete' &&
          (<any>global).document.readyState !== 'interactive')) {
          debug('waiting for body');
          this._transports.unshift(Transport);
          eventUtils.attachEvent('load', this._connect.bind(this));
          return;
        }
      }

      // calculate timeout based on RTO and round trips. Default to 5s
      var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
      this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
      debug('using timeout', timeoutMs);

      var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
      var options = this._transportOptions[Transport.transportName];
      debug('transport url', transportUrl);
      var transportObj = new Transport(transportUrl, this._transUrl, options);
      transportObj.on('message', this._transportMessage.bind(this));
      transportObj.once('close', this._transportClose.bind(this));
      transportObj.transportName = Transport.transportName;
      this._transport = transportObj;

      return;
    }
    this._close(2000, 'All transports failed', false);
  }

  _transportTimeout() {
    debug('_transportTimeout');
    if (this.readyState === SockJS.CONNECTING) {
      this._transportClose(2007, 'Transport timed out');
    }
  }

  _transportMessage(msg) {
    debug('_transportMessage', msg);
    var self = this
      , type = msg.slice(0, 1)
      , content = msg.slice(1)
      , payload
      ;

    // first check for messages that don't need a payload
    switch (type) {
      case 'o':
        this._open();
        return;
      case 'h':
        this.dispatchEvent(new Event('heartbeat'));
        debug('heartbeat', this.transport);
        return;
    }

    if (content) {
      try {
        payload = JSON3.parse(content);
      } catch (e) {
        debug('bad json', content);
      }
    }

    if (typeof payload === 'undefined') {
      debug('empty payload', content);
      return;
    }

    switch (type) {
      case 'a':
        if (Array.isArray(payload)) {
          payload.forEach(function (p) {
            debug('message', self.transport, p);
            self.dispatchEvent(new TransportMessageEvent(p));
          });
        }
        break;
      case 'm':
        debug('message', this.transport, payload);
        this.dispatchEvent(new TransportMessageEvent(payload));
        break;
      case 'c':
        if (Array.isArray(payload) && payload.length === 2) {
          this._close(payload[0], payload[1], true);
        }
        break;
    }
  }

  _transportClose(code, reason) {
    debug('_transportClose', this.transport, code, reason);
    if (this._transport) {
      this._transport.removeAllListeners();
      this._transport = null;
      this.transport = null;
    }

    if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
      this._connect();
      return;
    }

    this._close(code, reason);
  }

  _open() {
    debug('_open', this._transport.transportName, this.readyState);
    if (this.readyState === SockJS.CONNECTING) {
      if (this._transportTimeoutId) {
        clearTimeout(this._transportTimeoutId);
        this._transportTimeoutId = null;
      }
      this.readyState = SockJS.OPEN;
      this.transport = this._transport.transportName;
      this.dispatchEvent(new Event('open'));
      debug('connected', this.transport);
    } else {
      // The server might have been restarted, and lost track of our
      // connection.
      this._close(1006, 'Server lost session');
    }
  }

  _close(code: number, reason: string, wasClean?: boolean) {
    debug('_close', this.transport, code, reason, wasClean, this.readyState);
    var forceFail = false;

    if (this._ir) {
      forceFail = true;
      this._ir.close();
      this._ir = null;
    }
    if (this._transport) {
      this._transport.close();
      this._transport = null;
      this.transport = null;
    }

    if (this.readyState === SockJS.CLOSED) {
      throw new Error('InvalidStateError: SockJS has already been closed');
    }

    this.readyState = SockJS.CLOSING;
    setTimeout(function () {
      this.readyState = SockJS.CLOSED;

      if (forceFail) {
        this.dispatchEvent(new Event('error'));
      }

      var e = new CloseEvent();
      e.wasClean = wasClean || false;
      e.code = code || 1000;
      e.reason = reason;

      this.dispatchEvent(e);
      this.onmessage = this.onclose = this.onerror = null;
      debug('disconnected');
    }.bind(this), 0);
  }

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
  countRTO(rtt) {
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
}

export function main(availableTransports) {
  transports = transport(availableTransports);
  iframeBootstrap(SockJS, availableTransports);
  return SockJS;
}
