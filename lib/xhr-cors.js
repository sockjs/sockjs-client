'use strict';

var AbstractXHRObject = require('./abstract-xhr');
var utils = require('./utils');

function XHRCorsObject() {
    var that = this, args = arguments;
    utils.delay(function(){that._start.apply(that, args);});
}
XHRCorsObject.prototype = new AbstractXHRObject();

module.exports = XHRCorsObject;