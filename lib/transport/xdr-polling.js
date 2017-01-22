import inherits from 'inherits';
import AjaxBasedTransport from './lib/ajax-based';
import XdrStreamingTransport from './xdr-streaming';
import XhrReceiver from './receiver/xhr';
import XDRObject from './sender/xdr';

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

export default XdrPollingTransport;
