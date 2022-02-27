import EventSourceDriver from 'eventsource';
import AjaxBasedTransport from './lib/ajax-based.js';
import EventSourceReceiver from './receiver/eventsource.js';
import XHRCorsObject from './sender/xhr-cors.js';

class EventSourceTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!EventSourceTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
  }

  static enabled() {
    return Boolean(EventSourceDriver);
  }

  static transportName = 'eventsource';
  static roundTrips = 2;
}

export default EventSourceTransport;
