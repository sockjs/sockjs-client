'use strict';

var server = require('./support/sockjs_server')(8081, {
	listenAddress: '0.0.0.0',
	port: 8081
});

require('./lib/main');
require('./lib/main-node');
require('./lib/utils');
require('./lib/receivers');
require('./lib/senders');
require('./lib/end-to-end');
require('./lib/transports');

after(function() {
	server.close();
});
