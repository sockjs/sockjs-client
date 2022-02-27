import {EventEmitter} from 'node:events';
import debugFunc from './utils/debug.js';
import IframeTransport from './transport/iframe.js';
import InfoReceiverIframe from './info-iframe-receiver.js';
import {attachEvent} from './utils/event.js';

const debug = debugFunc('sockjs-client:info-iframe');

class InfoIframe extends EventEmitter {
  constructor(baseUrl, url) {
    super();

    const go = () => {
      this.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
      this.ifr.once('message', message => {
        if (message) {
          let d;
          try {
            d = JSON.parse(message);
          } catch {
            debug('bad json', message);
            this.emit('finish');
            this.close();
            return;
          }

          const info = d[0];
          const rtt = d[1];
          this.emit('finish', info, rtt);
        }

        this.close();
      });

      this.ifr.once('close', () => {
        this.emit('finish');
        this.close();
      });
    };

    // TODO this seems the same as the 'needBody' from transports
    if (global.document.body) {
      go();
    } else {
      attachEvent('load', go);
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

export default InfoIframe;
