import {AjaxBasedTransport} from './lib/ajax-based';
import {XhrReceiver} from './receiver/xhr';
import {XDRObject} from './sender/xdr';

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

export class XdrStreamingTransport extends AjaxBasedTransport {
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
  };

  static transportName = 'xdr-streaming';
  static roundTrips = 2; // preflight, ajax
}