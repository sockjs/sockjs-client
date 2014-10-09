'use strict';

var utils = require('../../utils')
  , util = require('util')
  , SimpleEvent = require('../../simpleevent')
  , EventTarget = require('../../polyfills/eventtarget')
  ;

function JsonpReceiver(url) {
  EventTarget.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + utils.randomString(6);
  var urlId = url + '?c=' + encodeURIComponent(utils.WPrefix + '.' + this.id);

  window[utils.WPrefix][this.id] = this.callback.bind(this);
  this.createScript(urlId);
}

util.inherits(JsonpReceiver, EventTarget);

JsonpReceiver.prototype.callback = function (data) {
  this.deleteScript();
  delete window[utils.WPrefix][this.id];
  
  if (this.aborting) {
    return;
  }

  if (data) {
    this.dispatchEvent(new SimpleEvent('message', { data: data }));
  }
  this.dispatchEvent(new SimpleEvent('close', { reason: 'network' }));
};

JsonpReceiver.prototype.abort = function () {
  if (window[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

module.exports = JsonpReceiver;

JsonpReceiver.prototype._abort = function (err) {
  this.deleteScript();
  this.aborting = true;
  this.dispatchEvent(new SimpleEvent('close', { reason: 'permanent' }));
};

JsonpReceiver.prototype.deleteScript = function () {
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    clearTimeout(this.tref);
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
};

JsonpReceiver.prototype.createScript = function (url) {
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  // IE9 fires 'error' event after orsc or before, in random order.
  var loadedOkay = false;
  var errorTimer = null;

  script.id = 'a' + utils.randomString(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = function() {
    if (!errorTimer) {
      // Delay firing closeScript.
      errorTimer = setTimeout(function() {
        if (!loadedOkay) {
          self._abort(new Error('JSONP script loaded abnormally (onerror)'));
        }
      }, 1000);
    }
  };
  script.onload = function() {
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  script.onreadystatechange = function() {
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        loadedOkay = true;
        try {
            // In IE, actually execute the script.
            script.onclick();
        } catch (x) {}
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
  if (typeof script.async === 'undefined' && document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!/opera/i.test(navigator.userAgent)) {
      // Naively assume we're in IE
      try {
          script.htmlFor = script.id;
          script.event = 'onclick';
      } catch (x) {}
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.tref = setTimeout(function() {
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, 35000);

  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};
