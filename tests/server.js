var shs = require('./simple_http_server');
var sts = require('./sockjs_test_server');

var config = require('./config');

config.static.topdir =  __dirname + '/html';

shs.createServer(config.static);
sts.createServer(config.sockjs);
