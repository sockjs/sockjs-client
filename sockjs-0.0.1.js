// SockJS client, version 0.0.1, MIT License
//     https://github.com/majek/sockjs-client

// JSON2 by Douglas Crockford (minified).
var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()


//     [*] Including lib/index.js
// Public object
SockJS = (function(){
              var _document = document;
              var _window = window;

//         [*] Including lib/reventtarget.js
var REventTarget = function() {
    this._listeners = {};
};
REventTarget.prototype.addEventListener = function (eventType, listener) {
    if(!(eventType in this._listeners)) {
        this._listeners[eventType] = [];
    }
    this._listeners[eventType].push(listener);
    return true;
};
REventTarget.prototype.removeEventListener = function (eventType, listener) {
    if(!(eventType in this._listeners)) {
        return false;
    }
    var arr = this._listeners[eventType];
    var idx = arr.indexOf(listener);
    if (idx !== -1) {
        if(arr.length > 1) {
            this._listeners[eventType] = arr.slice(0, idx).concat( a.slice(idx+1) );
        } else {
            delete this._listeners[eventType];
        }
        return true;
    }
    return false;
};
REventTarget.prototype.dispatchEvent = function (event) {
    var t = event.type;
    var args = Array.prototype.slice.call(arguments, 0);
    if (typeof this['on'+t] !== 'undefined') {
        this['on'+t].apply(this, args);
    }
    if (t in this._listeners) {
        for(var i=0; i < this._listeners[t].length; i++) {
            this._listeners[t][i].apply(this, args);
        }
    }
};
//         [*] End of lib/reventtarget.js


//         [*] Including lib/simpleevent.js
var SimpleEvent = function(type, obj) {
    this.type = type;
    if (typeof obj !== 'undefined') {
        for(var k in obj) {
            if (!obj.hasOwnProperty(k)) continue;
            this[k] = obj[k];
        }
    }
};

SimpleEvent.prototype.toString = function() {
    var r = [];
    for(var k in this) {
        if (!this.hasOwnProperty(k)) continue;
        var v = this[k];
        if (typeof v === 'function') v = '[function]';
        r.push(k + '=' + v);
    }
    return 'SimpleEvent(' + r.join(', ') + ')';
};
//         [*] End of lib/simpleevent.js


//         [*] Including lib/utils.js
var utils = {};
var random_string_chars = ['a','b','c','d','e','f','g','h','i','j',
                           'k','l','m','n','o','p','q','r','s','t',
                           'u','v','w','x','y','z',
                           '0','1','2','3','4','5','6','7','8','9','_'];
utils.random_string = function(letters, max) {
    max = max || random_string_chars.length;
    var i, ret = [];
    for(i=0; i < letters; i++) {
        ret.push( random_string_chars[Math.floor(Math.random() * max)] );
    }
    return ret.join('');
};
utils.random_number = function(max) {
    return Math.floor(Math.random() * max);
};
utils.random_number_string = function(max) {
    var s = ''+utils.random_number(max);
    var t = (''+(max - 1)).length;
    while (s.length < t) {s = '0' + s;}
    return s;
};

utils.attachMessage = function(listener) {
    utils.attachEvent('message', listener);
};
utils.attachEvent = function(event, listener) {
    if (typeof _window.addEventListener !== 'undefined') {
        _window.addEventListener(event, listener, false);
    } else {
        // IE quirks.
        // According to: http://stevesouders.com/misc/test-postmessage.php
        // the message gets delivered only to 'document', not 'window'.
	_document.attachEvent("on" + event, listener);
        // I get 'window' for ie8.
	_window.attachEvent("on" + event, listener);
    }
};

utils.detachMessage = function(listener) {
    utils.detachEvent('message', listener);
};
utils.detachEvent = function(event, listener) {
    if (typeof _window.addEventListener !== 'undefined') {
        _window.removeEventListener(event, listener, false);
    } else {
        _document.detachEvent("on" + event, listener);
	_window.detachEvent("on" + event, listener);
    }
};


// Assuming that url looks like: http://asdasd:111/asd
utils.getOrigin = function(url) {
    url += '/';
    var parts = url.split('/').slice(0, 3);
    return parts.join('/');
};

utils.objectExtend = function(dst, src) {
    for(var k in src) {
        if (src.hasOwnProperty(k)) {
            dst[k] = src[k];
        }
    }
    return dst;
};

// Try to clear some headers, in order to save bandwidth. For
// reference see:
//   http://blog.mibbit.com/?p=143
//   http://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy_for_XMLHttpRequest
var xhrDefaultHeaders = {
    "User-Agent": '',
    "Accept": '',
    "Accept-Language": '',
    "Content-Type": "T"
};

if (navigator &&
    (navigator.userAgent.indexOf('Chrome')!= -1 ||
     navigator.userAgent.indexOf('Safari') != -1)) {
    delete xhrDefaultHeaders['User-Agent'];
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
utils.createXDR = function(method, url, payload, callback) {
    var mock_xhr = {status: null, responseText:'', readyState:1};
    var xdr = new XDomainRequest();
    // IE caches even POSTs
    url += ((url.indexOf('?') === -1) ? '?' : '&') + 't='+utils.random_string(8);
    var cleanup = function() {
        if (xdr) {
            onerror = xdr.onerror = xdr.ontimeout = xdr.onprogress =
                xdr.onload = null;
            try {
                xdr.abort();
            } catch (x) {}
            xdr = callback = null;
        }
    };
    var onerror = xdr.ontimeout = xdr.onerror = function() {
        mock_xhr.status = 500;
        mock_xhr.readyState = 4;
        callback(mock_xhr);
        cleanup();
    };
    xdr.onload = function() {
        mock_xhr.status = 200;
        mock_xhr.readyState = 4;
        mock_xhr.responseText = xdr.responseText;
        callback(mock_xhr);
        cleanup();
    };
    xdr.onprogress = function() {
        mock_xhr.status = 200;
        mock_xhr.readyState = 3;
        mock_xhr.responseText = xdr.responseText;
        callback(mock_xhr);
    };
    try {
        // Fails with AccessDenied if port number is bogus
        xdr.open(method, url);
        xdr.send(payload);
    } catch (x) {
        onerror();
    }
    return function (abort_reason) {
        if (callback) {
            callback(mock_xhr, null, abort_reason);
            cleanup();
        }
    };
};

utils.createXHR = function(method, url, payload, callback) {
    var xhr;
    if (_window.ActiveXObject) {
        // IE caches POSTs
        url += ((url.indexOf('?') === -1) ? '?' : '&') + 't='+(+new Date);
        try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch(x) {}
    }
    if (!xhr) {
        xhr = new XMLHttpRequest();
    }
    xhr.open(method, url, true);

    for (var k in xhrDefaultHeaders) {
        try {
            xhr.setRequestHeader(k, xhrDefaultHeaders[k]);
        } catch(x) {
            delete xhrDefaultHeaders[k];
        }
    }

    var cleanup = function() {
        // IE needs this field to be a function
        try{
            xhr.onreadystatechange = null;
        } catch (x) {
            xhr.onreadystatechange = function(){};
        }
        // Explorer tends to keep connection open, even after the
        // tab is closed: http://bugs.jquery.com/ticket/5280
        try {
            xhr.abort();
        } catch(e) {};
        callback = xhr = null;
    };

    xhr.onreadystatechange = function (e) {
        if (xhr && callback) {
            callback(xhr, e);
            if (xhr && xhr.readyState === 4) {
                cleanup();
            }
        }
    };
    xhr.send(payload);
    return function (abort_reason) {
        if (callback) {
            callback(xhr, null, abort_reason);
            cleanup();
        }
    };
};

var WPrefix = '_jp';

utils.polluteGlobalNamespace = function() {
    if (!(WPrefix in _window)) {
        _window[WPrefix] = {};
    }
};

utils.createIframe = function (iframe_url, error_callback) {
    var iframe = _document.createElement('iframe');
    var tref;
    var unattach = function() {
        clearTimeout(tref);
        // Explorer had problems with that.
        try {iframe.onload = null;} catch (x) {}
        iframe.onerror = null;
    };
    var cleanup = function() {
        if (iframe) {
            unattach();
            iframe.parentNode.removeChild(iframe);
            iframe.src = "about:blank";
            iframe = null;
        }
    };
    var onerror = function(r) {
        if (iframe) {
            cleanup();
            error_callback(r);
        }
    };
    iframe.src = iframe_url;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function(){onerror('onerror');};
    iframe.onload = function() {
        // `onload` is triggered before scripts on the iframe are
        // executed. Give it few seconds to actually load stuff.
        clearTimeout(tref);
        tref = setTimeout(function(){onerror('onload timeout');}, 2000);
    };
    _document.body.appendChild(iframe);
    tref = setTimeout(function(){onerror('timeout');}, 5000);
    return {
        iframe: iframe,
        cleanup: cleanup,
        loaded: unattach
    };
};

utils.closeFrame = function (status, reason) {
    return 'c'+JSON.stringify([status, reason]);
};

utils.userSetStatus = function (status) {
    return status === 1000 || (status >= 3000 && status <= 4999);
};

utils.log = function() {
    if (_window.console && console.log && console.log.apply) {
        console.log.apply(console, arguments);
    }
};

utils.bind = function(fun, that) {
    if (fun.bind) {
        return fun.bind(that);
    } else {
        return function() {
            return fun.apply(that, arguments);
        };
    }
};
//         [*] End of lib/utils.js


//         [*] Including lib/sockjs.js
var SockJS = function(url, protocols, options) {
    var that = this;
    that._options = {devel: false, debug: false};
    if (options) {
        utils.objectExtend(that._options, options);
    }
    that._base_url = url;
    that._server = that._options.server || utils.random_number_string(1000);
    that._connid = utils.random_string(8);
    that._trans_url = that._base_url + '/' + that._server + '/' + that._connid;
    that._protocols = ['websocket',
                       'iframe-eventsource',
                       'xhr-polling',
                       'iframe-xhr-polling',
                       'jsonp-polling'];
    switch(typeof protocols) {
    case 'undefined': break;
    case 'string': that._protocols = [protocols]; break;
    default: that._protocols = protocols; break;
    }
    that.protocol = null;
    that.readyState = SockJS.CONNECTING;
    that._didClose();
};
// Inheritance
SockJS.prototype = new REventTarget();

SockJS.version = "0.0.1";

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._debug = function() {
    if (this._options.debug)
        utils.log.apply(utils, arguments);
};

SockJS.prototype._dispatchOpen = function() {
    var that = this;
    if (that.readyState === SockJS.CONNECTING) {
        if (that._transport_tref) {
            clearTimeout(that._transport_tref);
            that._transport_tref = null;
        }
        that.readyState = SockJS.OPEN;
        that.dispatchEvent(new SimpleEvent("open"));
    } else {
        // The server might have been restarted, and lost track of our
        // connection.
        that._didClose(1006, "Server lost session");
    }
};

SockJS.prototype._dispatchMessage = function(data) {
    var that = this;
    if (that.readyState !== SockJS.OPEN)
            return;
    that.dispatchEvent(new SimpleEvent("message", {data: data}));
};


SockJS.prototype._didClose = function(status, reason) {
    var that = this;
    if (that.readyState !== SockJS.CONNECTING &&
        that.readyState !== SockJS.OPEN &&
        that.readyState !== SockJS.CLOSING)
            throw new Error('INVALID_STATE_ERR');
    if (that._transport)
        that._transport.doCleanup();
    that._transport = null;
    if (that._transport_tref) {
        clearTimeout(that._transport_tref);
        that._transport_tref = null;
    }
    var close_event = new SimpleEvent("close", {status: status, reason: reason});

    if (!utils.userSetStatus(status) && that.readyState === SockJS.CONNECTING) {
        if (that._try_next_protocol(close_event)) {
            that._transport_tref = setTimeout(
                function() {
                    if (that.readyState === SockJS.CONNECTING) {
                        // I can't understand how it is possible to run
                        // this timer, when the state is CLOSED, but
                        // apparently in IE everythin is possible.
                        that._didClose(2007,
                                       "Transport timeouted");
                    }
                }, 5001);
            return;
        }
        close_event = new SimpleEvent("close", {status: 2000,
                                                reason: "All transports failed",
                                                last_event: close_event});
    }
    that.readyState = SockJS.CLOSED;

    setTimeout(function() {
                   that.dispatchEvent(close_event);
               }, 0);
};

SockJS.prototype._didMessage = function(data) {
    var that = this;
    var type = data.slice(0, 1);
    switch(type) {
    case 'o':
        that._dispatchOpen();
        break;
    case 'a':
        var payload = JSON.parse(data.slice(1) || '[]');
        for(var i=0; i < payload.length; i++){
            that._dispatchMessage(payload[i]);
        }
        break;
    case 'm':
        var payload = JSON.parse(data.slice(1) || 'null');
        that._dispatchMessage(payload);
        break;
    case 'c':
        var payload = JSON.parse(data.slice(1) || '[]');
        that._didClose(payload[0], payload[1]);
        break;
    case 'h':// heartbeat, ignore
        break;
    }
};

SockJS.prototype._try_next_protocol = function(close_event) {
    var that = this;
    if (that.protocol)
        that._debug('Closed transport:', that.protocol, ''+close_event);

    while(1) {
        that.protocol = that._protocols.shift();
        if (!that.protocol) {
            return false;
        }
        if (!SockJS[that.protocol] || !SockJS[that.protocol].enabled()) {
            that._debug('Skipping transport:', that.protocol);
        } else {
            that._debug('Opening transport:', that.protocol);
            that._transport = new SockJS[that.protocol](that, that._trans_url,
                                                        that._base_url);
            return true;
        }
    }
};

SockJS.prototype.close = function(status, reason) {
    var that = this;
    if (status && !utils.userSetStatus(status))
        throw new Error("INVALID_ACCESS_ERR");
    if(that.readyState !== SockJS.CONNECTING &&
       that.readyState !== SockJS.OPEN) {
        return false;
    }
    that.readyState = SockJS.CLOSING;
    that._didClose(status || 1000, reason || "Normal closure");
    return true;
};

SockJS.prototype.send = function(data) {
    var that = this;
    if (that.readyState === SockJS.CONNECTING)
        throw new Error('INVALID_STATE_ERR');
    if (that.readyState === SockJS.OPEN) {
        that._transport.doSend(JSON.stringify(data));
    }
    return true;
};
//         [*] End of lib/sockjs.js


//         [*] Including lib/trans-websocket.js
var WebSocketTransport = SockJS.websocket = function(ri, trans_url) {
    var that = this;
    var url = trans_url + '/websocket';
    if (url.slice(0, 5) === 'https') {
        url = 'wss' + url.slice(5);
    } else {
        url = 'ws' + url.slice(4);
    }
    that.ri = ri;
    that.url = url;
    var Constructor = window.WebSocket || window.MozWebSocket;
    that.ws = new Constructor(that.url);
    that.ws.onmessage = function(e) {
        that.ri._didMessage(e.data);
    };
    that.ws.onclose = function() {
        that.ri._didMessage(utils.closeFrame(1006, "WebSocket connection broken"));
    };
};

WebSocketTransport.prototype.doSend = function(data) {
    this.ws.send(data);
};

WebSocketTransport.prototype.doCleanup = function() {
    var that = this;
    var ws = that.ws;
    if (ws) {
        ws.onmessage = ws.onclose = null;
        ws.close();
        that.ri = that.ws = null;
    }
};

WebSocketTransport.enabled = function() {
    return (window.WebSocket || window.MozWebSocket);
};
//         [*] End of lib/trans-websocket.js


//         [*] Including lib/trans-jsonp-sender.js
var BufferedSender = function() {};
BufferedSender.prototype.send_constructor = function(sender) {
    var that = this;
    that.send_buffer = [];
    that.sender = sender;
};
BufferedSender.prototype.doSend = function(message) {
    var that = this;
    that.send_buffer.push(message);
    if (typeof that.send_stop === 'undefined') {
        that.send_schedule();
    }
};

BufferedSender.prototype.send_schedule = function() {
    var that = this;
    if (that.send_buffer.length > 0) {
        var payload = '[' + that.send_buffer.join(',') + ']';
        that.send_stop = that.sender(that.trans_url,
                                     payload,
                                     function() {
                                         that.send_stop = undefined;
                                         that.send_schedule();
                                     });
        that.send_buffer = [];
    }
};

BufferedSender.prototype.send_destructor = function() {
    var that = this;
    if (that._send_stop) {
        that._send_stop();
    }
    that._send_stop = null;
};

var jsonPGenericSender = function(url, payload, callback) {
    var that = this;
    if (!('_send_form' in that)) {
        var form = that._send_form = _document.createElement('form');
        var area = that._send_area = _document.createElement('textarea');
        area.name = 'd';
        form.style.display = 'none';
        form.style.position = 'absolute';
        form.method = 'POST';
        form.enctype = 'application/x-www-form-urlencoded';
        form.acceptCharset = "UTF-8";
        form.appendChild(area);
        _document.body.appendChild(form);
    }
    var form = that._send_form;
    var area = that._send_area;
    var id = 'a' + utils.random_string(8);
    form.target = id;
    form.action = url + '/jsonp_send?i=' + id;

    var iframe;
    try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        iframe = _document.createElement('<iframe name="'+ id +'">');
    } catch(x) {
        iframe = _document.createElement('iframe');
        iframe.name = id;
    }
    iframe.id = id;
    form.appendChild(iframe);
    iframe.style.display = 'none';

    area.value = payload;
    form.submit();

    var completed = function(e) {
        if (!iframe.onerror) return;
        iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
        // Opera mini doesn't like if we GC iframe
        // immediately, thus this timeout.
        setTimeout(function() {
                       iframe.parentNode.removeChild(iframe);
                       iframe = null;
                   }, 500);
        area.value = null;
        callback();
    };
    iframe.onerror = iframe.onload = completed;
    iframe.onreadystatechange = function(e) {
        if (iframe.readyState == 'complete') completed();
    };
    return completed;
};

var ajaxSender = function(url, payload, callback) {
    var orsc = function (xhr, e, abort_reason) {
        if(xhr.readyState === 4 || abort_reason) {
            callback(xhr.status, abort_reason);
        }
    };
    return utils.createXHR('POST', url + '/xhr_send', payload, orsc);
};

var xdrSender = function(url, payload, callback) {
    var orsc = function (xhr, e, abort_reason) {
        if(xhr.readyState === 4 || abort_reason) {
            callback(xhr.status, abort_reason);
        }
    };
    var fun = window.XDomainRequest ? utils.createXDR : utils.createXHR;
    return fun('POST', url + '/xhr_send', payload, orsc);
};
//         [*] End of lib/trans-jsonp-sender.js


//         [*] Including lib/trans-jsonp-receiver.js
// Parts derived from Socket.io:
//    https://github.com/LearnBoost/socket.io/blob/0.6.17/lib/socket.io/transports/jsonp-polling.js
// and jQuery-JSONP:
//    https://code.google.com/p/jquery-jsonp/source/browse/trunk/core/jquery.jsonp.js
var jsonPGenericReceiver = function(url, callback) {
    var tref;
    var script = _document.createElement('script');
    var script2;  // Opera synchronous load trick.
    var close_script = function(frame) {
        if (script2) {
            script2.parentNode.removeChild(script2);
            script2 = null;
        }
        if (script) {
            clearTimeout(tref);
            script.parentNode.removeChild(script);
            script.onreadystatechange = script.onerror =
                script.onload = script.onclick = null;
            script = null;
            callback(frame);
            callback = null;
        }
    };

    script.id = 'a' + utils.random_string(8);
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.onerror = function() {
        close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onerror)"));
    };
    script.onload = function(e) {
        close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onload)"));
    };

    script.onreadystatechange = function(e) {
        if (/loaded|closed/.test(script.readyState)) {
            if (script && script.htmlFor && script.onclick) {
                try {
                    // In IE, actually execute the script.
                    script.onclick();
                } catch (x) {}
            }
            if (script) {
                close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"));
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
            // Opera, second sync script hack
            script2 = _document.createElement('script');
            script2.text = "try{var a = document.getElementById('"+script.id+"'); if(a)a.onerror();}catch(x){};";
            script.async = script2.async = false;
        }
    } else {
        script.async = true;
    }

    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
    tref = setTimeout(function() {
                          close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (timeout)"));
                      }, 35000);

    var head = _document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);
    if (script2) {
        head.insertBefore(script2, head.firstChild);
    }
    return close_script;
};
//         [*] End of lib/trans-jsonp-receiver.js


