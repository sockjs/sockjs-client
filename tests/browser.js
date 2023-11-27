'use strict';

require('../lib/shims');

// prevent global leak warnings on this
globalThis._jp = {};
/* eslint-disable camelcase */
globalThis._sockjs_global = null;
/* eslint-enable camelcase */

require('./lib/main');
require('./lib/utils');
require('./lib/receivers');
require('./lib/senders');
require('./lib/end-to-end');
require('./lib/iframe');
require('./lib/transports');
