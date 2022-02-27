import {EventEmitter} from 'node:events';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:buffered-sender');

class BufferedSender extends EventEmitter {
  constructor(url, sender) {
    debug(url);
    super();
    this.sendBuffer = [];
    this.sender = sender;
    this.url = url;
  }

  send(message) {
    debug('send', message);
    this.sendBuffer.push(message);
    if (!this.sendStop) {
      this.sendSchedule();
    }
  }

  // For polling transports in a situation when in the message callback,
  // new message is being send. If the sending connection was started
  // before receiving one, it is possible to saturate the network and
  // timeout due to the lack of receiving socket. To avoid that we delay
  // sending messages by some small time, in order to let receiving
  // connection be started beforehand. This is only a halfmeasure and
  // does not fix the big problem, but it does make the tests go more
  // stable on slow networks.
  sendScheduleWait() {
    debug('sendScheduleWait');
    this.sendStop = () => {
      debug('sendStop');
      this.sendStop = null;
      clearTimeout(tref);
    };

    const tref = setTimeout(() => {
      debug('timeout');
      this.sendStop = null;
      this.sendSchedule();
    }, 25);
  }

  sendSchedule() {
    debug('sendSchedule', this.sendBuffer.length);
    if (this.sendBuffer.length > 0) {
      const payload = '[' + this.sendBuffer.join(',') + ']';
      this.sendStop = this.sender(this.url, payload, error => {
        this.sendStop = null;
        if (error) {
          debug('error', error);
          this.emit('close', error.code || 1006, 'Sending error: ' + error);
          this.close();
        } else {
          this.sendScheduleWait();
        }
      });
      this.sendBuffer = [];
    }
  }

  _cleanup() {
    debug('_cleanup');
    this.removeAllListeners();
  }

  close() {
    debug('close');
    this._cleanup();
    if (this.sendStop) {
      this.sendStop();
      this.sendStop = null;
    }
  }
}

export default BufferedSender;
