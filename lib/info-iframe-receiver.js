import {EventEmitter} from 'node:events';
import XHRLocalObject from './transport/sender/xhr-local.js';
import InfoAjax from './info-ajax.js';

class InfoReceiverIframe extends EventEmitter {
  constructor(transUrl) {
    super();

    this.ir = new InfoAjax(transUrl, XHRLocalObject);
    this.ir.once('finish', (info, rtt) => {
      this.ir = null;
      this.emit('message', JSON.stringify([info, rtt]));
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

export default InfoReceiverIframe;
