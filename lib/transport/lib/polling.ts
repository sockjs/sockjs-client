import {EventEmitter} from 'events';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:polling');
}

export class Polling extends EventEmitter {
  Receiver;
  receiveUrl;
  AjaxObject;
  poll;
  pollIsClosing;

  constructor(Receiver, receiveUrl, AjaxObject) {
    super();
    debug(receiveUrl);
    this.Receiver = Receiver;
    this.receiveUrl = receiveUrl;
    this.AjaxObject = AjaxObject;
    this._scheduleReceiver();
  }


  _scheduleReceiver() {
    debug('_scheduleReceiver');
    var self = this;
    var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

    poll.on('message', function (msg) {
      debug('message', msg);
      self.emit('message', msg);
    });

    poll.once('close', function (code, reason) {
      debug('close', code, reason, self.pollIsClosing);
      self.poll = poll = null;

      if (!self.pollIsClosing) {
        if (reason === 'network') {
          self._scheduleReceiver();
        } else {
          self.emit('close', code || 1006, reason);
          self.removeAllListeners();
        }
      }
    });
  };

  abort() {
    debug('abort');
    this.removeAllListeners();
    this.pollIsClosing = true;
    if (this.poll) {
      this.poll.abort();
    }
  };
}
