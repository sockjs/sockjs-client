import iframeWrap from './transport/lib/iframe-wrap.js';
import websocket from './transport/websocket.js';
import xhrStreaming from './transport/xhr-streaming.js';
import xdrStreaming from './transport/xdr-streaming.js';
import eventsource from './transport/eventsource.js';

import htmlfile from './transport/htmlfile.js';
import xhrPolling from './transport/xhr-polling.js';
import xdrPolling from './transport/xdr-polling.js';
import jsonpPolling from './transport/jsonp-polling.js';

const transports = [
  // Streaming transports
  websocket,
  xhrStreaming,
  xdrStreaming,
  eventsource,
  iframeWrap(eventsource),

  // Polling transports
  htmlfile,
  iframeWrap(htmlfile),
  xhrPolling,
  xdrPolling,
  iframeWrap(xhrPolling),
  jsonpPolling,
];

export default transports;
