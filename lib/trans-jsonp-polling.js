'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// mssage could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var util = require('util')
  , utils = require('./utils')
  , BufferedSender = require('./buffered-sender')
  ;

// Abstract away code that handles global namespace pollution.
var jsonPReceiverWrapper = function(url, constructReceiver, userCallback) {
  var id = 'a' + utils.randomString(6);
  var urlId = url + '?c=' + encodeURIComponent(utils.WPrefix + '.' + id);

  // Unfortunately it is not possible to abort loading of the
  // script. We need to keep track of frake close frames.
  var aborting = 0;

  // Callback will be called exactly once.
  var callback = function(frame) {
    switch(aborting) {
    case 0:
      // Normal behaviour - delete hook _and_ emit message.
      delete window[utils.WPrefix][id];
      userCallback(frame);
      break;
    case 1:
      // Fake close frame - emit but don't delete hook.
      userCallback(frame);
      aborting = 2;
      break;
    case 2:
      // Got frame after connection was closed, delete hook, don't emit.
      delete window[utils.WPrefix][id];
      break;
    }
  };

  var closeScript = constructReceiver(urlId, callback);
  window[utils.WPrefix][id] = closeScript;
  var stop = function() {
    if (window[utils.WPrefix][id]) {
      aborting = 1;
      window[utils.WPrefix][id](utils.closeFrame(1000, 'JSONP user aborted read'));
    }
  };
  return stop;
};

function jsonPGenericSender(url, payload, callback) {
  var form = window._sendForm;
  var area = window._sendArea;

  if (!form) {
    form = window._sendForm = document.createElement('form');
    area = window._sendArea = document.createElement('textarea');
    area.name = 'd';
    form.style.display = 'none';
    form.style.position = 'absolute';
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';
    form.acceptCharset = 'UTF-8';
    form.appendChild(area);
    document.body.appendChild(form);
  }
  var id = 'a' + utils.randomString(8);
  form.target = id;
  form.action = url + '/jsonp_send?i=' + id;

  var iframe;
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    iframe = document.createElement('<iframe name="' + id + '">');
  } catch(x) {
    iframe = document.createElement('iframe');
    iframe.name = id;
  }
  iframe.id = id;
  form.appendChild(iframe);
  iframe.style.display = 'none';

  try {
    area.value = payload;
  } catch(e) {
    utils.log('Your browser is seriously broken. Go home! ' + e.message);
  }
  form.submit();

  var completed = function() {
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
                   iframe.parentNode.removeChild(iframe);
                   iframe = null;
               }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(true);
  };
  iframe.onerror = iframe.onload = completed;
  iframe.onreadystatechange = function() {
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return completed;
}

// Parts derived from Socket.io:
//    https://github.com/LearnBoost/socket.io/blob/0.6.17/lib/socket.io/transports/jsonp-polling.js
// and jQuery-JSONP:
//    https://code.google.com/p/jquery-jsonp/source/browse/trunk/core/jquery.jsonp.js
function jsonPGenericReceiver(url, callback) {
  var tref;
  var script = document.createElement('script');
  var script2;  // Opera synchronous load trick.
  var closeScript = function(frame) {
    if (script2) {
      script2.parentNode.removeChild(script2);
      script2 = null;
    }
    if (script) {
      clearTimeout(tref);
      // Unfortunately, you can't really abort script loading of
      // the script.
      script.parentNode.removeChild(script);
      script.onreadystatechange = script.onerror =
          script.onload = script.onclick = null;
      script = null;
      callback(frame);
      callback = null;
    }
  };

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
          closeScript(utils.closeFrame(
            1006,
            'JSONP script loaded abnormally (onerror)'));
        }
      }, 1000);
    }
  };
  script.onload = function() {
    closeScript(utils.closeFrame(1006, 'JSONP script loaded abnormally (onload)'));
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
        closeScript(utils.closeFrame(1006, 'JSONP script loaded abnormally (onreadystatechange)'));
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
      script2 = document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  tref = setTimeout(function() {
    closeScript(utils.closeFrame(1006, 'JSONP script loaded abnormally (timeout)'));
  }, 35000);

  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
  return closeScript;
}

function JsonPTransport(ri, transUrl) {
  utils.polluteGlobalNamespace();
  this.ri = ri;
  this.transUrl = transUrl;
  this.sendConstructor(jsonPGenericSender);
  this._scheduleReceiver();
}

util.inherits(JsonPTransport, BufferedSender);

JsonPTransport.prototype._scheduleReceiver = function() {
  var self = this;
  var callback = function(data) {
    self._receiveStop = null;
    if (data) {
      // no data - heartbeat;
      if (!self._isClosing) {
        self.ri._didMessage(data);
      }
    }
    // The message can be a close message, and change is_closing state.
    if (!self._isClosing) {
      self._scheduleReceiver();
    }
  };
  this._receiveStop = jsonPReceiverWrapper(this.transUrl + '/jsonp',
                                         jsonPGenericReceiver, callback);
};

JsonPTransport.enabled = function() {
  return true;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.needBody = true;

JsonPTransport.prototype.doCleanup = function() {
  this._isClosing = true;
  if (this._receiveStop) {
    this._receiveStop();
  }
  this.ri = this._receiveStop = null;
  this.sendDestructor();
};

module.exports = JsonPTransport;
