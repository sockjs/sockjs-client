'use strict';

var util = require('util');

function InvalidAccessError() {
  Error.call(this);
}
util.inherits(InvalidAccessError, Error);

module.exports = InvalidAccessError;
