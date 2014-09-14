'use strict';

var util = require('util')
  , AbstractXHRObject = require('./abstract-xhr')
  ;

function XHRLocalObject(method, url, payload) {
  var self = this;
  process.nextTick(function(){
    self._start(method, url, payload, {
      noCredentials: true
    });
  });
}

util.inherits(XHRLocalObject, AbstractXHRObject);

module.exports = XHRLocalObject;
