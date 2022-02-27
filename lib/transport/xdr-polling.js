import AjaxBasedTransport from './lib/ajax-based.js';
import XdrStreamingTransport from './xdr-streaming.js';
import XhrReceiver from './receiver/xhr.js';
import XDRObject from './sender/xdr.js';

class XdrPollingTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/xhr', XhrReceiver, XDRObject);
  }

  static enabled = XdrStreamingTransport.enabled;
  static transportName = 'xdr-polling';
  static roundTrips = 2; // Preflight, ajax
}

export default XdrPollingTransport;
