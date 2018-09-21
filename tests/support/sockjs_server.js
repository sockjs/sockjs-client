/* eslint camelcase: "off", no-console: "off" */
'use strict';

var http = require('http');
var nodeStatic = require('node-static');
var sockjs = require('./sockjs_app');
var url = require('url');
var path = require('path');
var debug = require('debug')('sockjs-client:test-server:main');

function startServer(port, config, prefix) {
  var clientOptions = {
    // Address of a sockjs test server.
    url: 'http://' + config.listenAddress + ':' + config.port,
    sockjs_opts: {
        // websocket:false
        info: {cookie_needed: false}
    }
  };

  var staticDir = new nodeStatic.Server(path.join(__dirname, '../html'), { cache: 0 });

  var server = http.createServer();
  server.addListener('request', function(req, res) {
    if ( /\/slow-script.js/.test(req.url) ) {
      res.setHeader('content-type', 'application/javascript');
      res.writeHead(200);
      setTimeout(function() {
          res.end('var a = 1;\n');
      }, 500);
    } else if ( /\/streaming.txt/.test(req.url) ) {
      res.setHeader('content-type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');

      res.writeHead(200);
      res.write(new Array(2049).join('a') + '\n');
      setTimeout(function() {
          res.end('b\n');
      }, 250);
    } else if ( /\/simple.txt/.test(req.url) ) {
      res.setHeader('content-type', 'text/plain');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200);
      res.end(new Array(2049).join('a') + '\nb\n');
    } else if (req.url === '/config.js') {
      if (req.headers.referer) {
        var parsedOrigin = url.parse(req.headers.referer);
        clientOptions.url = parsedOrigin.protocol + '//' + parsedOrigin.hostname + ':' + config.port;
      }
      res.setHeader('content-type', 'application/javascript');
      res.writeHead(200);
      res.end('var clientOptions = ' +
              JSON.stringify(clientOptions) + ';');
    } else {
      staticDir.serve(req, res);
    }
  });
  server.addListener('upgrade', function(req, res){
    console.log('upgrade kill');
    res.end();
  });

  sockjs.install({
    sockjs_url: 'http://' + config.listenAddress + ':' + config.port + (prefix || '') + '/lib/sockjs.js',
    websocket: true,
    log: function (severity, message) {
      debug('[%s] %s', severity, message);
    }
  }, server);

  console.log(' [*] Listening on', port);
  server.listen(port);
  return server;
}

module.exports = startServer;
