import utils = require('../../utils/iframe');
import random = require('../../utils/random');
import browser = require('../../utils/browser');
import urlUtils = require('../../utils/url');
import {EventEmitter} from 'events';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:jsonp');
}

export class JsonpReceiver extends EventEmitter {
  id;
  timeoutId;
  aborting;
  script2;
  script;
  errorTimer;
  loadedOkay;

  constructor(url) {
    super();
    debug(url);
    var self = this;

    utils.polluteGlobalNamespace();

    this.id = 'a' + random.string(6);
    var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

    global[utils.WPrefix][this.id] = this._callback.bind(this);
    this._createScript(urlWithId);

    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
    this.timeoutId = setTimeout(function () {
      debug('timeout');
      self._abort(new Error('JSONP script loaded abnormally (timeout)'));
    }, JsonpReceiver.timeout);
  }

  abort() {
    debug('abort');
    if (global[utils.WPrefix][this.id]) {
      var err: any = new Error('JSONP user aborted read');
      err.code = 1000;
      this._abort(err);
    }
  };

  static timeout = 35000;
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
  };

  _abort(err) {
    debug('_abort', err);
    this._cleanup();
    this.aborting = true;
    this.emit('close', err.code, err.message);
    this.removeAllListeners();
  };

  _cleanup() {
    debug('_cleanup');
    clearTimeout(this.timeoutId);
    if (this.script2) {
      this.script2.parentNode.removeChild(this.script2);
      this.script2 = null;
    }
    if (this.script) {
      var script = this.script;
      // Unfortunately, you can't really abort script loading of
      // the script.
      script.parentNode.removeChild(script);
      script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
      this.script = null;
    }
    delete global[utils.WPrefix][this.id];
  };

  _scriptError() {
    debug('_scriptError');
    var self = this;
    if (this.errorTimer) {
      return;
    }

    this.errorTimer = setTimeout(function () {
      if (!self.loadedOkay) {
        self._abort(new Error('JSONP script loaded abnormally (onerror)'));
      }
    }, JsonpReceiver.scriptErrorTimeout);
  };

  _createScript(url) {
    debug('_createScript', url);
    var self = this;
    var script = this.script = (<any>global).document.createElement('script');
    var script2;  // Opera synchronous load trick.

    script.id = 'a' + random.string(8);
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.onerror = this._scriptError.bind(this);
    script.onload = function () {
      debug('onload');
      self._abort(new Error('JSONP script loaded abnormally (onload)'));
    };

    // IE9 fires 'error' event after onreadystatechange or before, in random order.
    // Use loadedOkay to determine if actually errored
    script.onreadystatechange = function () {
      debug('onreadystatechange', script.readyState);
      if (/loaded|closed/.test(script.readyState)) {
        if (script && script.htmlFor && script.onclick) {
          self.loadedOkay = true;
          try {
            // In IE, actually execute the script.
            script.onclick();
          } catch (x) {
            // intentionally empty
          }
        }
        if (script) {
          self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
        }
      }
    };
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
    if (typeof script.async === 'undefined' && (<any>global).document.attachEvent) {
      // According to mozilla docs, in recent browsers script.async defaults
      // to 'true', so we may use it to detect a good browser:
      // https://developer.mozilla.org/en/HTML/Element/script
      if (!browser.isOpera()) {
        // Naively assume we're in IE
        try {
          script.htmlFor = script.id;
          script.event = 'onclick';
        } catch (x) {
          // intentionally empty
        }
        script.async = true;
      } else {
        // Opera, second sync script hack
        script2 = this.script2 = (<any>global).document.createElement('script');
        script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
        script.async = script2.async = false;
      }
    }
    if (typeof script.async !== 'undefined') {
      script.async = true;
    }

    var head = (<any>global).document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);
    if (script2) {
      head.insertBefore(script2, head.firstChild);
    }
  };
}