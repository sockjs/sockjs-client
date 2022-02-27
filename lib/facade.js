import {postMessage} from './utils/iframe.js';

class FacadeJS {
  constructor(transport) {
    this._transport = transport;
    transport.on('message', this._transportMessage.bind(this));
    transport.on('close', this._transportClose.bind(this));
  }

  _transportClose(code, reason) {
    postMessage('c', JSON.stringify([code, reason]));
  }

  _transportMessage(frame) {
    postMessage('t', frame);
  }

  _send(data) {
    this._transport.send(data);
  }

  _close() {
    this._transport.close();
    this._transport.removeAllListeners();
  }
}

export default FacadeJS;
