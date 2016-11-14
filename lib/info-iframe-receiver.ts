'use strict';

import {EventEmitter} from 'events';
var JSON3 = require('json3');
import {XHRLocalObject} from './transport/sender/xhr-local';
import {InfoAjax} from './info-ajax';

export class InfoIframeReceiver extends EventEmitter {
  ir;

  constructor(transUrl) {
    super();

    var self = this;
    this.ir = new InfoAjax(transUrl, XHRLocalObject);
    this.ir.once('finish', function (info, rtt) {
      self.ir = null;
      self.emit('message', JSON3.stringify([info, rtt]));
    });
  }

  static transportName = 'iframe-info-receiver';

  close() {
    if (this.ir) {
      this.ir.close();
      this.ir = null;
    }
    this.removeAllListeners();
  }
}