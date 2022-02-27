import {EventEmitter} from 'node:events';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:receiver:xhr');

class XhrReceiver extends EventEmitter {
  constructor(url, AjaxObject) {
    debug(url);
    super();

    this.bufferPosition = 0;

    this.xo = new AjaxObject('POST', url, null);
    this.xo.on('chunk', this._chunkHandler.bind(this));
    this.xo.once('finish', (status, text) => {
      debug('finish', status, text);
      this._chunkHandler(status, text);
      this.xo = null;
      const reason = status === 200 ? 'network' : 'permanent';
      debug('close', reason);
      this.emit('close', null, reason);
      this._cleanup();
    });
  }

  _chunkHandler(status, text) {
    debug('_chunkHandler', status);
    if (status !== 200 || !text) {
      return;
    }

    for (let idx = -1; ; this.bufferPosition += idx + 1) {
      const buf = text.slice(this.bufferPosition);
      idx = buf.indexOf('\n');
      if (idx === -1) {
        break;
      }

      const message = buf.slice(0, idx);
      if (message) {
        debug('message', message);
        this.emit('message', message);
      }
    }
  }

  _cleanup() {
    debug('_cleanup');
    this.removeAllListeners();
  }

  abort() {
    debug('abort');
    if (this.xo) {
      this.xo.close();
      debug('close');
      this.emit('close', null, 'user');
      this.xo = null;
    }

    this._cleanup();
  }
}

export default XhrReceiver;
