'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , utils = require('./utils')
  , JSON3 = require('json3')
  , loc = require('./polyfills/location')
  , XHRCors = require('./xhr-cors')
  , XHRLocal = require('./xhr-local')
  , XDR = require('./xdr')
  , XHRFake = require('./xhr-fake')
  // it seems odd to include these just for the 'enabled' function
  , XDRPolling = require('./transport/xdr-polling')
  //, IframeTransport = require('./trans-iframe')
  ;

function InfoReceiver(baseUrl) {
  var self = this;
  EventEmitter.call(this);

  var AjaxObject = XHRFake;
  if (utils.isSameOriginUrl(baseUrl, loc.href)) {
    AjaxObject = XHRCors;
  } else if (utils.isXHRCorsCapable() === 1) {
    AjaxObject = XHRLocal;
  } else if (XDRPolling.enabled(baseUrl)) {
    AjaxObject = XDR;
  } //else if (IframeTransport.enabled()) {
    //AjaxObject = IframeXHR;
  //}

  process.nextTick(function(){
    self.doXhr(baseUrl, AjaxObject);
  });
}

util.inherits(InfoReceiver, EventEmitter);

InfoReceiver.prototype.doXhr = function(baseUrl, AjaxObject) {
  var self = this;
  var t0 = Date.now();
  this.xo = new AjaxObject('GET', baseUrl + '/info');

  this.timeoutRef = setTimeout(function() {
    self.xo.close();
    self.emit('finish');
  }, 8000);

  this.xo.on('finish', function(status, text) {
    self._cleanup(true);
    if (status === 200) {
      var rtt = Date.now() - t0;
      var info;
      if (text) {
        try {
          info = JSON3.parse(text);
        }
        catch (e) {}
      }
      if (typeof info !== 'object') {
        info = {};
      }
      self.emit('finish', info, rtt);
    } else {
      self.emit('finish');
    }
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  this.removeAllListeners();
  this._cleanup(false);
};

module.exports = InfoReceiver;
