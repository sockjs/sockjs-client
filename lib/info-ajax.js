'use strict';

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , JSON3 = require('json3')
  , objectUtils = require('./utils/object')
  ;

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = Date.now();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = Date.now() - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        }
        catch (e) {}
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

util.inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function () {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;
