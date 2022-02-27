import {URL} from 'url-parse';
import {version} from '../package.json';
import debugFunc from './utils/debug.js';
import Event from './event/event.js';
import EventTarget from './event/eventtarget.js';
import CloseEvent from './event/close.js';
import TransportMessageEvent from './event/trans-message.js';
import InfoReceiver from './info-receiver.js';
import loc from './location.js';
import log from './utils/log.js';
import {string as randomString, numberString as randomNumberString} from './utils/random.js';
import {quote} from './utils/escape.js';
import * as urlUtils from './utils/url.js';
import {attachEvent} from './utils/event.js';
import transport from './utils/transport.js';
import {extend} from './utils/object.js';
import {hasDomain} from './utils/browser.js';
import iframeBootstrap from './iframe-bootstrap.js';

const debug = debugFunc('sockjs-client:main');

let transports;

// Follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
class SockJS extends EventTarget {
  // eslint-disable-next-line complexity
  constructor(url, protocols, options) {
    if (arguments.length === 0) {
      throw new TypeError('Failed to construct \'SockJS: 1 argument required, but only 0 present');
    }

    super();

    this.readyState = SockJS.CONNECTING;
    this.extensions = '';
    this.protocol = '';

    // Non-standard extension
    options = options || {};
    if (options.protocols_whitelist) {
      log.warn('\'protocols_whitelist\' is DEPRECATED. Use \'transports\' instead.');
    }

    this._transportsWhitelist = options.transports;
    this._transportOptions = options.transportOptions || {};
    this._timeout = options.timeout || 0;

    const sessionId = options.sessionId || 8;
    if (typeof sessionId === 'function') {
      this._generateSessionId = sessionId;
    } else if (typeof sessionId === 'number') {
      this._generateSessionId = function () {
        return randomString(sessionId);
      };
    } else {
      throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
    }

    this._server = options.server || randomNumberString(1000);

    // Step 1 of WS spec - parse and validate the url. Issue #8
    const parsedUrl = new URL(url);
    if (!parsedUrl.host || !parsedUrl.protocol) {
      throw new SyntaxError('The URL \'' + url + '\' is invalid');
    } else if (parsedUrl.hash) {
      throw new SyntaxError('The URL must not contain a fragment');
    } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new SyntaxError('The URL\'s scheme must be either \'http:\' or \'https:\'. \'' + parsedUrl.protocol + '\' is not allowed.');
    }

    const secure = parsedUrl.protocol === 'https:';
    // Step 2 - don't allow secure origin with an insecure protocol
    if (loc.protocol === 'https:' && !secure // Exception is 127.0.0.0/8 and ::1 urls
      && !urlUtils.isLoopbackAddr(parsedUrl.hostname)) {
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
    const sortedProtocols = protocols.sort();
    for (const [i, proto] of sortedProtocols.entries()) {
      if (!proto) {
        throw new SyntaxError('The protocols entry \'' + proto + '\' is invalid.');
      }

      if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
        throw new SyntaxError('The protocols entry \'' + proto + '\' is duplicated.');
      }
    }

    // Step 6 - convert origin
    const o = urlUtils.getOrigin(loc.href);
    this._origin = o ? o.toLowerCase() : null;

    // Remove the trailing slash
    parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

    // Store the sanitized url
    this.url = parsedUrl.href;
    debug('using url', this.url);

    // Step 7 - start connection in background
    // obtain server info
    // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
    this._urlInfo = {
      nullOrigin: !hasDomain(),
      sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
      sameScheme: urlUtils.isSchemeEqual(this.url, loc.href),
    };

    this._ir = new InfoReceiver(this.url, this._urlInfo);
    this._ir.once('finish', this._receiveInfo.bind(this));
  }

  close(code, reason) {
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
    const wasClean = true;
    this._close(code || 1000, reason || 'Normal closure', wasClean);
  }

  send(data) {
    // #13 - convert anything non-string to string
    // TODO this currently turns objects into [object Object]
    if (typeof data !== 'string') {
      data = String(data);
    }

    if (this.readyState === SockJS.CONNECTING) {
      throw new Error('InvalidStateError: The connection has not been established yet');
    }

    if (this.readyState !== SockJS.OPEN) {
      return;
    }

    this._transport.send(quote(data));
  }

  static version = version;

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

    // Establish a round-trip timeout (RTO) based on the
    // round-trip time (RTT)
    this._rto = this.countRTO(rtt);
    // Allow server to override url used for the actual transport
    this._transUrl = info.base_url ? info.base_url : this.url;
    info = extend(info, this._urlInfo);
    debug('info', info);
    // Determine list of desired and supported transports
    const enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
    this._transports = enabledTransports.main;
    debug(this._transports.length + ' enabled transports');

    this._connect();
  }

  _connect() {
    const Transport = this._transports.shift();
    if (!Transport) {
      this._close(2000, 'All transports failed', false);
      return;
    }

    debug('attempt', Transport.transportName);
    if (Transport.needBody && (!global.document.body
          || (typeof global.document.readyState !== 'undefined'
            && global.document.readyState !== 'complete'
            && global.document.readyState !== 'interactive'))) {
      debug('waiting for body');
      this._transports.unshift(Transport);
      attachEvent('load', this._connect.bind(this));
      return;
    }

    // Calculate timeout based on RTO and round trips. Default to 5s
    const timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    const transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    const options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    const transportObject = new Transport(transportUrl, this._transUrl, options);
    transportObject.on('message', this._transportMessage.bind(this));
    transportObject.once('close', this._transportClose.bind(this));
    transportObject.transportName = Transport.transportName;
    this._transport = transportObject;

    this._close(2000, 'All transports failed', false);
  }

  _transportTimeout() {
    debug('_transportTimeout');
    if (this.readyState === SockJS.CONNECTING) {
      if (this._transport) {
        this._transport.close();
      }

      this._transportClose(2007, 'Transport timed out');
    }
  }

  _transportMessage(message) {
    debug('_transportMessage', message);
    const type = message.slice(0, 1);
    const content = message.slice(1);
    let payload;

    // First check for messages that don't need a payload
    switch (type) {
      case 'o':
        this._open();
        return;
      case 'h':
        this.dispatchEvent(new Event('heartbeat'));
        debug('heartbeat', this.transport);
        return;
      default:
        break;
    }

    if (content) {
      try {
        payload = JSON.parse(content);
      } catch {
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
          for (const p of payload) {
            debug('message', this.transport, p);
            this.dispatchEvent(new TransportMessageEvent(p));
          }
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
      default:
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
    debug('_open', this._transport && this._transport.transportName, this.readyState);
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

  _close(code, reason, wasClean) {
    debug('_close', this.transport, code, reason, wasClean, this.readyState);
    let forceFail = false;

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
    setTimeout(() => {
      this.readyState = SockJS.CLOSED;

      if (forceFail) {
        this.dispatchEvent(new Event('error'));
      }

      const evt = new CloseEvent('close');
      evt.wasClean = wasClean || false;
      evt.code = code || 1000;
      evt.reason = reason;

      this.dispatchEvent(evt);
      /* eslint-disable unicorn/prefer-add-event-listener */
      this.onerror = null;
      this.onclose = null;
      this.onmessage = null;
      /* eslint-enable unicorn/prefer-add-event-listener */
      debug('disconnected');
    }, 0);
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
      return 4 * rtt; // Rto > 400msec
    }

    return 300 + rtt; // 300msec < rto <= 400msec
  }
}

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

export default function bootstrap(availableTransports) {
  transports = transport(availableTransports);
  iframeBootstrap(SockJS, availableTransports);
  return SockJS;
}
