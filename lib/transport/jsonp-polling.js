// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

import SenderReceiver from './lib/sender-receiver.js';
import JsonpReceiver from './receiver/jsonp.js';
import jsonpSender from './sender/jsonp.js';

class JsonPTransport extends SenderReceiver {
  constructor(transUrl) {
    if (!JsonPTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    super(transUrl, '/jsonp', jsonpSender, JsonpReceiver);
  }

  static enabled() {
    return Boolean(global.document);
  }

  static transportName = 'jsonp-polling';
  static roundTrips = 1;
  static needBody = true;
}

export default JsonPTransport;
