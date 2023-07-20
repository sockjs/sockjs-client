'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload, opts) {
  opts = opts || {};
  opts.noCredentials = true;
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;
