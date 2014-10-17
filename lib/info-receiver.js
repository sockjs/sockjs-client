'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , origin = require('./utils/origin')
  , loc = require('./polyfills/location')
  , XDR = require('./transport/sender/xdr')
  , XHRCors = require('./transport/sender/xhr-cors')
  , XHRLocal = require('./transport/sender/xhr-local')
  , XHRFake = require('./transport/sender/xhr-fake')
  , InfoIframe = require('./info-iframe')
  , InfoAjax = require('./info-ajax')
  , debug = require('debug')('sockjs-client:info')
  ;

function InfoReceiver(baseUrl) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  process.nextTick(function(){
    self.doXhr(baseUrl, self._getReceiver(baseUrl));
  });
}

util.inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver.prototype._getReceiver = function (baseUrl) {
  // determine method of CORS support (if needed)
  if (origin.isSameOriginUrl(baseUrl, loc.href)) {
    return XHRLocal;
  } else if (XHRCors.enabled) {
    return XHRCors;
  } else if (XDR.enabled && origin.isSameOriginScheme(baseUrl, loc.href)) {
    return XDR;
  } else if (InfoIframe.enabled(baseUrl)) {
    return null;
  }
  return XHRFake;
};

InfoReceiver.prototype.doXhr = function(baseUrl, AjaxObject) {
  debug('doXhr', baseUrl, AjaxObject.name);
  var self = this
    , url = baseUrl + '/info'
    ;

  this.xo = AjaxObject ? new InfoAjax(url, AjaxObject) : new InfoIframe(url);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;
