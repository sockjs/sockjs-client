'use strict';

var util = require('util')
  , utils = require('./utils')
  , SimpleEvent = require('./simpleevent')
  , REventTarget = require('./reventtarget')
  ;

var _isIeHtmlfileCapable;
var isIeHtmlfileCapable = function() {
  if (_isIeHtmlfileCapable === undefined) {
    if ('ActiveXObject' in window) {
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
  var self = this;
  utils.polluteGlobalNamespace();

  this.id = 'a' + utils.randomString(6);
  url += ((url.indexOf('?') === -1) ? '?' : '&') +
      'c=' + decodeURIComponent(utils.WPrefix + '.' + this.id);

  var constructor = isIeHtmlfileCapable() ?
      utils.createHtmlfile : utils.createIframe;

  var iframeObj;
  window[utils.WPrefix][this.id] = {
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
    delete window[utils.WPrefix][self.id];
    self.dispatchEvent(new SimpleEvent('close', {reason: abortReason}));
  };
  iframeObj = constructor(url, function() {
    self.iframeClose({}, 'permanent');
  });
}

util.inherits(HtmlfileReceiver, REventTarget);

HtmlfileReceiver.prototype.abort = function() {
  if (this.iframeClose) {
    this.iframeClose({}, 'user');
  }
};

module.exports = HtmlfileReceiver;
