'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  var self = this;
  setTimeout(function() {
    XhrDriver.call(self, method, url, payload, {
      noCredentials: true
    });
  }, 0);
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;
