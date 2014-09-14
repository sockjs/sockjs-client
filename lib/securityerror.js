'use strict';

var util = require('util');

function SecurityError() {
  Error.call(this);
}
util.inherits(SecurityError, Error);

module.exports = SecurityError;
