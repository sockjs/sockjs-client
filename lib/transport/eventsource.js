import inherits from 'inherits';
import AjaxBasedTransport from './lib/ajax-based';
import EventSourceReceiver from './receiver/eventsource';
import XHRCorsObject from './sender/xhr-cors';
import EventSourceDriver from 'eventsource';

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

export default EventSourceTransport;
