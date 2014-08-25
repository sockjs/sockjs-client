'use strict';

var AbstractXHRObject = require('./abstract-xhr');

function XHRLocalObject(method, url, payload) {
    var that = this;
    setTimeout(function(){
        that._start(method, url, payload, {
            no_credentials: true
        });
    }, 0);
}
XHRLocalObject.prototype = new AbstractXHRObject();

module.exports = XHRLocalObject;