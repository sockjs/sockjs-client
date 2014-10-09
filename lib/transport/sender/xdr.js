'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , utils = require('../../utils')
  ;

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  var self = this;
  EventEmitter.call(this);

  process.nextTick(function(){
    self._start(method, url, payload);
  });
}

util.inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url += ((url.indexOf('?') === -1) ? '?' : '&') + 't=' + Date.now();

  var onerror = xdr.ontimeout = xdr.onerror = function() {
    self.emit('finish', 0, '');
    self._cleanup(false);
  };
  xdr.onprogress = function() {
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = utils.unloadAdd(function(){
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    this.xdr.send(payload);
  } catch(x) {
    onerror();
  }
};

XDRObject.prototype._cleanup = function(abort) {
  if (!this.xdr) {
    return;
  }
  utils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress =
    this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch(x) {}
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  this.removeAllListeners();
  this._cleanup(true);
};

module.exports = XDRObject;
