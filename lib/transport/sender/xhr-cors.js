'use strict';

var util = require('util')
  , AbstractXHRObject = require('./abstract-xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  var self = this
    , args = arguments
    ;
  process.nextTick(function(){
    AbstractXHRObject.apply(self, args);
  });
}

util.inherits(XHRCorsObject, AbstractXHRObject);

XHRCorsObject.capable = function () {
  try {
    if (global.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()) {
      return true;
    }
  } catch (ignored) {}
  return false;
};

module.exports = XHRCorsObject;