//         [*] Including lib/trans-jsonp-polling.js
// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// mssage could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors


var JsonPTransport = SockJS['jsonp-polling'] = function(ri, trans_url) {
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
    var callback = function(data) {
        that._recv_stop = null;
        if (data) {
            // no data - heartbeat;
            if (!that._is_closing) {
                that.ri._didMessage(data);
            }
        }
        // The message can be a close message, and change is_closing state.
        if (!that._is_closing) {
            that._schedule_recv();
        }
    };
    that._recv_stop = jsonPReceiverWrapper(that.trans_url + '/jsonp',
                                           jsonPGenericReceiver, callback);
};

JsonPTransport.enabled = function() {
    return true;
};

JsonPTransport.prototype.doCleanup = function() {
    var that = this;
    that._is_closing = true;
    if (that._recv_stop) {
        that._recv_stop();
    }
    that.ri = that._recv_stop = null;
    that.send_destructor();
};


// Abstract away code that handles global namespace pollution.
var jsonPReceiverWrapper = function(url, constructReceiver, user_callback) {
    var id = 'a' + utils.random_string(6);
    var url_id = url + '?c=' + escape(WPrefix + '.' + id);
    // Callback will be called exactly once.
    var callback = function(frame) {
        delete _window[WPrefix][id];
        user_callback(frame);
    };

    var close_script = constructReceiver(url_id, callback);
    _window[WPrefix][id] = close_script;
    var stop = function() {
        if (_window[WPrefix][id]) {
            _window[WPrefix][id](utils.closeFrame(1000, "JSONP user aborted read"));
        }
    };
    return stop;
};
//         [*] End of lib/trans-jsonp-polling.js


