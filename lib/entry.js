'use strict';

var transports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xdr-streaming')
, require('./transport/xhr-streaming')
, require('./transport/iframe-eventsource')

  // polling transports
, require('./transport/iframe-htmlfile')
, require('./transport/xdr-polling')
, require('./transport/xhr-polling')
, require('./transport/iframe-xhr-polling')
, require('./transport/jsonp-polling')
];

module.exports = require('./main')(transports);
