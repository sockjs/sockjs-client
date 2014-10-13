'use strict';

var util = require('util')
  , iframeUtils = require('../../utils/iframe')
  , EventEmitter = require('events').EventEmitter
  , random = require('../../utils/random')
  ;

var _isIeHtmlfileCapable;
var isIeHtmlfileCapable = function() {
  if (_isIeHtmlfileCapable === undefined) {
    if ('ActiveXObject' in global) {
      try {
        _isIeHtmlfileCapable = !!new global.ActiveXObject('htmlfile');
      } catch (x) {}
    } else {
      _isIeHtmlfileCapable = false;
    }
  }
  return _isIeHtmlfileCapable;
};


function HtmlfileReceiver(url) {
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url += ((url.indexOf('?') === -1) ? '?' : '&') +
      'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id);

  var constructor = isIeHtmlfileCapable() ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function () {
      self.iframeObj.loaded();
    },
    message: function (data) {
      self.emit('message', data);
    },
    stop: function () {
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructor(url, function() {
    self._cleanup();
    self._close('permanent');
  });
}

util.inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function () {
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function (reason) {
  this.emit('close', null, reason);
  this.removeAllListeners();
};

module.exports = HtmlfileReceiver;
