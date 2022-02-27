import {EventEmitter} from 'node:events';
import {polluteGlobalNamespace, WPrefix} from '../../utils/iframe.js';
import {string as randomString} from '../../utils/random.js';
import {isOpera} from '../../utils/browser.js';
import {addQuery} from '../../utils/url.js';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:receiver:jsonp');

class JsonpReceiver extends EventEmitter {
  constructor(url) {
    debug(url);
    super();

    polluteGlobalNamespace();

    this.id = 'a' + randomString(6);
    const urlWithId = addQuery(url, 'c=' + encodeURIComponent(WPrefix + '.' + this.id));

    global[WPrefix][this.id] = this._callback.bind(this);
    this._createScript(urlWithId);

    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
    this.timeoutId = setTimeout(() => {
      debug('timeout');
      this._abort(new Error('JSONP script loaded abnormally (timeout)'));
    }, JsonpReceiver.timeout);
  }

  abort() {
    debug('abort');
    if (global[WPrefix][this.id]) {
      const error = new Error('JSONP user aborted read');
      error.code = 1000;
      this._abort(error);
    }
  }

  static timeout = 35_000;
  static scriptErrorTimeout = 1000;

  _callback(data) {
    debug('_callback', data);
    this._cleanup();

    if (this.aborting) {
      return;
    }

    if (data) {
      debug('message', data);
      this.emit('message', data);
    }

    this.emit('close', null, 'network');
    this.removeAllListeners();
  }

  _abort(error) {
    debug('_abort', error);
    this._cleanup();
    this.aborting = true;
    this.emit('close', error.code, error.message);
    this.removeAllListeners();
  }

  _cleanup() {
    debug('_cleanup');
    clearTimeout(this.timeoutId);
    if (this.script2) {
      this.script2.remove();
      this.script2 = null;
    }

    if (this.script) {
      // Unfortunately, you can't really abort script loading of
      // the script.
      this.script.remove();
      // We don't have a reference to the onclick handler
      // eslint-disable-next-line unicorn/prefer-add-event-listener
      this.script.onclick = null;
      this.script.removeEventListener('load', this._scriptLoad);
      this.script.removeEventListener('error', this._scriptError);
      this.script.removeEventListener('readystatechange', this._scriptReadyStateChange);
      this.script = null;
    }

    delete global[WPrefix][this.id];
  }

  _scriptError = () => {
    debug('_scriptError');
    if (this.errorTimer) {
      return;
    }

    this.errorTimer = setTimeout(() => {
      if (!this.loadedOkay) {
        this._abort(new Error('JSONP script loaded abnormally (onerror)'));
      }
    }, JsonpReceiver.scriptErrorTimeout);
  };

  _scriptLoad = () => {
    debug('onload');
    this._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  _scriptReadyStateChange = () => {
    if (!this.script) {
      return;
    }

    debug('onreadystatechange', this.script.readyState);
    if (/loaded|closed/.test(this.script.readyState)) {
      if (this.script.htmlFor && this.script.onclick) {
        this.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          this.script.onclick();
        } catch {
          // Intentionally empty
        }
      }

      if (this.script) {
        this._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };

  _createScript(url) {
    debug('_createScript', url);
    this.script = global.document.createElement('script');
    let script2; // Opera synchronous load trick.

    this.script.id = 'a' + randomString(8);
    this.script.src = url;
    this.script.type = 'text/javascript';
    this.script.charset = 'UTF-8';
    this.script.addEventListener('error', this._scriptError);
    this.script.addEventListener('load', this._scriptLoad);

    // IE9 fires 'error' event after onreadystatechange or before, in random order.
    // Use loadedOkay to determine if actually errored
    this.script.addEventListener('readystatechange', this._scriptReadyStateChange);

    // IE: event/htmlFor/onclick trick.
    // One can't rely on proper order for onreadystatechange. In order to
    // make sure, set a 'htmlFor' and 'event' properties, so that
    // script code will be installed as 'onclick' handler for the
    // script object. Later, onreadystatechange, manually execute this
    // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
    // set. For reference see:
    //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
    // Also, read on that about script ordering:
    //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
    if (typeof this.script.async === 'undefined' && global.document.attachEvent) {
      // According to mozilla docs, in recent browsers script.async defaults
      // to 'true', so we may use it to detect a good browser:
      // https://developer.mozilla.org/en/HTML/Element/script
      if (isOpera()) {
        // Opera, second sync script hack
        this.script2 = global.document.createElement('script');
        this.script2.text = 'try{const a = document.getElementById(\'' + this.script.id + '\'); if(a)a.onerror();}catch(x){};';
        this.script2.async = false;
        this.script.async = false;
      } else {
        // Naively assume we're in IE
        try {
          this.script.htmlFor = this.script.id;
          this.script.event = 'onclick';
        } catch {
          // Intentionally empty
        }

        this.script.async = true;
      }
    }

    if (typeof this.script.async !== 'undefined') {
      this.script.async = true;
    }

    const head = global.document.querySelectorAll('head')[0];
    head.insertBefore(this.script, head.firstChild);
    if (script2) {
      head.insertBefore(script2, head.firstChild);
    }
  }
}

export default JsonpReceiver;
