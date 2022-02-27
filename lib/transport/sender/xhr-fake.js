import {EventEmitter} from 'node:events';

class XHRFake extends EventEmitter {
  constructor(/* method, url, payload, opts */) {
    super();

    this.to = setTimeout(() => {
      this.emit('finish', 200, '{}');
    }, XHRFake.timeout);
  }

  close() {
    clearTimeout(this.to);
  }

  static timeout = 2000;
}

export default XHRFake;
