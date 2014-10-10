'use strict';

var EventSourceTransport = require('./transport/eventsource')
  , HtmlFileTransport = require('./transport/htmlfile')
  , XhrPollingTransport = require('./transport/xhr-polling')
  ;

module.exports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xdr-streaming')
, require('./transport/xhr-streaming')
, EventSourceTransport
, require('./transport/lib/iframe-wrap')(EventSourceTransport)

  // polling transports
, HtmlFileTransport
, require('./transport/lib/iframe-wrap')(HtmlFileTransport)
, require('./transport/xdr-polling')
, XhrPollingTransport
, require('./transport/lib/iframe-wrap')(XhrPollingTransport)
, require('./transport/jsonp-polling')
];
