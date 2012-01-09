var http = require('http');
var node_static = require('node-static');

var config = require('./config').config;

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
        res.setHeader('Access-Control-Allow-Origin', '*')

        res.writeHead(200);
        res.write(Array(2049).join('a') + '\n');
        setTimeout(function() {
            res.end('b\n');
        }, 250);
    } else if ( /\/simple.txt/.test(req.url) ) {
        res.setHeader('content-type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.writeHead(200);
        res.end(Array(2049).join('a') + '\nb\n');
    } else if (req.url === '/config.js') {
        res.setHeader('content-type', 'application/javascript');
        res.writeHead(200);
        res.end('var client_opts = ' +
                JSON.stringify(config.client_opts) + ';');
    } else {
        static_directory.serve(req, res);
    }
});

console.log(" [*] Listening on", config.host + ':' + config.port);
server.listen(config.port, config.host);
