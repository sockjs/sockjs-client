'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , http = require('http')
  , https = require('https')
  , URL = require('url-parse')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:driver:xhr');
}

function XhrDriver(method, url, payload, opts) {
  debug(method, url, payload);
  var self = this;
  EventEmitter.call(this);

  var parsedUrl = new URL(url);
  var options = {
    method: method
  , hostname: parsedUrl.hostname.replace(/\[|\]/g, '')
  , port: parsedUrl.port
  , path: parsedUrl.pathname + (parsedUrl.query || '')
  , headers: opts && opts.headers
  };

  var finished = false;
  function finish(status, text) {
    if (finished) {
      return;
    }
    finished = true;
    self.emit('finish', status, text);
    self.req = null;
  }

  var protocol = parsedUrl.protocol === 'https:' ? https : http;
  this.req = protocol.request(options, function(res) {
    res.setEncoding('utf8');
    var responseText = '';

    res.on('data', function(chunk) {
      debug('data', chunk);
      responseText += chunk;
      self.emit('chunk', 200, responseText);
    });
    res.once('end', function() {
      debug('end');
      finish(res.statusCode, responseText);
    });
    // A connection that drops after the response starts gives no 'end'
    // event, and the request gives no 'error' event.
    res.once('error', function(e) {
      debug('response error', e);
      finish(0, e.message);
    });
    res.once('close', function() {
      if (!res.complete) {
        debug('response closed before its end');
        finish(0, 'connection lost');
      }
    });
  });

  this.req.on('error', function(e) {
    debug('error', e);
    finish(0, e.message);
  });

  if (payload) {
    this.req.write(payload);
  }
  this.req.end();
}

inherits(XhrDriver, EventEmitter);

XhrDriver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.req) {
    this.req.abort();
    this.req = null;
  }
};

XhrDriver.enabled = true;
XhrDriver.supportsCORS = true;

module.exports = XhrDriver;
