'use strict';

require('../lib/shims');

// prevent global leak warnings on this
(<any>global)._jp = {};
(<any>global)._sockjs_global = null;

require('./lib/main');
require('./lib/utils');
require('./lib/receivers');
require('./lib/senders');
require('./lib/end-to-end');
require('./lib/iframe');
require('./lib/transports');
