import {HtmlfileReceiver} from './receiver/htmlfile';
import {XHRLocalObject} from './sender/xhr-local';
import {AjaxBasedTransport} from './lib/ajax-based';

export class HtmlFileTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!HtmlfileReceiver.enabled) {
      throw new Error('Transport created when disabled');
    }
    super(transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
  }

  static enabled(info) {
    return HtmlfileReceiver.enabled && info.sameOrigin;
  };

  static transportName = 'htmlfile';
  static roundTrips = 2;
}