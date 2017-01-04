'use strict';

import {EventEmitter} from 'events';
var JSON3 = require('json3');
import utils = require('./utils/event');
import {IframeTransport} from './transport/iframe';
import {InfoIframeReceiver} from './info-iframe-receiver';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-iframe');
}

export class InfoIframe extends EventEmitter {
  ifr;

  constructor(baseUrl, url) {
    super();
    var self = this;

    var go = function () {
      var ifr = self.ifr = new IframeTransport(InfoIframeReceiver.transportName, url, baseUrl);

      ifr.once('message', function (msg) {
        if (msg) {
          var d;
          try {
            d = JSON3.parse(msg);
          } catch (e) {
            debug('bad json', msg);
            self.emit('finish');
            self.close();
            return;
          }

          var info = d[0], rtt = d[1];
          self.emit('finish', info, rtt);
        }
        self.close();
      });

      ifr.once('close', function () {
        self.emit('finish');
        self.close();
      });
    };

    // TODO this seems the same as the 'needBody' from transports
    if (!(<any>global).document.body) {
      utils.attachEvent('load', go);
    } else {
      go();
    }
  }


  static enabled() {
    return IframeTransport.enabled();
  }

  close() {
    if (this.ifr) {
      this.ifr.close();
    }
    this.removeAllListeners();
    this.ifr = null;
  }
}