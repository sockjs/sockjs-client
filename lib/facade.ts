'use strict';

var JSON3 = require('json3')
import iframeUtils = require('./utils/iframe');

export class FacadeJS {
  _transport;

  constructor(transport) {
    this._transport = transport;
    transport.on('message', this._transportMessage.bind(this));
    transport.on('close', this._transportClose.bind(this));
  }

  _transportClose(code, reason) {
    iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
  }

  _transportMessage(frame) {
    iframeUtils.postMessage('t', frame);
  }

  _send(data) {
    this._transport.send(data);
  }

  _close() {
    this._transport.close();
    this._transport.removeAllListeners();
  }
}