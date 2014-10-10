'use strict';

var util = require('util')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  var self = this
    , args = arguments
    ;
  process.nextTick(function(){
    XhrDriver.apply(self, args);
  });
}

util.inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;
