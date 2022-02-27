import {EventEmitter} from 'node:events';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:polling');

class Polling extends EventEmitter {
  constructor(Receiver, receiveUrl, AjaxObject) {
    debug(receiveUrl);
    super();
    this.Receiver = Receiver;
    this.receiveUrl = receiveUrl;
    this.AjaxObject = AjaxObject;
    this._scheduleReceiver();
  }

  _scheduleReceiver() {
    debug('_scheduleReceiver');
    this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
    this.poll.on('message', message => {
      debug('message', message);
      this.emit('message', message);
    });

    this.poll.once('close', (code, reason) => {
      debug('close', code, reason, this.pollIsClosing);
      this.poll = null;

      if (!this.pollIsClosing) {
        if (reason === 'network') {
          this._scheduleReceiver();
        } else {
          this.emit('close', code || 1006, reason);
          this.removeAllListeners();
        }
      }
    });
  }

  abort() {
    debug('abort');
    this.removeAllListeners();
    this.pollIsClosing = true;
    if (this.poll) {
      this.poll.abort();
    }
  }
}

export default Polling;
