import {EventEmitter} from 'events';
var EventSourceDriver = require('eventsource');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:eventsource');
}

export class EventSourceReceiver extends EventEmitter {
  private es;

  constructor(url) {
    super();
    debug(url);

    var self = this;
    var es = this.es = new EventSourceDriver(url);
    es.onmessage = function (e) {
      debug('message', e.data);
      self.emit('message', decodeURI(e.data));
    };
    es.onerror = function (e) {
      debug('error', es.readyState, e);
      // ES on reconnection has readyState = 0 or 1.
      // on network error it's CLOSED = 2
      var reason = (es.readyState !== 2 ? 'network' : 'permanent');
      self._cleanup();
      self._close(reason);
    };
  }

  abort() {
    debug('abort');
    this._cleanup();
    this._close('user');
  };

  _cleanup() {
    debug('cleanup');
    var es = this.es;
    if (es) {
      es.onmessage = es.onerror = null;
      es.close();
      this.es = null;
    }
  };

  _close(reason) {
    debug('close', reason);
    var self = this;
    // Safari and chrome < 15 crash if we close window before
    // waiting for ES cleanup. See:
    // https://code.google.com/p/chromium/issues/detail?id=89155
    setTimeout(function () {
      self.emit('close', null, reason);
      self.removeAllListeners();
    }, 200);
  };
}
