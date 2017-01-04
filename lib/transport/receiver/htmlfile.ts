import iframeUtils = require('../../utils/iframe');
import urlUtils = require('../../utils/url');
import {EventEmitter} from 'events';
import random = require('../../utils/random');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:htmlfile');
}

export class HtmlfileReceiver extends EventEmitter {
  id;
  iframeObj;

  constructor(url) {
    super();
    debug(url);
    var self = this;
    iframeUtils.polluteGlobalNamespace();

    this.id = 'a' + random.string(6);
    url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

    debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
    var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

    global[iframeUtils.WPrefix][this.id] = {
      start: function () {
        debug('start');
        self.iframeObj.loaded();
      }
      , message: function (data) {
        debug('message', data);
        self.emit('message', data);
      }
      , stop: function () {
        debug('stop');
        self._cleanup();
        self._close('network');
      }
    };
    this.iframeObj = constructFunc(url, function () {
      debug('callback');
      self._cleanup();
      self._close('permanent');
    });
  }

  abort() {
    debug('abort');
    this._cleanup();
    this._close('user');
  };

  _cleanup() {
    debug('_cleanup');
    if (this.iframeObj) {
      this.iframeObj.cleanup();
      this.iframeObj = null;
    }
    delete global[iframeUtils.WPrefix][this.id];
  };

  _close(reason) {
    debug('_close', reason);
    this.emit('close', null, reason);
    this.removeAllListeners();
  };

  static htmlfileEnabled = false;

  static enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
}
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}
