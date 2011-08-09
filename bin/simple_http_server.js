var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var compress = require('compress');
var crypto = require('crypto');
var optparse = require('optparse');

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

var md5_hex = function (data) {
    return crypto.createHash('md5').update(data).digest('hex');
};


var compressable_ct = ['text', 'application'];

var req_fin = function(statusCode, req, res, content, encoding) {
    var gz = '';
    if (!encoding) encoding = 'utf-8';
    if (compress && content &&
        'accept-encoding' in req.headers &&
        req.headers['accept-encoding'].split(',').indexOf('gzip') !== -1 &&
        compressable_ct.indexOf(res.getHeader('Content-Type').split('/')[0]) !== -1) {
        var gzip = new compress.Gzip;
        gzip.init();
        content = gzip.deflate(content, encoding) + gzip.end();
        res.setHeader('Content-Encoding', 'gzip');
        gz = '(gzip)';
        encoding = 'binary';
    }
    if (content) {
        // According to: http://code.google.com/speed/page-speed/docs/caching.html
        // 'vary' effectively disables caching for IE. IE users are
        // screwed anyway.
        res.setHeader('Vary', 'Accept-Encoding');
    }

    if (options.cacheable) {
        var cache_for = 365 * 24 * 60 * 60; // one year.
        // See: http://code.google.com/speed/page-speed/docs/caching.html
        res.setHeader('Cache-Control', 'public, max-age=' + cache_for);
        var exp = new Date();
        exp.setTime(exp.getTime() + cache_for * 1000);
        res.setHeader('Expires', exp.toGMTString());
    };

    var cl = '';
    if (content) {
        cl = content.length;
        res.setHeader('Content-Length', content.length);
    } else {
        content = '';
    }
    try {
        res.writeHead(statusCode);
        res.end(content, encoding);
    } catch (x) {}

    console.log(req.method, req.url, statusCode, cl, gz);
};

var fs_decorator = function(req, res, cb) {
    return function (err, data) {
        if (!err) {
            try {
                cb(data);
            } catch (x) {
                err = true;
                req_fin(500, req, res);
                console.log('error', x.stack);
            }
        } else {
            // file doesn't exist or can't read it.
            req_fin(404, req, res);
        }
    };
};
var handler = function(req, res) {
    var filename = options.topdir + '/';
    filename += url.parse(req.url).pathname.slice(1) || 'index.html';
    var cb1, cb2;
    cb1 = function(stats) {
        var last_modified = stats.mtime.toGMTString();
        if (req.headers['if-modified-since'] === last_modified) {
            req_fin(304, req, res);
            return;
        }
        if (!options.cacheable) {
            res.setHeader('Last-Modified', last_modified);
        }
        fs.readFile(filename, fs_decorator(req, res, cb2));
    };
    cb2 = function (content) {
        var md5 = '"' + md5_hex(content) + '"';
        if (req.headers['if-none-match'] === md5) {
            req_fin(304, req, res);
            return;
        }
        var mimetype = mimetypes[path.extname(filename).slice(1)] || 'text/plain';
        mimetype += '; charset=UTF-8';
        res.setHeader('Content-Type', mimetype);
        res.setHeader('ETag', md5);
        req_fin(200, req, res, content);
    };
    fs.stat(filename, fs_decorator(req, res, cb1));
};

var switches = [
    ['-p', '--port PORT', 'Port to listen on (default: 8080)'],
    ['-h', '--host HOST', 'Ip address to bind to (default: 0.0.0.0)'],
    ['-d', '--dir DIR', 'Directory from which to serve files (default: .)']
];

var options = {port:8000, host:'0.0.0.0', topdir:'.', cacheable:false};
var parser = new optparse.OptionParser(switches)
parser.on('port', function(_,v) {
              options.port = Number(v);
          });
parser.on('host', function (_,v) {
              options.host = v;
          });
parser.on('dir', function (_,v) {
              options.topdir = v;
          });
parser.parse(process.ARGV.slice(2));

console.log(" [*] Listening on", options.host + ':' + options.port, ' serving directory:', options.topdir);
var server = http.createServer();
server.addListener('request', handler);
server.listen(options.port, options.host);
