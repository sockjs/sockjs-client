import { EventEmitter } from 'events';
import inherits from 'inherits';
import http from 'http';
import https from 'https';
import URL from 'url-parse';
import Debug from 'debug';
var debug = Debug('sockjs-client:driver:xhr');

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
  , agent: false
  };

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
      self.emit('finish', res.statusCode, responseText);
      self.req = null;
    });
  });

  this.req.on('error', function(e) {
    debug('error', e);
    self.emit('finish', 0, e.message);
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

export default XhrDriver;
