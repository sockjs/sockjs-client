'use strict';

function InvalidAccessError() {
}

InvalidAccessError.prototype = new Error();
InvalidAccessError.prototype.constructor = InvalidAccessError;

module.exports = InvalidAccessError;
