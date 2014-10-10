'use strict';

var frameDefs = require('./lib/frames')
  , iframeUtils = require('./transport/lib/iframe-utils')
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.onmessage = this._transportMessage;
  transport.onclose = this._transportClose;
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
};

module.exports = FacadeJS;
