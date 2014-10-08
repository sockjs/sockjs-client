'use strict';

var util = require('util')
  , AbstractXHRObject = require('./abstract-xhr')
  ;

function XHRLocalObject(method, url, payload) {
  var self = this;
  process.nextTick(function(){
    AbstractXHRObject.call(self, method, url, payload, {
      noCredentials: true
    });
  });
}

util.inherits(XHRLocalObject, AbstractXHRObject);

module.exports = XHRLocalObject;
