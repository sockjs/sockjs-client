'use strict';

import {EventEmitter} from 'events';
var http = require('http');
var https = require('https');
var URL = require('url-parse');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:driver:xhr');
}

export = class XhrDriver extends EventEmitter {
  req;

  constructor(method, url, payload, opts) {
    super();
    debug(method, url, payload);
    var self = this;

    var parsedUrl = new URL(url);
    var options = {
      method: method
      , hostname: parsedUrl.hostname.replace(/\[|\]/g, '')
      , port: parsedUrl.port
      , path: parsedUrl.pathname + (parsedUrl.query || '')
      , headers: opts && opts.headers
      , agent: false
    };

    var protocol = parsedUrl.protocol === 'https:' ? https : http;
    this.req = protocol.request(options, function (res) {
      res.setEncoding('utf8');
      var responseText = '';

      res.on('data', function (chunk) {
        debug('data', chunk);
        responseText += chunk;
        self.emit('chunk', 200, responseText);
      });
      res.once('end', function () {
        debug('end');
        self.emit('finish', res.statusCode, responseText);
        self.req = null;
      });
    });

    this.req.on('error', function (e) {
      debug('error', e);
      self.emit('finish', 0, e.message);
    });

    if (payload) {
      this.req.write(payload);
    }
    this.req.end();
  }

  close() {
    debug('close');
    this.removeAllListeners();
    if (this.req) {
      this.req.abort();
      this.req = null;
    }
  };

  static enabled = true;
  static supportsCORS = true;
}
