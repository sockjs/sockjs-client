import {addPath} from '../../utils/url.js';
import debugFunc from './utils/debug.js';
import BufferedSender from './buffered-sender.js';
import Polling from './polling.js';

const debug = debugFunc('sockjs-client:sender-receiver');

class SenderReceiver extends BufferedSender {
  // eslint-disable-next-line max-params
  constructor(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
    const pollUrl = addPath(transUrl, urlSuffix);
    debug(pollUrl);
    super(transUrl, senderFunc);

    this.poll = new Polling(Receiver, pollUrl, AjaxObject);
    this.poll.on('message', message => {
      debug('poll message', message);
      this.emit('message', message);
    });
    this.poll.once('close', (code, reason) => {
      debug('poll close', code, reason);
      this.poll = null;
      this.emit('close', code, reason);
      this.close();
    });
  }

  close() {
    super.close();
    debug('close');
    this.removeAllListeners();
    if (this.poll) {
      this.poll.abort();
      this.poll = null;
    }
  }
}

export default SenderReceiver;
