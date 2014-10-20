'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  var self = this;
  process.nextTick(function() {
    XhrDriver.call(self, method, url, payload, {
      noCredentials: true
    });
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;
