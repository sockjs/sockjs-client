'use strict';

var util = require('util')
  , AbstractXHRObject = require('./abstract-xhr')
  ;

function XHRCorsObject() {
  var self = this
    , args = arguments
    ;
  process.nextTick(function(){
    self._start.apply(self, args);
  });
}

util.inherits(XHRCorsObject, AbstractXHRObject);

module.exports = XHRCorsObject;
