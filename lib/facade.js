'use strict';

var frameDefs = require('./transport/lib/frames')
  , iframeUtils = require('./utils/iframe')
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function (code, reason) {
  iframeUtils.postMessage('t', frameDefs.close(code, reason));
};
FacadeJS.prototype._transportMessage = function (frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function (data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function () {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;
