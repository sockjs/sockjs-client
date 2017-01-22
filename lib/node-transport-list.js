import websocket from './transport/websocket';
import xhr_streaming from './transport/xhr-streaming';
import eventsource from './transport/eventsource';
import xhr_polling from './transport/xhr-polling';

var transports = [
  // streaming transports
  websocket
, xhr_streaming
, eventsource

  // polling transports
, xhr_polling
];

export default transports;
