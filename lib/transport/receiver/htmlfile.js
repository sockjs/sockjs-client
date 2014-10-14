'use strict';

var util = require('util')
  , iframeUtils = require('../../utils/iframe')
  , EventEmitter = require('events').EventEmitter
  , random = require('../../utils/random')
  , debug = require('debug')('sockjs-client:receiver:htmlfile')
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
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url += ((url.indexOf('?') === -1) ? '?' : '&') +
      'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id);

  debug('using htmlfile', _isIeHtmlfileCapable);
  var constructor = isIeHtmlfileCapable() ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function () {
      debug('start');
      self.iframeObj.loaded();
    },
    message: function (data) {
      debug('message', data);
      self.emit('message', data);
    },
    stop: function () {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructor(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

util.inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function () {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function (reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

module.exports = HtmlfileReceiver;
