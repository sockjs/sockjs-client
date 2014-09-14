'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , JSON3 = require('json3')
  ;

function InfoReceiver(baseUrl, AjaxObject) {
  var self = this;
  process.nextTick(function(){
    self.doXhr(baseUrl, AjaxObject);
  });
}

util.inherits(InfoReceiver, EventEmitter);

InfoReceiver.prototype.doXhr = function(baseUrl, AjaxObject) {
  var self = this;
  var t0 = Date.now();
  var xo = new AjaxObject('GET', baseUrl + '/info');

  var tref = setTimeout(function(){xo.ontimeout();}, 8000);

  xo.on('finish', function(status, text) {
    clearTimeout(tref);
    tref = null;
    if (status === 200) {
      var rtt = Date.now() - t0;
      var info;
      if (text) {
        try {
          info = JSON3.parse(text);
        }
        catch (e) {}
      }
      if (typeof info !== 'object') {
        info = {};
      }
      self.emit('finish', info, rtt);
    } else {
      self.emit('finish');
    }
  });
  xo.ontimeout = function() {
    xo.close();
    self.emit('finish');
  };
};

module.exports = InfoReceiver;
