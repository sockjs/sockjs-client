import AjaxBasedTransport from './lib/ajax-based.js';
import XhrReceiver from './receiver/xhr.js';
import XDRObject from './sender/xdr.js';

// According to:
//   https://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   https://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

class XdrStreamingTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
  }

  static enabled(info) {
    if (info.cookie_needed || info.nullOrigin) {
      return false;
    }

    return XDRObject.enabled && info.sameScheme;
  }

  static transportName = 'xdr-streaming';
  static roundTrips = 2; // Preflight, ajax
}

export default XdrStreamingTransport;
