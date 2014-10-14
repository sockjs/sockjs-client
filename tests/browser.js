'use strict';

require('../lib/shims');

// prevent global leak warnings on this
global._jp = {};

require('./lib/main.js');
require('./lib/utils.js');
require('./lib/receivers.js');