//         [*] Including lib/trans-xhr-polling.js
// Requires CORS-enabled browser.

var XhrTransport = SockJS['xhr-polling'] = function(ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xdrSender);
    that._schedule_recv();
};

XhrTransport.prototype = new BufferedSender();

XhrTransport.prototype._schedule_recv = function() {
    var that = this;
    var message_callback = function (xhr, messages) {
        if (xhr.status === 200) {
            for(var i=0; i < messages.length; i++)
                that.ri._didMessage(messages[i]);
            if (messages.length === 1 && messages[0] === 'o') {
                that._streaming = true;
                utils.log('Upgrading from "xhr-polling" to "xhr-streaming"');
            }
        }
    };
    var end_callback = function (xhr, abort_reason) {
        that._recv_stop = null;
        if (abort_reason) return;
        if (xhr.status === 200) {
            if (!that._is_closing) {
                that._schedule_recv();
            }
        } else {
            that.ri._didClose(1006, "XHR error (" + xhr.status + ")");
        }
    };
    var postfix = that._streaming ? '/xhr_streaming' : '/xhr';
    that._recv_stop = xhrPoll(that.trans_url + postfix, message_callback, end_callback);
};

XhrTransport.prototype.doCleanup = function() {
    var that = this;
    that._is_closing = true;
    if (that._recv_stop) {
        that._recv_stop();
    }
    that.ri = that._recv_stop = null;
    that.send_destructor();
};

