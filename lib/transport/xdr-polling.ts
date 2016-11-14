import {AjaxBasedTransport} from './lib/ajax-based';
import {XdrStreamingTransport} from './xdr-streaming';
import {XhrReceiver} from './receiver/xhr';
import {XDRObject} from './sender/xdr';

export class XdrPollingTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error('Transport created when disabled');
    }
    super(transUrl, '/xhr', XhrReceiver, XDRObject);
  }

  static enabled = XdrStreamingTransport.enabled;
  static transportName = 'xdr-polling';
  static roundTrips = 2; // preflight, ajax
}