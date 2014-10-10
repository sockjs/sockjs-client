'use strict';

var util = require('util')
  , utils = require('../../utils/iframe')
  , SimpleEvent = require('../../simpleevent')
  , EventTarget = require('../../polyfills/eventtarget')
  , random = require('../../utils/random')
  ;

var _isIeHtmlfileCapable;
var isIeHtmlfileCapable = function() {
  if (_isIeHtmlfileCapable === undefined) {
    if ('ActiveXObject' in global) {
      try {
        _isIeHtmlfileCapable = !!new ActiveXObject('htmlfile');
      } catch (x) {}
    } else {
      _isIeHtmlfileCapable = false;
    }
  }
  return _isIeHtmlfileCapable;
};


function HtmlfileReceiver(url) {
  EventTarget.call(this);
  var self = this;
  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url += ((url.indexOf('?') === -1) ? '?' : '&') +
      'c=' + decodeURIComponent(utils.WPrefix + '.' + this.id);

  var constructor = isIeHtmlfileCapable() ?
      utils.createHtmlfile : utils.createIframe;

  var iframeObj;
  global[utils.WPrefix][this.id] = {
    start: function () {
      iframeObj.loaded();
    },
    message: function (data) {
      self.dispatchEvent(new SimpleEvent('message', {'data': data}));
    },
    stop: function () {
      self.iframeClose({}, 'network');
    }
  };
  this.iframeClose = function(e, abortReason) {
    iframeObj.cleanup();
    self.iframeClose = iframeObj = null;
    delete global[utils.WPrefix][self.id];
    self.dispatchEvent(new SimpleEvent('close', {reason: abortReason}));
  };
  iframeObj = constructor(url, function() {
    self.iframeClose({}, 'permanent');
  });
}

util.inherits(HtmlfileReceiver, EventTarget);

HtmlfileReceiver.prototype.abort = function() {
  if (this.iframeClose) {
    this.iframeClose({}, 'user');
  }
};

module.exports = HtmlfileReceiver;
