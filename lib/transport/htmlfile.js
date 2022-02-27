import AjaxBasedTransport from './lib/ajax-based.js';
import XHRLocalObject from './sender/xhr-local.js';
import HtmlfileReceiver from './receiver/htmlfile.js';

class HtmlFileTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!HtmlfileReceiver.enabled) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
  }

  static enabled(info) {
    return HtmlfileReceiver.enabled && info.sameOrigin;
  }

  static transportName = 'htmlfile';
  static roundTrips = 2;
}

export default HtmlFileTransport;
