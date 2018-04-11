'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , http = require('http')
  , https = require('https')
  , request = null
  , URL = require('url-parse')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:driver:xhr');
}

try {
	if (require && require.resolve) {
		require.resolve('request');
		request = require('request');
	}
} catch (e) {}


function XhrDriver(method, url, payload, opts) {
  debug(method, url, payload);
  var self = this;
  EventEmitter.call(this);

  if (request) {
    options = {uri: url, method: method}
    if (opts) for(var i in opts) options[i] = opts[i];
    if (payload) options.body = payload;

	  var responseText = '';
		this.req = request(options, function(e, res, body) {
		  debug('end');
		  self.emit('finish', res.statusCode, body);
		  self.req = null;
		});

	this.req.on('data', function(chunk) {
		debug('data', chunk);
		self.emit('chunk', 200, chunk.toString('utf8'));
	});

	this.req.on('error', function(e) {
	  debug('error', e);
	  self.emit('finish', 0, e.message);
	});
  }
  else {
	  var parsedUrl = new URL(url);
	  var options = {
		  method: method
		  , hostname: parsedUrl.hostname.replace(/\[|\]/g, '')
		  , port: parsedUrl.port
		  , path: parsedUrl.pathname + (parsedUrl.query || '')
		  , headers: opts && opts.headers
		  , agent: false
	  };
	  if (opts) {
		  if (opts.proxy) {
			  var parsedProxy = new URL(opts.proxy);
			  options.hostname = parsedProxy.hostname.replace(/\[|\]/g, '');
			  if (options.hostname.match(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/)) {
				  options.host = options.hostname
				  delete options.hostname;
			  }
			  options.port = parsedProxy.port;
			  options.path = url;
			  if (!options.headers) options.headers = {};
			  options.headers.Host = parsedUrl.hostname;
			  //delete opts.proxy;
		  }
		  for(var i in opts) options[i] = opts[i];
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
