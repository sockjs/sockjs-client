'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , utils = require('../../utils')
  ;

function AbstractXHRObject(method, url, payload, opts) {
  var self = this;
  EventEmitter.call(this);

  try {
    this.xhr = new global.XMLHttpRequest();
  } catch(x) {}

  if (!this.xhr) {
    try {
      this.xhr = new global.ActiveXObject('Microsoft.XMLHTTP');
    } catch(x) {}
  }
  if (global.ActiveXObject || global.XDomainRequest) {
    // IE8 caches even POSTs
    url += ((url.indexOf('?') === -1) ? '?' : '&') + 't=' + Date.now();
  }

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function(){
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
  } catch(e) {
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup();
    return;
  }

  if (!opts || !opts.noCredentials) {
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."
    this.xhr.withCredentials = 'true';
  }
  if (opts && opts.headers) {
    for(var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {}
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (text && text.length > 0) {
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };
  self.xhr.send(payload);
}

util.inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._cleanup = function(abort) {
  if (!this.xhr) {
    return;
  }
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function(){};

  if (abort) {
    try {
      this.xhr.abort();
    } catch(x) {}
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  this.removeAllListeners();
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!global.XMLHttpRequest;

var cors = false;
try { cors = 'withCredentials' in new global.XMLHttpRequest(); }
catch (ignored) {}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;
