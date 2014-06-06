'use strict';
var http = require('http');
var node_static = require('node-static');
var sockjs_app = require('./sockjs_app');
var url = require('url');

var port = process.env.ZUUL_PORT || 8081;
var client_opts = {
  // Address of a sockjs test server.
  url: 'http://localhost:'+port,
  sockjs_opts: {
      devel: true,
      debug: true,
      // websocket:false
      info: {cookie_needed:false}
  }
};

var static_directory = new node_static.Server(__dirname + '/html');

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
    var parsedOrigin = url.parse(req.headers.referer || 'http://localhost');
    client_opts.url = parsedOrigin.protocol + '//' + parsedOrigin.hostname + ':' + port;
    res.setHeader('content-type', 'application/javascript');
    res.writeHead(200);
    res.end('var client_opts = ' +
            JSON.stringify(client_opts) + ';');
  } else if (req.url === '/domain.js') {
    res.setHeader('content-type', 'application/javascript');
    res.writeHead(200);
    res.end('document.domain = document.domain;');
  } else {
    static_directory.serve(req, res);
  }
});
server.addListener('upgrade', function(req, res){
  res.end();
});

sockjs_app.install({
  sockjs_url: '/lib/sockjs.js',
  websocket: true
}, server);

console.log(" [*] Listening on", port);
server.listen(port);
