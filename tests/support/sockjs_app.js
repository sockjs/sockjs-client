/* eslint camelcase: "off" */
'use strict';
var sockjs = require('sockjs');
var debug = require('debug')('sockjs-client:test-server:app');

exports.install = function(opts, server) {
  var sjs_echo = sockjs.createServer(opts);
  sjs_echo.on('connection', function(conn) {
    debug('    [+] echo open    ' + conn);
    conn.on('close', function() {
      debug('    [-] echo close   ' + conn);
    });
    conn.on('data', function(m) {
      var d = JSON.stringify(m);
      debug('    [ ] echo message ' + conn,
                  d.slice(0, 64) +
                  ((d.length > 64) ? '...' : ''));
      conn.write(m);
    });
  });

  var sjs_close = sockjs.createServer(opts);
  sjs_close.on('connection', function(conn) {
    debug('    [+] close open    ' + conn);
    conn.close(3000, 'Go away!');
    conn.on('close', function() {
      debug('    [-] close close   ' + conn);
    });
  });

  var sjs_ticker = sockjs.createServer(opts);
  sjs_ticker.on('connection', function(conn) {
    debug('    [+] ticker open   ' + conn);
    var tref;
    var schedule = function() {
      conn.write('tick!');
      tref = setTimeout(schedule, 1000);
    };
    tref = setTimeout(schedule, 1000);
    conn.on('close', function() {
      clearTimeout(tref);
      debug('    [-] ticker close   ' + conn);
    });
  });

  var broadcast = {};
  var sjs_broadcast = sockjs.createServer(opts);
  sjs_broadcast.on('connection', function(conn) {
    debug('    [+] broadcast open ' + conn);
    broadcast[conn.id] = conn;
    conn.on('close', function() {
      delete broadcast[conn.id];
      debug('    [-] broadcast close' + conn);
    });
    conn.on('data', function(m) {
      debug('    [-] broadcast message', m);
      for(var id in broadcast) {
          broadcast[id].write(m);
      }
    });
  });

  var sjs_amplify = sockjs.createServer(opts);
  sjs_amplify.on('connection', function(conn) {
    debug('    [+] amp open    ' + conn);
    conn.on('close', function() {
      debug('    [-] amp close   ' + conn);
    });
    conn.on('data', function(m) {
      var n = Math.floor(Number(m));
      n = (n > 0 && n < 19) ? n : 1;
      debug('    [ ] amp message: 2^' + n);
      conn.write(new Array(Math.pow(2, n) + 1).join('x'));
    });
  });


  sjs_echo.installHandlers(server, {prefix: '/echo',
                                    response_limit: 4096});
  sjs_echo.installHandlers(server, {prefix: '/disabled_websocket_echo',
                                    websocket: false});
  sjs_echo.installHandlers(server, {prefix: '/cookie_needed_echo',
                                    jsessionid: true});
  sjs_close.installHandlers(server, {prefix: '/close'});
  sjs_ticker.installHandlers(server, {prefix: '/ticker'});
  sjs_amplify.installHandlers(server, {prefix: '/amplify'});
  sjs_broadcast.installHandlers(server, {prefix: '/broadcast'});
};
