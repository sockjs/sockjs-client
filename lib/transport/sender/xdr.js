import {EventEmitter} from 'node:events';
import {unloadAdd, unloadDel} from '../../utils/event.js';
import {hasDomain} from '../../utils/browser.js';
import {addQuery} from '../../utils/url.js';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:sender:xdr');

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

class XDRObject extends EventEmitter {
  constructor(method, url, payload) {
    debug(method, url);
    super();

    setTimeout(() => {
      this._start(method, url, payload);
    }, 0);
  }

  _start(method, url, payload) {
    debug('_start');
    const xdr = new global.XDomainRequest();
    // IE caches even POSTs
    url = addQuery(url, 't=' + (Date.now()));

    xdr.addEventListener('error', this._xdrerror);
    xdr.addEventListener('timeout', this._xdrtimeout);
    xdr.addEventListener('progress', this._xdrprogress);
    xdr.addEventListener('load', this._xdrload);

    this.xdr = xdr;
    this.unloadRef = unloadAdd(() => {
      this._cleanup(true);
    });
    try {
      // Fails with AccessDenied if port number is bogus
      this.xdr.open(method, url);
      if (this.timeout) {
        this.xdr.timeout = this.timeout;
      }

      this.xdr.send(payload);
    } catch {
      this._error();
    }
  }

  _xdrload = () => {
    debug('load');
    this.emit('finish', 200, this.xdr.responseText);
    this._cleanup(false);
  };

  _xdrprogress = () => {
    debug('progress', this.xdr.responseText);
    this.emit('chunk', 200, this.xdr.responseText);
  };

  _xdrerror = () => {
    debug('onerror');
    this._error();
  };

  _xdrtimeout = () => {
    debug('ontimeout');
    this._error();
  };

  _error() {
    this.emit('finish', 0, '');
    this._cleanup(false);
  }

  _cleanup(abort) {
    debug('cleanup', abort);
    if (!this.xdr) {
      return;
    }

    this.removeAllListeners();
    unloadDel(this.unloadRef);

    this.xdr.removeEventListener('load', this._xdrload);
    this.xdr.removeEventListener('progress', this._xdrprogress);
    this.xdr.removeEventListener('error', this._xdrerror);
    this.xdr.removeEventListener('timeout', this._xdrtimeout);
    if (abort) {
      try {
        this.xdr.abort();
      } catch {
        // Intentionally empty
      }
    }

    this.xdr = null;
    this.unloadRef = null;
  }

  close() {
    debug('close');
    this._cleanup(true);
  }

  // IE 8/9 if the request target uses the same scheme - #79
  static enabled = Boolean(global.XDomainRequest && hasDomain());
}

export default XDRObject;
