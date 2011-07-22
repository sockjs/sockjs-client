var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var port = 8000;
var host = "0.0.0.0";

var mimetypes = {
    html: 'text/html',
    htm: 'text/html',
    js: 'application/javascript',
    json: 'application/json',
    css: 'text/css',
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    gif: 'image/gif'
};
var handler = function(req, res) {
    var filename = url.parse(req.url).pathname.slice(1) || 'index.html';
    var cb = function (error, content) {
        try{
            if (error) {
                console.log(req.method, filename, 404);
                res.writeHead(404);
                res.end();
            } else {
                console.log(req.method, filename, 200, content.length);
                res.setHeader('Content-length', content.length);
                var mimetype = mimetypes[path.extname(filename).slice(1)] || 'text/plain';
                mimetype += '; charset=UTF-8';
                res.setHeader('Content-type', mimetype);
                res.writeHead(200, res.headers);
                res.write(content);
                res.end();
            }
        } catch (x) {
            console.log(req.method, filename, "(closed)");
        }
    };
    fs.readFile(filename, cb);
};

console.log(" [*] Listening on", host + ':' + port);
var server = http.createServer();
server.addListener('request', handler);
server.listen(port, host);
