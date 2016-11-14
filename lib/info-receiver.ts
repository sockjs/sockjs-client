import {EventEmitter} from 'events';
import * as urlUtils from './utils/url';
import {XDRObject as XDR} from './transport/sender/xdr';
import {XHRCorsObject as XHRCors} from './transport/sender/xhr-cors';
import {XHRLocalObject} from './transport/sender/xhr-local';
import {XHRFake} from './transport/sender/xhr-fake';
import {InfoIframe} from './info-iframe';
import {InfoAjax} from './info-ajax';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-receiver');
}

export class InfoReceiver extends EventEmitter {
  xo;
  timeoutRef;

  constructor(baseUrl, urlInfo) {
    super();
    debug(baseUrl);
    var self = this;

    setTimeout(function () {
      self.doXhr(baseUrl, urlInfo);
    }, 0);
  }

// TODO this is currently ignoring the list of available transports and the whitelist

  static _getReceiver(baseUrl, url, urlInfo): any {
    // determine method of CORS support (if needed)
    if (urlInfo.sameOrigin) {
      return new InfoAjax(url, XHRLocalObject);
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
  };

  doXhr(baseUrl, urlInfo) {
    var self = this
      , url = urlUtils.addPath(baseUrl, '/info')
      ;
    debug('doXhr', url);

    this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

    this.timeoutRef = setTimeout(function () {
      debug('timeout');
      self._cleanup(false);
      self.emit('finish');
    }, InfoReceiver.timeout);

    this.xo.once('finish', function (info, rtt) {
      debug('finish', info, rtt);
      self._cleanup(true);
      self.emit('finish', info, rtt);
    });
  };

  _cleanup(wasClean) {
    debug('_cleanup');
    clearTimeout(this.timeoutRef);
    this.timeoutRef = null;
    if (!wasClean && this.xo) {
      this.xo.close();
    }
    this.xo = null;
  };

  close() {
    debug('close');
    this.removeAllListeners();
    this._cleanup(false);
  };

  static timeout = 8000;
}
