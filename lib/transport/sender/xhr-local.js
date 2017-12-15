'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true,
    headers: opts.headers
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;
