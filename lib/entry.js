'use strict';

var EventSourceTransport = require('./transport/eventsource')
  , HtmlFileTransport = require('./transport/htmlfile')
  , XhrPollingTransport = require('./transport/xhr-polling')
  ;

var transports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xdr-streaming')
, require('./transport/xhr-streaming')
, EventSourceTransport
, require('./transport/iframe-wrap')(EventSourceTransport)

  // polling transports
, HtmlFileTransport
, require('./transport/iframe-wrap')(HtmlFileTransport)
, require('./transport/xdr-polling')
, XhrPollingTransport
, require('./transport/iframe-wrap')(XhrPollingTransport)
, require('./transport/jsonp-polling')
];

module.exports = require('./main')(transports);
