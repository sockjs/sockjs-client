import {AjaxBasedTransport} from './lib/ajax-based';
import {XhrReceiver} from './receiver/xhr';
import {XHRCorsObject} from './sender/xhr-cors';
import {XHRLocalObject} from './sender/xhr-local';
import * as browser from '../utils/browser';

export class XhrStreamingTransport extends AjaxBasedTransport {
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
    if (browser.isOpera()) {
      return false;
    }

    return XHRCorsObject.enabled;
  };

  static transportName = 'xhr-streaming';
  static roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
  static needBody = !!(<any>global).document;
}