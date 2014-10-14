'use strict';

var transportList = require('./transport-list');

module.exports = require('./main')(transportList);

// TODO this is needed for iframe transports, but could probably be done a different way.
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}
