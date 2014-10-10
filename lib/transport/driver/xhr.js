'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , http = require('http')
  , u = require('url')
  ;

function XhrDriver(method, url, payload, opts) {
  var self = this;
  EventEmitter.call(this);

  var parsedUrl = u.parse(url);
  var options = {
    method: method
  , hostname: parsedUrl.hostname
  , port: parsedUrl.port
  , path: parsedUrl.path
  , headers: opts && opts.headers
  , agent: false
  };

  this.req = http.request(options, function (res) {
    res.setEncoding('utf8');
    var responseText;

    res.on('data', function (chunk) {
      responseText += chunk;
    });
    res.on('end', function () {
      self.emit('finish', res.statusCode, responseText);
      self.req = null;
    });
  });

  this.req.on('error', function (e) {
    self.emit('finish', 0, e.message);
  });

  if (payload) {
    this.req.write(payload);
  }
  this.req.end();
}

util.inherits(XhrDriver, EventEmitter);

XhrDriver.prototype.close = function() {
  this.removeAllListeners();
  if (this.req) {
    this.req.abort();
    this.req = null;
  }
};

XhrDriver.enabled = true;
XhrDriver.supportsCORS = true;

module.exports = XhrDriver;