var xhrPoll = function(url, message_callback, end_callback) {
    var buf_pos = 0;
    var orsc = function (xhr, e, abort_reason) {
        if ((xhr.readyState === 3 || xhr.readyState === 4) && xhr.responseText) {
            // utils.log('responseText=', escape(xhr.responseText), 'buf_pos=',buf_pos);
            var msgs = [];
            while (1) {
                var buf = xhr.responseText.slice(buf_pos);
                var p = buf.indexOf('\n');
                if (p === -1) break;
                buf_pos += p+1;
                msgs.push( buf.slice(0, p) );
            }
            if (msgs.length)
                message_callback(xhr, msgs);
        }
        if (xhr.readyState === 4 || abort_reason) {
            end_callback(xhr, abort_reason);
        }
    };
    // Using POST can save us from caching issues.
    var fun = window.XDomainRequest ? utils.createXDR : utils.createXHR;
    return fun('POST', url, null, orsc);
};


// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
XhrTransport.enabled = function() {
    if (window.XDomainRequest) return true;
    if (window.XMLHttpRequest &&
        'withCredentials' in new XMLHttpRequest()) return true;
    return false;
};
//         [*] End of lib/trans-xhr-polling.js


//         [*] Including lib/trans-iframe.js
// Few cool transports do work only for same-origin. In order to make
// them working cross-domain we shall use iframe, served form the
// remote domain. New browsers, have capabilities to communicate with
// cross domain iframe, using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var IframeTransport = function() {};

