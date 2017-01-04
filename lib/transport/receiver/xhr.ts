import {EventEmitter} from 'events';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:xhr');
}

export class XhrReceiver extends EventEmitter {
  bufferPosition;
  xo;

  constructor(url, AjaxObject) {
    super();
    debug(url);
    var self = this;

    this.bufferPosition = 0;

    this.xo = new AjaxObject('POST', url, null);
    this.xo.on('chunk', this._chunkHandler.bind(this));
    this.xo.once('finish', function (status, text) {
      debug('finish', status, text);
      self._chunkHandler(status, text);
      self.xo = null;
      var reason = status === 200 ? 'network' : 'permanent';
      debug('close', reason);
      self.emit('close', null, reason);
      self._cleanup();
    });
  }

  _chunkHandler(status, text) {
    debug('_chunkHandler', status);
    if (status !== 200 || !text) {
      return;
    }

    for (var idx = -1; ; this.bufferPosition += idx + 1) {
      var buf = text.slice(this.bufferPosition);
      idx = buf.indexOf('\n');
      if (idx === -1) {
        break;
      }
      var msg = buf.slice(0, idx);
      if (msg) {
        debug('message', msg);
        this.emit('message', msg);
      }
    }
  };

  _cleanup() {
    debug('_cleanup');
    this.removeAllListeners();
  };

  abort() {
    debug('abort');
    if (this.xo) {
      this.xo.close();
      debug('close');
      this.emit('close', null, 'user');
      this.xo = null;
    }
    this._cleanup();
  };
}
