import {EventEmitter} from 'node:events';
import {addQuery} from '../../utils/url.js';
import {polluteGlobalNamespace, iframeEnabled, createHtmlfile, createIframe, WPrefix} from '../../utils/iframe.js';
import {string as randomString} from '../../utils/random.js';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:receiver:htmlfile');

class HtmlfileReceiver extends EventEmitter {
  constructor(url) {
    debug(url);
    super();
    polluteGlobalNamespace();

    this.id = 'a' + randomString(6);
    url = addQuery(url, 'c=' + decodeURIComponent(WPrefix + '.' + this.id));

    debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
    const constructFunc = HtmlfileReceiver.htmlfileEnabled
      ? createHtmlfile : createIframe;

    global[WPrefix][this.id] = {
      start: function () {
        debug('start');
        this.iframeObj.loaded();
      }.bind(this),
      message: function (data) {
        debug('message', data);
        this.emit('message', data);
      }.bind(this),
      stop: function () {
        debug('stop');
        this._cleanup();
        this._close('network');
      }.bind(this),
    };
    this.iframeObj = constructFunc(url, () => {
      debug('callback');
      this._cleanup();
      this._close('permanent');
    });
  }

  abort() {
    debug('abort');
    this._cleanup();
    this._close('user');
  }

  _cleanup() {
    debug('_cleanup');
    if (this.iframeObj) {
      this.iframeObj.cleanup();
      this.iframeObj = null;
    }

    delete global[WPrefix][this.id];
  }

  _close(reason) {
    debug('_close', reason);
    this.emit('close', null, reason);
    this.removeAllListeners();
  }

  static enabled = false;
  static htmlfileEnabled = (function () {
    let htmlfilePresent = false;
    // Obfuscate to avoid firewalls
    const axo = ['Active', 'Object'].join('X');
    if (axo in global) {
      try {
        htmlfilePresent = Boolean(new global[axo]('htmlfile'));
      } catch {
        // Intentionally empty
      }
    }

    HtmlfileReceiver.enabled = htmlfilePresent || iframeEnabled;
    return htmlfilePresent;
  })();
}

export default HtmlfileReceiver;
