'use strict';

var AbstractXHRObject = require('./abstract-xhr');

function XHRCorsObject() {
    var that = this, args = arguments;
    setTimeout(function(){that._start.apply(that, args);}, 0);
}
XHRCorsObject.prototype = new AbstractXHRObject();

module.exports = XHRCorsObject;