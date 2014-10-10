'use strict';

var util = require('util')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  var self = this;
  process.nextTick(function(){
    XhrDriver.call(self, method, url, payload, opts);
  });
}

util.inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;
