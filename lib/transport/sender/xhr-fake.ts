import {EventEmitter} from 'events';

export class XHRFake extends EventEmitter {
  private to;

  constructor(/* method, url, payload, opts */) {
    super();
    var self = this;

    this.to = setTimeout(function () {
      self.emit('finish', 200, '{}');
    }, XHRFake.timeout);
  }

  close() {
    clearTimeout(this.to);
  }

  static timeout = 2000;
}