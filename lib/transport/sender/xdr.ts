import {EventEmitter} from 'events';
import eventUtils = require('../../utils/event');
import browser = require('../../utils/browser');
import urlUtils = require('../../utils/url');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

export class XDRObject extends EventEmitter {
  private xdr;
  private unloadRef;
  private timeout;

  constructor(method, url, payload) {
    super();
    debug(method, url);
    var self = this;

    setTimeout(function () {
      self._start(method, url, payload);
    }, 0);
  }

  _start(method, url, payload) {
    debug('_start');
    var self = this;
    var xdr = new (<any>global).XDomainRequest();
    // IE caches even POSTs
    url = urlUtils.addQuery(url, 't=' + (+new Date()));

    xdr.onerror = function () {
      debug('onerror');
      self._error();
    };
    xdr.ontimeout = function () {
      debug('ontimeout');
      self._error();
    };
    xdr.onprogress = function () {
      debug('progress', xdr.responseText);
      self.emit('chunk', 200, xdr.responseText);
    };
    xdr.onload = function () {
      debug('load');
      self.emit('finish', 200, xdr.responseText);
      self._cleanup(false);
    };
    this.xdr = xdr;
    this.unloadRef = eventUtils.unloadAdd(function () {
      self._cleanup(true);
    });
    try {
      // Fails with AccessDenied if port number is bogus
      this.xdr.open(method, url);
      if (this.timeout) {
        this.xdr.timeout = this.timeout;
      }
      this.xdr.send(payload);
    } catch (x) {
      this._error();
    }
  };

  _error() {
    this.emit('finish', 0, '');
    this._cleanup(false);
  };

  _cleanup(abort) {
    debug('cleanup', abort);
    if (!this.xdr) {
      return;
    }
    this.removeAllListeners();
    eventUtils.unloadDel(this.unloadRef);

    this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
    if (abort) {
      try {
        this.xdr.abort();
      } catch (x) {
        // intentionally empty
      }
    }
    this.unloadRef = this.xdr = null;
  };

  close() {
    debug('close');
    this._cleanup(true);
  };

// IE 8/9 if the request target uses the same scheme - #79
  static enabled = !!((<any>global).XDomainRequest && browser.hasDomain());
}