IframeTransport.prototype.i_constructor = function(ri, trans_url, base_url) {
    var that = this;
    that.ri = ri;
    that.origin = utils.getOrigin(base_url);
    that.trans_url = trans_url;

    var iframe_url = base_url + '/iframe.html';
    if (that.ri._options.devel) {
        iframe_url += '?t=' + (+new Date);
    }

    that.iframeObj = utils.createIframe(iframe_url, function(r) {
                                            that.ri._didClose(1006, "Unable to load an iframe (" + r + ")");
                                        });

    that.onmessage_cb = utils.bind(that.onmessage, that);
    utils.attachMessage(that.onmessage_cb);
};

IframeTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.iframeObj) {
        utils.detachMessage(that.onmessage_cb);
        try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            if (that.iframeObj.iframe.contentWindow) {
                that.postMessage('c');
            }
        } catch (x) {}
        var iframeObj = that.iframeObj;
        // Give the iframe some time for cleanup.
        setTimeout(function() {
                       iframeObj.cleanup();
                       iframeObj = null;
                   }, 100);
        that.onmessage_cb  = that.iframeObj = null;
    }
};

IframeTransport.prototype.onmessage = function(e) {
    var that = this;
    if (e.origin !== that.origin) return;
    var type = e.data.slice(0, 1);
    var data = e.data.slice(1);
    switch(type) {
    case 's':
        that.iframeObj.loaded();
        that.postMessage('s', JSON.stringify([SockJS.version, that.protocol, that.trans_url]));
        break;
    case 't':
        that.ri._didMessage(data);
        break;
    }
};

