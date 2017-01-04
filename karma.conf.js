// Karma configuration
// Generated on Mon Sep 19 2016 22:22:51 GMT-0400 (EDT)

var sockjs = require('./tests/support/sockjs_app');
var SocketIO = require('socket.io')
var debug = require('debug')('sockjs-client:test-server:main');
var nodeStatic = require('node-static');
var path = require('path');

var staticDir = new nodeStatic.Server('tests/html', { cache: 0 });

// var clientOptions = {
//   // Address of a sockjs test server.
//   url: 'http://localhost:9876',
//   sockjs_opts: {
//     // websocket:false
//     info: {cookie_needed: false}
//   }
// };

var CustomMiddlewareFactory = function (config) {
  return function (req, res) {
    if ( /\/slow-script.js/.test(req.url) ) {
      res.setHeader('content-type', 'application/javascript');
      res.writeHead(200);
      setTimeout(function() {
        return res.end('var a = 1;\n');
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
      return res.end(new Array(2049).join('a') + '\nb\n');
    } else if (req.url === '/config.js') {
      if (req.headers.referer) {
        var parsedOrigin = url.parse(req.headers.referer);
        clientOptions.url = parsedOrigin.protocol + '//' + parsedOrigin.hostname + ':' + port;
      }
      res.setHeader('content-type', 'application/javascript');
      res.writeHead(200);
      return res.end('var clientOptions = ' +
        JSON.stringify(clientOptions) + ';');
    } else if (req.url === '/domain.js') {
      res.setHeader('content-type', 'application/javascript');
      res.writeHead(200);
      return res.end('document.domain = document.domain;');
    } else {
      staticDir.serve(req, res);
    }
  }
};

function createSocketIoServer (webServer, executor, config) {

  // webServer.addListener('upgrade', function(req, res){
  //   console.log('upgrade kill');
  //   res.end();
  // });

  sockjs.install({
    sockjs_url: '/lib/sockjs.js',
    websocket: true,
    log: function (severity, message) {
      debug('[%s] %s', severity, message);
    }
  }, webServer);

  var server = new SocketIO(webServer, {
    // avoid destroying http upgrades from socket.io to get proxied websockets working
    destroyUpgrade: false,
    path: config.urlRoot + 'socket.io/',
    transports: config.transports,
    forceJSONP: config.forceJSONP
  });

  // hack to overcome circular dependency
  executor.socketIoSockets = server.sockets;

  return server
}

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'build/browser.js',
      {pattern: 'build/browser.js.map', included: false}
      // {pattern: 'tests/html/iframe.html', included: false},
      // {pattern: 'tests/html/lib/sockjs.js', included: false}
    ],

    middleware: ['custom'],
    plugins: [
      'karma-*',
      {socketServer: ['factory', createSocketIoServer]},
      {'middleware:custom': ['factory', CustomMiddlewareFactory]}
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
