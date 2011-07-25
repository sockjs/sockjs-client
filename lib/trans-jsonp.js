// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// mssage could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect network error


var JsonPTransport = SockJS.jsonp = function(ri, trans_url){
    utils.polluteGlobalNamespace();
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(jsonPGenericSender);
    that._schedule_recv();
};

// Inheritnace
JsonPTransport.prototype = new BufferedSender();

JsonPTransport.prototype._schedule_recv = function() {
    var that = this;
    var callback = function(e, t) {
        that._recv_stop = undefined;
        if (typeof t === 'undefined') {
            // messages
            for(var i=0; i < e.length; i++) {
                that.ri._didMessage(e[i]);
            }
        } else {
            switch (t) {
            case 'open':
                that.ri._didOpen();
                break;
            case 'heartbeat':
                break;
            case 'close':
                if (e) {
                    that.ri._didClose(e.status, e.reason);
                } else {
                    that.ri._didClose(1001, "Server closed connection");
                }
                break;
            }
        }
        if (t !== 'close' && !that._is_closing) {
            that._schedule_recv();
        }
    };
    that._recv_stop = jsonPReceiverWrapper(that.trans_url + '/jsonp',
                                           jsonPGenericReceiver, callback);
};

JsonPTransport.prototype.doClose = function(status, reason) {
    this._is_closing = true;
    if (this._recv_stop) {
        this._recv_stop();
    }
    if (this._send_stop) {
        this._send_stop();
    }
    this._recv_stop = this._send_stop = undefined;
    this.ri._didClose(1001, "User requested");
};

JsonPTransport.enabled = function() {
    return true;
};


var jsonPReceiverWrapper = function(url, constructReceiver, user_callback) {
    var id = 'a' + utils.random_string(6);
    var url_id = url + '?c=' + escape(WPrefix + '.' + id);
    var callback = function(e, t) {
        delete _window[WPrefix][id];
        user_callback(e, t);
    };

    var close_script = constructReceiver(url_id, callback);
    _window[WPrefix][id] = close_script;
    var stop = function() {
        if (_window[WPrefix][id]) {
            close_script({status:1000, reson:"Normal closure"}, 'stop');
        }
    };
    return stop;
};

// Parts derived from Socket.io:
//    https://github.com/LearnBoost/socket.io/blob/0.6.17/lib/socket.io/transports/jsonp-polling.js
// and jQuery-JSONP:
//    https://code.google.com/p/jquery-jsonp/source/browse/trunk/core/jquery.jsonp.js
var jsonPGenericReceiver = function(url, callback) {
    var script = _document.createElement('script');
    var script2;
    var close_script = function(v, t) {
        setTimeout(function(){
                       if (typeof script2 !== 'undefined') {
                           script2.parentNode.removeChild(script2);
                           script2 = undefined;
                       }
                       if (typeof script !== 'undefined') {
                           callback(v, t);
                           script.parentNode.removeChild(script);
                           script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
                           delete script;
                           script = callback = undefined;
                       }
                   }, 0);
    };
    script.id = 'a' + utils.random_string(8);
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.onerror = function(e) {
        close_script({status:1001, reason:"Onerror triggered on script"},
                     'close');
    };
    script.onload = function(e) {
        close_script({status:1001, reason:"Onload triggered on script"},
                     'close');
    };
    script.onreadystatechange = function(e) {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
            if (typeof script !== 'undefined' && script.htmlFor && script.onclick) {
                try {
                    script.onclick();
                } catch (x) {}
            }
            if (typeof script !== 'undefined') {
                close_script({status:1001, reason:"Onreadystatechange triggered on script"},
                             'close');
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
    if (typeof script.async === 'undefined') {
        // According to mozilla docs, in recent browsers script.async defaults
        // to 'true', so we may use it to detect a good browser:
        // https://developer.mozilla.org/en/HTML/Element/script
        if (typeof _document.attachEvent === 'object') {
            // ie
            try {
                script.htmlFor = script.id;
                script.event = "onclick";
            } catch (x) {}
            script.async = true;
        } else if (typeof _document.attachEvent === 'function') {
            // opera, second sync script hack
            script2 = _document.createElement('script');
            script2.text = "try{document.getElementById('"+script.id+"').onerror();}catch(x){};";
            script.async = script2.async = false;
        } else {
            // konqueror. fallback to a stupid timer, 5 seconds shall be plenty.
            setTimeout(function(){
                           if (script && script.onerror) {
                               script.onerror();
                           }
                       }, 5000);
        }
    } else {
        script.async = true;
    }

    var head = _document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);
    if (script2){
        head.insertBefore(script2, head.firstChild);
    }
    return close_script;
};
