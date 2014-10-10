'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , origin = require('./utils/origin')
  , JSON3 = require('json3')
  , loc = require('./polyfills/location')
  , XHRCors = require('./transport/sender/xhr-cors')
  , XHRLocal = require('./transport/sender/xhr-local')
  , XDR = require('./transport/sender/xdr')
  , XHRFake = require('./transport/sender/xhr-fake')
  // it seems odd to include these just for the 'enabled' function
  , XDRPolling = require('./transport/xdr-polling')
  , IframeTransport = require('./transport/iframe')
  , InfoIframe = require('./info-receiver-iframe')
  ;

function InfoReceiver(baseUrl) {
  var self = this;
  EventEmitter.call(this);

  var AjaxObject = XHRFake;
  // determine method of CORS support (if needed)
  if (origin.isSameOriginUrl(baseUrl, loc.href)) {
    AjaxObject = XHRLocal;
  } else if (XHRCors.enabled) {
    AjaxObject = XHRCors;
  } else if (XDRPolling.enabled(baseUrl)) {
    AjaxObject = XDR;
  } else if (IframeTransport.enabled()) {
    AjaxObject = InfoIframe;
  }

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
    } else if (typeof status === 'object' && typeof text === 'number') {
      // pass through data
      self.emit('finish', status, text);
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
