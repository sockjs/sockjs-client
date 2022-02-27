import {EventEmitter} from 'node:events';
import EventSourceDriver from 'eventsource';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:receiver:eventsource');

class EventSourceReceiver extends EventEmitter {
  constructor(url) {
    debug(url);
    super();
    this.es = new EventSourceDriver(url);
    this.es.addEventListener('message', this._esmessage);
    this.es.addEventListener('error', this._eserror);
  }

  _esmessage = evt => {
    debug('message', evt.data);
    this.emit('message', decodeURI(evt.data));
  };

  _eserror = evt => {
    debug('error', this.es.readyState, evt);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    const reason = (this.es.readyState === 2 ? 'permanent' : 'network');
    this._cleanup();
    this._close(reason);
  };

  abort() {
    debug('abort');
    this._cleanup();
    this._close('user');
  }

  _cleanup() {
    debug('cleanup');
    if (this.es) {
      this.es.removeEventListener('error', this._eserror);
      this.es.removeEventListener('message', this._esmessage);
      this.es.close();
      this.es = null;
    }
  }

  _close(reason) {
    debug('close', reason);
    // Safari and chrome < 15 crash if we close window before
    // waiting for ES cleanup. See:
    // https://code.google.com/p/chromium/issues/detail?id=89155
    setTimeout(() => {
      this.emit('close', null, reason);
      this.removeAllListeners();
    }, 200);
  }
}

export default EventSourceReceiver;
