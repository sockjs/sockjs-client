import {EventEmitter} from 'node:events';
import {unloadAdd, unloadDel} from '../utils/event.js';
import {addPath} from '../utils/url.js';
import debugFunc from '../utils/debug.js';
import WebsocketDriver from './driver/websocket.js';

const debug = debugFunc('sockjs-client:websocket');

class WebSocketTransport extends EventEmitter {
  constructor(transUrl, ignore, options) {
    if (!WebSocketTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    super();
    debug('constructor', transUrl);

    let url = addPath(transUrl, '/websocket');
    url = url.slice(0, 5) === 'https' ? 'wss' + url.slice(5) : 'ws' + url.slice(4);
    this.url = url;

    this.ws = new WebsocketDriver(this.url, [], options);
    this.ws.addEventListener('message', this._wsmessage);

    // Firefox has an interesting bug. If a websocket connection is
    // created after onunload, it stays alive even when user
    // navigates away from the page. In such situation let's lie -
    // let's not open the ws connection at all. See:
    // https://github.com/sockjs/sockjs-client/issues/28
    // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
    this.unloadRef = unloadAdd(() => {
      debug('unload');
      this.ws.close();
    });
    this.ws.addEventListener('close', this._wsclose);
    this.ws.addEventListener('error', this._wserror);
  }

  _wsmessage = evt => {
    debug('message event', evt.data);
    this.emit('message', evt.data);
  };

  _wsclose = evt => {
    debug('close event', evt.code, evt.reason);
    this.emit('close', evt.code, evt.reason);
    this._cleanup();
  };

  _wserror = evt => {
    debug('error event', evt);
    this.emit('close', 1006, 'WebSocket connection broken');
    this._cleanup();
  };

  send(data) {
    const message = '[' + data + ']';
    debug('send', message);
    this.ws.send(message);
  }

  close() {
    debug('close');
    const {ws} = this;
    this._cleanup();
    if (ws) {
      ws.close();
    }
  }

  _cleanup() {
    debug('_cleanup');
    if (this.ws) {
      this.ws.removeEventListener('error', this._wserror);
      this.ws.removeEventListener('close', this._wsclose);
      this.ws.removeEventListener('message', this._wsmessage);
    }

    unloadDel(this.unloadRef);
    this.ws = null;
    this.unloadRef = null;
    this.removeAllListeners();
  }

  static enabled() {
    debug('enabled');
    return Boolean(WebsocketDriver);
  }

  static transportName = 'websocket';

  // In theory, ws should require 1 round trip. But in chrome, this is
  // not very stable over SSL. Most likely a ws connection requires a
  // separate SSL connection, in which case 2 round trips are an
  // absolute minumum.
  static roundTrips = 2;
}

export default WebSocketTransport;
