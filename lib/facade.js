'use strict';

var utils = require('./utils');

function FacadeJS(transport) {
  this._transport = transport;
  transport.onmessage = this._transportMessage;
  transport.onclose = this._transportClose;
}

FacadeJS.prototype._transportClose = function (code, reason) {
  utils.postMessage('t', utils.closeFrame(code, reason));
};
FacadeJS.prototype._transportMessage = function (frame) {
  utils.postMessage('t', frame);
};
FacadeJS.prototype._send = function (data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function () {
  this._transport.close();
};

module.exports = FacadeJS;
