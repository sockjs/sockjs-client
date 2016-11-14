import {AjaxBasedTransport} from './lib/ajax-based';
import {EventSourceReceiver} from './receiver/eventsource';
import {XHRCorsObject} from './sender/xhr-cors';
var EventSourceDriver = require('eventsource');

export class EventSourceTransport extends AjaxBasedTransport {
  constructor(transUrl) {
    if (!EventSourceTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
  }

  static enabled = function () {
    return !!EventSourceDriver;
  };

  static transportName = 'eventsource';
  static roundTrips = 2;
}