IframeTransport.prototype.postMessage = function(type, data) {
    var that = this;
    that.iframeObj.iframe.contentWindow.postMessage(type + (data || ''), that.origin);
};

IframeTransport.prototype.doSend = function (message) {
    this.postMessage('m', message);
};

IframeTransport.enabled = function() {
    // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
    // huge delay, or not at all.
    var konqueror = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;
    return ((typeof _window.postMessage === 'function' ||
            typeof _window.postMessage === 'object') && (!konqueror));
};
//         [*] End of lib/trans-iframe.js


//         [*] Including lib/trans-iframe-within.js
var postMessage = function (type, data) {
    if(parent !== _window) {
        parent.postMessage(type + (data || ''), '*');
    } else {
        utils.log("Can't postMessage, no parent window.", type, data);
    }
};

var FacadeJS = function() {};
FacadeJS.prototype._didClose = function (status, reason) {
    postMessage('t', utils.closeFrame(status, reason));
};
FacadeJS.prototype._didMessage = function (frame) {
    postMessage('t', frame);
};
FacadeJS.prototype._doSend = function (data) {
    this._transport.doSend(data);
};
FacadeJS.prototype._doCleanup = function () {
    this._transport.doCleanup();
};

SockJS.bootstrap_iframe = function() {
    var facade;
    var onMessage = function(e) {
        if(e.source !== parent) return;
        var type = e.data.slice(0, 1);
        var data = e.data.slice(1);
        switch(type) {
        case 's':
            var p = JSON.parse(data);
            var version = p[0];
            var protocol = p[1];
            var trans_url = p[2];
            if (version !== SockJS.version) {
                utils.log("Incompatibile SockJS! Main site uses:" +
                          " \"" + version + "\", the iframe:" +
                          " \"" + SockJS.version + "\".");
            }
            facade = new FacadeJS();
            facade._transport = new FacadeJS[protocol](facade, trans_url);
            break;
        case 'm':
            facade._doSend(data);
            break;
        case 'c':
            facade._doCleanup();
            facade = null;
            break;
        }
    };

    // alert('test ticker');
    // facade = new FacadeJS();
    // facade._transport = new FacadeJS['w-iframe-xhr-polling'](facade, 'http://mmajkowski.eng.vmware.com:9999/ticker/12/basd');

    utils.attachMessage(onMessage);

    // Start
    postMessage('s');
};
//         [*] End of lib/trans-iframe-within.js


