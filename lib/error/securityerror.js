'use strict';

function SecurityError() {
}

SecurityError.prototype = new Error();
SecurityError.prototype.constructor = SecurityError;

module.exports = SecurityError;
