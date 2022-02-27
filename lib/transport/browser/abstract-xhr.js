import {EventEmitter} from 'node:events';
import {unloadAdd, unloadDel} from '../../utils/event.js';
import {addQuery} from '../../utils/url.js';
import debugFunc from './utils/debug.js';

let XHR = global.XMLHttpRequest;

const debug = debugFunc('sockjs-client:browser:xhr');

class AbstractXHRObject extends EventEmitter {
  constructor(method, url, payload, options) {
    super();
    debug(method, url);

    setTimeout(() => {
      this._start(method, url, payload, options);
    }, 0);
  }

  _start(method, url, payload, options) {
    try {
      this.xhr = new XHR();
    } catch {
      // Intentionally empty
    }

    if (!this.xhr) {
      debug('no xhr');
      this.emit('finish', 0, 'no xhr support');
      this._cleanup();
      return;
    }

    // Several browsers cache POSTs
    url = addQuery(url, 't=' + (Date.now()));

    // Explorer tends to keep connection open, even after the
    // tab gets closed: http://bugs.jquery.com/ticket/5280
    this.unloadRef = unloadAdd(() => {
      debug('unload cleanup');
      this._cleanup(true);
    });
    try {
      this.xhr.open(method, url, true);
      if (this.timeout && 'timeout' in this.xhr) {
        this.xhr.timeout = this.timeout;
        this.xhr.ontimeout = () => {
          debug('xhr timeout');
          this.emit('finish', 0, '');
          this._cleanup(false);
        };
      }
    } catch (error) {
      debug('exception', error);
      // IE raises an exception on wrong port.
      this.emit('finish', 0, '');
      this._cleanup(false);
      return;
    }

    if ((!options || !options.noCredentials) && AbstractXHRObject.supportsCORS) {
      debug('withCredentials');
      // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
      // "This never affects same-site requests."

      this.xhr.withCredentials = true;
    }

    if (options && options.headers) {
      for (const key in options.headers) {
        if (Object.prototype.hasOwnProperty.call(options.headers, key)) {
          this.xhr.setRequestHeader(key, options.headers[key]);
        }
      }
    }

    this.xhr.addEventListener('readystatechange', () => {
      if (this.xhr) {
        const x = this.xhr;
        let text;
        let status;
        debug('readyState', x.readyState);
        switch (x.readyState) {
          case 3:
          // IE doesn't like peeking into responseText or status
          // on Microsoft.XMLHTTP and readystate=3
            try {
              status = x.status;
              text = x.responseText;
            } catch {
            // Intentionally empty
            }

            debug('status', status);
            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
            if (status === 1223) {
              status = 204;
            }

            // IE does return readystate == 3 for 404 answers.
            if (status === 200 && text && text.length > 0) {
              debug('chunk');
              this.emit('chunk', status, text);
            }

            break;
          case 4:
            status = x.status;
            debug('status', status);
            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
            if (status === 1223) {
              status = 204;
            }

            // IE returns this for a bad port
            // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
            if (status === 12_005 || status === 12_029) {
              status = 0;
            }

            debug('finish', status, x.responseText);
            this.emit('finish', status, x.responseText);
            this._cleanup(false);
            break;
          default:
            break;
        }
      }
    });

    try {
      this.xhr.send(payload);
    } catch {
      this.emit('finish', 0, '');
      this._cleanup(false);
    }
  }

  _cleanup = function (abort) {
    debug('cleanup');
    if (!this.xhr) {
      return;
    }

    this.removeAllListeners();
    unloadDel(this.unloadRef);

    // IE needs this field to be a function
    this.xhr.addEventListener('readystatechange', () => {});
    if (this.xhr.ontimeout) {
      this.xhr.ontimeout = null;
    }

    if (abort) {
      try {
        this.xhr.abort();
      } catch {
        // Intentionally empty
      }
    }

    this.xhr = null;
    this.unloadRef = null;
  };

  close = function () {
    debug('close');
    this._cleanup(true);
  };

  static supportsCORS = false;
  static enabled = (function () {
    let xhrPresent = Boolean(XHR);
    // Override XMLHttpRequest for IE6/7
    // obfuscate to avoid firewalls
    const axo = ['Active', 'Object'].join('X');
    if (!xhrPresent && (axo in global)) {
      debug('overriding xmlhttprequest');
      XHR = function () {
        try {
          return new global[axo]('Microsoft.XMLHTTP');
        } catch {
          return null;
        }
      };

      xhrPresent = Boolean(new XHR());
    }

    if (xhrPresent) {
      try {
        AbstractXHRObject.supportsCORS = 'withCredentials' in new XHR();
      } catch {
        // Intentionally empty
      }
    }

    return xhrPresent;
  })();
}

export default AbstractXHRObject;
