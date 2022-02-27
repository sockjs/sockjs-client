import {isOpera} from '../utils/browser.js';
import AjaxBasedTransport from './lib/ajax-based.js';
import XhrReceiver from './receiver/xhr.js';
import XHRCorsObject from './sender/xhr-cors.js';
import XHRLocalObject from './sender/xhr-local.js';

class XhrStreamingTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
  }

  static enabled(info) {
    if (info.nullOrigin) {
      return false;
    }

    // Opera doesn't support xhr-streaming #60
    // But it might be able to #92
    if (isOpera()) {
      return false;
    }

    return XHRCorsObject.enabled;
  }

  static transportName = 'xhr-streaming';
  static roundTrips = 2; // Preflight, ajax

  // Safari gets confused when a streaming ajax request is started
  // before onload. This causes the load indicator to spin indefinetely.
  // Only require body when used in a browser
  static needBody = Boolean(global.document);
}

export default XhrStreamingTransport;
