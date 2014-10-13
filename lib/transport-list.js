'use strict';

module.exports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xdr-streaming')
, require('./transport/xhr-streaming')
, require('./transport/eventsource')
, require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

  // polling transports
, require('./transport/htmlfile')
, require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
, require('./transport/xdr-polling')
, require('./transport/xhr-polling')
, require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
, require('./transport/jsonp-polling')
];
