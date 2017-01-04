import urlUtils = require('../../utils/url');
import {BufferedSender} from './buffered-sender';
import {Polling} from './polling';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender-receiver');
}

export class SenderReceiver extends BufferedSender {
  poll;

  constructor(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject?) {
    var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
    debug(pollUrl);
    super(transUrl, senderFunc);
    var self = this;

    this.poll = new Polling(Receiver, pollUrl, AjaxObject);
    this.poll.on('message', function (msg) {
      debug('poll message', msg);
      self.emit('message', msg);
    });
    this.poll.once('close', function (code, reason) {
      debug('poll close', code, reason);
      self.poll = null;
      self.emit('close', code, reason);
      self.close();
    });
  }

  close() {
    debug('close');
    this.removeAllListeners();
    if (this.poll) {
      this.poll.abort();
      this.poll = null;
    }
    this.stop();
  };
}