//         [*] Including lib/trans-iframe-eventsource.js
var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {
    var that = this;
    that.protocol = 'w-iframe-eventsource';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
EventSourceIframeTransport.prototype = new IframeTransport();

EventSourceIframeTransport.enabled = function () {
    return (typeof EventSource === 'function') && IframeTransport.enabled();
};


var EventSourceTransport = FacadeJS['w-iframe-eventsource'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    var url = trans_url + '/eventsource';
    var es = that.es = new EventSource(url);
    es.onmessage = function(e) {that.ri._didMessage(unescape(e.data));};
    es.onerror = function(e) {
        // EventSource reconnects automatically.
        es.close();
        that.ri._didClose(1001, "Socket closed.");
    };
    that.send_constructor(ajaxSender);
};

// Inheritnace
EventSourceTransport.prototype = new BufferedSender();

EventSourceTransport.prototype.doCleanup = function() {
    var that = this;
    var es = that.es;
    es.onmessage = es.onerror = null;
    es.close();
    that.send_destructor();
    that.es = that.ri = null;
};
//         [*] End of lib/trans-iframe-eventsource.js


//         [*] Including lib/trans-iframe-xhr-polling.js
var XhrPollingIframeTransport = SockJS['iframe-xhr-polling'] = function () {
    var that = this;
    that.protocol = 'w-iframe-xhr-polling';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
XhrPollingIframeTransport.prototype = new IframeTransport();

XhrPollingIframeTransport.enabled = function () {
    return window.XMLHttpRequest && IframeTransport.enabled();
};


// Exactly the same as xhr-polling, but with different `enabled`
var XhrPollingITransport = FacadeJS['w-iframe-xhr-polling'] = function () {
    XhrTransport.apply(this, arguments);
};

// Inheritnace
XhrPollingITransport.prototype = new BufferedSender();
XhrPollingITransport.prototype._schedule_recv =
    XhrTransport.prototype._schedule_recv;
XhrPollingITransport.prototype.doCleanup =
    XhrTransport.prototype.doCleanup;
//         [*] End of lib/trans-iframe-xhr-polling.js

                  return SockJS;
          })();
if ('_sockjs_onload' in window) setTimeout(_sockjs_onload, 1);
//     [*] End of lib/index.js

// [*] End of lib/all.js

