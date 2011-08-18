var sockjs = require('sockjs');

exports.install = function(config, server) {
    var sjs_echo = new sockjs.Server(config.opts);
    sjs_echo.on('open', function(conn){
                    console.log('    [+] echo open    ' + conn);
                    conn.on('close', function(e) {
                                console.log('    [-] echo close   ' + conn, e);
                            });
                    conn.on('message', function(e) {
                                var d  = JSON.stringify(e.data);
                                console.log('    [ ] echo message ' + conn,
                                            d.slice(0,64)+
                                            ((d.length > 64) ? '...' : ''));
                                conn.send(e.data);
                            });
                });

    var sjs_close = new sockjs.Server(config.opts);
    sjs_close.on('open', function(conn){
                     console.log('    [+] clos open    ' + conn);
                     conn.close(3000, "Go away!");
                     conn.on('close', function(e) {
                                 console.log('    [-] clos close   ' + conn, e);
                             });
                 });

    var sjs_ticker = new sockjs.Server(config.opts);
    sjs_ticker.on('open', function(conn){
                      console.log('    [+] ticker open   ' + conn);
                      var tref;
                      var schedule = function() {
                          conn.send('tick!');
                          tref = setTimeout(schedule, 1000);
                      };
                      tref = setTimeout(schedule, 1000);
                      conn.on('close', function(e) {
                                  clearTimeout(tref);
                                  console.log('    [-] ticker close   ' + conn, e);
                              });
                  });

    var broadcast = {};
    var sjs_broadcast = new sockjs.Server(config.opts);
    sjs_broadcast.on('open', function(conn){
                         console.log('    [+] broadcast open ' + conn);
                         broadcast[conn.id] = conn;
                         conn.on('close', function(e) {
                                     delete broadcast[conn.id];
                                     console.log('    [-] broadcast close' + conn, e);
                                 });
                         conn.on('message', function(e) {
                                     console.log('    [-] broadcast message', e);
                                     for(var id in broadcast) {
                                         broadcast[id].send(e.data);
                                     }
                                 });
                     });


    sjs_echo.installHandlers(server, {prefix:'[/]echo'});
    sjs_close.installHandlers(server, {prefix:'[/]close'});
    sjs_ticker.installHandlers(server, {prefix:'[/]ticker'});
    sjs_broadcast.installHandlers(server, {prefix:'[/]broadcast'});
};
