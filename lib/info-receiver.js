import {EventEmitter} from 'node:events';
import debugFunc from './utils/debug.js';
import XDR from './transport/sender/xdr.js';
import XHRCors from './transport/sender/xhr-cors.js';
import XHRLocal from './transport/sender/xhr-local.js';
import XHRFake from './transport/sender/xhr-fake.js';
import InfoIframe from './info-iframe.js';
import InfoAjax from './info-ajax.js';
import {addPath} from './utils/url.js';

const debug = debugFunc('sockjs-client:info-receiver');

class InfoReceiver extends EventEmitter {
  constructor(baseUrl, urlInfo) {
    debug(baseUrl);
    super();

    setTimeout(() => {
      this.doXhr(baseUrl, urlInfo);
    }, 0);
  }

  // TODO this is currently ignoring the list of available transports and the whitelist
  static _getReceiver(baseUrl, url, urlInfo) {
    // Determine method of CORS support (if needed)
    if (urlInfo.sameOrigin) {
      return new InfoAjax(url, XHRLocal);
    }

    if (XHRCors.enabled) {
      return new InfoAjax(url, XHRCors);
    }

    if (XDR.enabled && urlInfo.sameScheme) {
      return new InfoAjax(url, XDR);
    }

    if (InfoIframe.enabled()) {
      return new InfoIframe(baseUrl, url);
    }

    return new InfoAjax(url, XHRFake);
  }

  doXhr(baseUrl, urlInfo) {
    const url = addPath(baseUrl, '/info');
    debug('doXhr', url);

    this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

    this.timeoutRef = setTimeout(() => {
      debug('timeout');
      this._cleanup(false);
      this.emit('finish');
    }, InfoReceiver.timeout);

    this.xo.once('finish', (info, rtt) => {
      debug('finish', info, rtt);
      this._cleanup(true);
      this.emit('finish', info, rtt);
    });
  }

  _cleanup(wasClean) {
    debug('_cleanup');
    clearTimeout(this.timeoutRef);
    this.timeoutRef = null;
    if (!wasClean && this.xo) {
      this.xo.close();
    }

    this.xo = null;
  }

  close() {
    debug('close');
    this.removeAllListeners();
    this._cleanup(false);
  }

  static timeout = 8000;
}

export default InfoReceiver;
