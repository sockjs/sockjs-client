'use strict';

var utils = require('./utils');
var AbstractXHRObject = require('./abstract-xhr');

function XHRLocalObject(method, url, payload) {
    var that = this;
    utils.delay(function(){
        that._start(method, url, payload, {
            no_credentials: true
        });
    });
}
XHRLocalObject.prototype = new AbstractXHRObject();

module.exports = XHRLocalObject;