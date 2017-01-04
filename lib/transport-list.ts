import {XhrStreamingTransport} from './transport/xhr-streaming';
import {XdrStreamingTransport} from './transport/xdr-streaming';
import {WebSocketTransport} from './transport/websocket';
import {XdrPollingTransport} from './transport/xdr-polling';
import {XhrPollingTransport} from './transport/xhr-polling';
import {EventSourceTransport} from './transport/eventsource';
import {iframeWrap} from './transport/lib/iframe-wrap';
import {HtmlFileTransport} from './transport/htmlfile';
import {JsonPTransport} from './transport/jsonp-polling';

export let transportList = [
  // streaming transports
  WebSocketTransport
  , XhrStreamingTransport
  , XdrStreamingTransport
  , EventSourceTransport
  , iframeWrap(EventSourceTransport)

  // polling transports
  , HtmlFileTransport
  , iframeWrap(HtmlFileTransport)
  , XhrPollingTransport
  , XdrPollingTransport
  , iframeWrap(XhrPollingTransport)
  , JsonPTransport
];
