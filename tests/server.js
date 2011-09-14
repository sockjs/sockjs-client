var http = require('http');
var node_static = require('node-static');

var sockjs_app = require('./sockjs_app');
var config = require('./config').config;


var static_directory = new node_static.Server(__dirname + '/html');


var server = http.createServer();
server.addListener('request', function(req, res) {
                       if (req.url === '/config.js') {
                           res.setHeader('content-type', 'application/javascript');
                           res.writeHead(200);
                           res.end('var client_opts = ' +
                                   JSON.stringify(config.client_opts) + ';');
                       } else {
                           static_directory.serve(req, res);
                       }
                   });
server.addListener('upgrade', function(req,res){
                       res.end();
                   });
config.response_limit = 4*1024;
sockjs_app.install(config, server);

console.log(" [*] Listening on", config.host + ':' + config.port);
server.listen(config.port, config.host);
