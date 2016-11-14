'use strict';

import {EventEmitter} from 'events';
var inherits = require('inherits');
var JSON3 = require('json3');
import objectUtils = require('./utils/object');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-ajax');
}

export class InfoAjax extends EventEmitter {
  xo;

  constructor(url, AjaxObject) {
    super();

    var self = this;
    var t0 = +new Date();
    this.xo = new AjaxObject('GET', url);

    this.xo.once('finish', function (status, text) {
      var info, rtt;
      if (status === 200) {
        rtt = (+new Date()) - t0;
        if (text) {
          try {
            info = JSON3.parse(text);
          } catch (e) {
            debug('bad json', text);
          }
        }

        if (!objectUtils.isObject(info)) {
          info = {};
        }
      }
      self.emit('finish', info, rtt);
      self.removeAllListeners();
    });
  }

  close() {
    this.removeAllListeners();
    this.xo.close();
  };
}