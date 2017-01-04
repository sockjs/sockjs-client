import {AjaxBasedTransport} from './lib/ajax-based';
import {XhrReceiver} from './receiver/xhr';
import {XHRCorsObject} from './sender/xhr-cors';
import {XHRLocalObject} from './sender/xhr-local';

export class XhrPollingTransport extends AjaxBasedTransport {
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
  };

  static transportName = 'xhr-polling';
  static roundTrips = 2; // preflight, ajax
}