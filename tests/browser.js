'use strict';

require('../lib/shims');

if (!process.env.TRAVIS_JOB_NUMBER) {
  require('debug').enable('sockjs-client:*');
}

// prevent global leak warnings on this
global._jp = {};
global._sockjs_global = null;

require('./lib/main');
require('./lib/utils');
require('./lib/receivers');
require('./lib/senders');
require('./lib/end-to-end');
require('./lib/iframe');
require('./lib/transports');
