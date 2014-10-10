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

  var iframeObj;
  global[iframeUtils.WPrefix][this.id] = {
    start: function () {
      iframeObj.loaded();
    },
    message: function (data) {
      self.emit('message', data);
    },
    stop: function () {
      self.iframeClose({}, 'network');
    }
  };
  this.iframeClose = function(e, abortReason) {
    iframeObj.cleanup();
    self.iframeClose = iframeObj = null;
    delete global[iframeUtils.WPrefix][self.id];
    self.emit('close', null, abortReason);
    self.removeAllListeners();
  };
  iframeObj = constructor(url, function() {
    self.iframeClose({}, 'permanent');
  });
}

util.inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  if (this.iframeClose) {
    this.iframeClose({}, 'user');
  }
};

module.exports = HtmlfileReceiver;
