'use strict';

var util = require('util');

function InvalidStateError() {
  Error.call(this);
}
util.inherits(InvalidStateError, Error);

module.exports = InvalidStateError;
