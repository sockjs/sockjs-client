'use strict';

function InvalidStateError() {
}

InvalidStateError.prototype = new Error();
InvalidStateError.prototype.constructor = InvalidStateError;

module.exports = InvalidStateError;
