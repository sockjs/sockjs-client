import {EventEmitter} from 'node:events';
import debugFunc from './utils/debug.js';
import {isObject} from './utils/object.js';

const debug = debugFunc('sockjs-client:info-ajax');

class InfoAjax extends EventEmitter {
  constructor(url, AjaxObject) {
    super();
    const t0 = Date.now();
    this.xo = new AjaxObject('GET', url);

    this.xo.once('finish', (status, text) => {
      let info;
      let rtt;
      if (status === 200) {
        rtt = Date.now() - t0;
        if (text) {
          try {
            info = JSON.parse(text);
          } catch {
            debug('bad json', text);
          }
        }

        if (!isObject(info)) {
          info = {};
        }
      }

      this.emit('finish', info, rtt);
      this.removeAllListeners();
    });
  }

  close() {
    this.removeAllListeners();
    this.xo.close();
  }
}

export default InfoAjax;
