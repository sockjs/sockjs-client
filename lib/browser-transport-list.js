import iframeWrap from './transport/lib/iframe-wrap';
import websocket from './transport/websocket';
import xhr_streaming from './transport/xhr-streaming';
import xdr_streaming from './transport/xdr-streaming';
import eventsource from './transport/eventsource';

import htmlfile from './transport/htmlfile';
import xhr_polling from './transport/xhr-polling';
import xdr_polling from './transport/xdr-polling';
import jsonp_polling from './transport/jsonp-polling';

var transports = [
  // streaming transports
  websocket
, xhr_streaming
, xdr_streaming
, eventsource
, iframeWrap(eventsource)

  // polling transports
, htmlfile
, iframeWrap(htmlfile)
, xhr_polling
, xdr_polling
, iframeWrap(xhr_polling)
, jsonp_polling
];

export default transports;
