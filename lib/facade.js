'use strict';

var utils = require('./utils');

function FacadeJS() {}
FacadeJS.prototype._didClose = function (code, reason) {
  utils.postMessage('t', utils.closeFrame(code, reason));
};
FacadeJS.prototype._didMessage = function (frame) {
  utils.postMessage('t', frame);
};
FacadeJS.prototype._doSend = function (data) {
  this._transport.send(data);
};
FacadeJS.prototype._doCleanup = function () {
  this._transport.close();
};

module.exports = FacadeJS;
