import AjaxBasedTransport from './lib/ajax-based.js';
import XhrReceiver from './receiver/xhr.js';
import XHRCorsObject from './sender/xhr-cors.js';
import XHRLocalObject from './sender/xhr-local.js';

class XhrPollingTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/xhr', XhrReceiver, XHRCorsObject);
  }

  static enabled(info) {
    if (info.nullOrigin) {
      return false;
    }

    if (XHRLocalObject.enabled && info.sameOrigin) {
      return true;
    }

    return XHRCorsObject.enabled;
  }

  static transportName = 'xhr-polling';
  static roundTrips = 2; // Preflight, ajax
}

export default XhrPollingTransport;
