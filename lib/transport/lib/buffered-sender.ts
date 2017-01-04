'use strict';

import {EventEmitter} from 'events';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:buffered-sender');
}

export class BufferedSender extends EventEmitter {
  sendBuffer;
  sender;
  url;
  sendStop;

  constructor(url, sender) {
    super();
    debug(url);
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
  };

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
    var self = this;
    var tref;
    this.sendStop = function () {
      debug('sendStop');
      self.sendStop = null;
      clearTimeout(tref);
    };
    tref = setTimeout(function () {
      debug('timeout');
      self.sendStop = null;
      self.sendSchedule();
    }, 25);
  };

  sendSchedule() {
    debug('sendSchedule', this.sendBuffer.length);
    var self = this;
    if (this.sendBuffer.length > 0) {
      var payload = '[' + this.sendBuffer.join(',') + ']';
      this.sendStop = this.sender(this.url, payload, function (err) {
        self.sendStop = null;
        if (err) {
          debug('error', err);
          self.emit('close', err.code || 1006, 'Sending error: ' + err);
          self._cleanup();
        } else {
          self.sendScheduleWait();
        }
      });
      this.sendBuffer = [];
    }
  };

  _cleanup() {
    debug('_cleanup');
    this.removeAllListeners();
  };

  stop() {
    debug('stop');
    this._cleanup();
    if (this.sendStop) {
      this.sendStop();
      this.sendStop = null;
    }
  };
}
