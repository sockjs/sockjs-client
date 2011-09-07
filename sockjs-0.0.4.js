// SockJS client, version 0.0.4, MIT License
//     https://github.com/majek/sockjs-client

// JSON2 by Douglas Crockford (minified).
var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()


//     [*] Including lib/index.js
// Public object
SockJS = (function(){
              var _document = document;
              var _window = window;

//         [*] Including lib/reventtarget.js
var REventTarget = function() {};
REventTarget.prototype.addEventListener = function (eventType, listener) {
    if(!this._listeners) {
         this._listeners = {};
    }
    if(!(eventType in this._listeners)) {
        this._listeners[eventType] = [];
    }
    this._listeners[eventType].push(listener);
    return true;
};
REventTarget.prototype.removeEventListener = function (eventType, listener) {
    if(!(this._listeners && (eventType in this._listeners))) {
        return false;
    }
    var arr = this._listeners[eventType];
    var idx = utils.arrIndexOf(arr, listener);
    if (idx !== -1) {
        if(arr.length > 1) {
            this._listeners[eventType] = arr.slice(0, idx).concat( arr.slice(idx+1) );
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
    if (this['on'+t]) {
        this['on'+t].apply(this, args);
    }
    if (this._listeners && t in this._listeners) {
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
    if ('withCredentials' in xhr) {
        // Set cookies on CORS, please.
        xhr.withCredentials = "true";
    }

    var cleanup = function() {
        // IE needs this field to be a function
        if (xhr) {
            try{
                xhr.onreadystatechange = null;
            } catch (x) {
                xhr.onreadystatechange = function(){};
            }
            // Explorer tends to keep connection open, even after the
            // tab gets closed: http://bugs.jquery.com/ticket/5280
            try {
                xhr.abort();
            } catch(e) {};
            utils.detachEvent('unload', cleanup);
        }
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
    utils.attachEvent('unload', cleanup);
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
            utils.detachEvent('unload', cleanup);
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
    utils.attachEvent('unload', cleanup);
    return {
        iframe: iframe,
        cleanup: cleanup,
        loaded: unattach
    };
};

utils.createHtmlfile = function (iframe_url, error_callback) {
    var doc = new ActiveXObject('htmlfile');
    var tref;
    var iframe;
    var unattach = function() {
        clearTimeout(tref);
    };
    var cleanup = function() {
        if (doc) {
            unattach();
            utils.detachEvent('unload', cleanup);
            try {
                iframe.src = "about:blank";
            } catch (x) {}
            iframe.parentNode.removeChild(iframe);
            iframe = doc = null;
            CollectGarbage();
        }
    };
    var onerror = function(r)  {
        if (doc) {
            cleanup();
            error_callback(r);
        }
    };

    doc.open();
    doc.write('<html><script>' +
              'document.domain="' + document.domain + '";' +
              '</script></html>');
    doc.close();
    doc.parentWindow[WPrefix] = _window[WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframe_url;
    tref = setTimeout(function(){onerror('timeout');}, 5000);
    utils.attachEvent('unload', cleanup);
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

utils.amendUrl = function(url) {
    var dl = _document.location;
    //  '//abc' --> 'http://abc'
    if (url.indexOf('//') === 0) {
        url = dl.protocol + url;
    }
    // '/abc' --> 'http://localhost:80/abc'
    if (url.indexOf('/') === 0) {
        url = dl.protocol + '//' + dl.host + url;
    }
    return url;
};

// IE doesn't support [].indexOf.
utils.arrIndexOf = function(arr, obj){
	for(var i=0; i < arr.length; i++){
		if(arr[i] === obj){
			return i;
		}
	}
    return -1;
};

utils.delay = function(t, fun) {
    if(typeof t === 'function') {
        fun = t;
        t = 0;
    }
    setTimeout(fun, t);
};
//         [*] End of lib/utils.js


//         [*] Including lib/sockjs.js
var SockJS = function(url, protocols, options) {
    var that = this;
    that._options = {devel: false, debug: false, chunking: undefined};
    if (options) {
        utils.objectExtend(that._options, options);
    }
    that._base_url = utils.amendUrl(url);
    that._server = that._options.server || utils.random_number_string(1000);
    that._connid = utils.random_string(8);
    that._trans_url = that._base_url + '/' + that._server + '/' + that._connid;
    that._protocols = ['websocket',
                       'xhr-streaming',
                       'iframe-eventsource',
                       'iframe-htmlfile',
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

SockJS.version = "0.0.4";

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
    if (that.protocol) {
        that._debug('Closed transport:', that.protocol, ''+close_event);
        that.protocol = null;
    }

    while(1) {
        var protocol = that.protocol = that._protocols.shift();
        if (!protocol) {
            return false;
        }
        // Some protocols require chunking, we may need to run the
        // test beforehand.
        if (SockJS[protocol] &&
              SockJS[protocol].need_chunking === true &&
              that._options.chunking === undefined) {
            that._protocols.unshift(protocol);
            that.protocol = 'chunking-test';
            // Assert false, in case test timeouts.
            that._options.chunking = false;
            chunkingTest(that._base_url, function(chunking) {
                             that._options.chunking = chunking;
                             that._try_next_protocol();
                         }, that._options);
            return true;
        }

        if (!SockJS[protocol] ||
              (SockJS[protocol].need_chunking === true &&
                   that._options.chunking !== true) ||
              !SockJS[protocol].enabled(that._options)) {
            that._debug('Skipping transport:', protocol);
        } else {
            that._debug('Opening transport:', protocol);
            that._transport = new SockJS[protocol](that, that._trans_url,
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
    return !!(window.WebSocket || window.MozWebSocket);
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


//         [*] Including lib/trans-xhr-streaming.js
var XhrStreamingTransport = SockJS['xhr-streaming'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xdrSender);
    that.poll = new Polling(ri, XhrReceiver,
                            trans_url + '/xhr_streaming',
                            {cors: true});
};

// Inheritnace
XhrStreamingTransport.prototype = new BufferedSender();

XhrStreamingTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
XhrStreamingTransport.enabled = function(options) {
    if (options.cookie !== true && window.XDomainRequest) return true;
    if (window.XMLHttpRequest &&
        'withCredentials' in new XMLHttpRequest()) return true;
    return false;
};

XhrStreamingTransport.need_chunking = true;
//         [*] End of lib/trans-xhr-streaming.js


//         [*] Including lib/trans-xhr-polling.js
var XhrPollingTransport = SockJS['xhr-polling'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xdrSender);
    that.poll = new Polling(ri, XhrReceiver, trans_url + '/xhr', {cors: true});
};

// Inheritnace
XhrPollingTransport.prototype = new BufferedSender();

XhrPollingTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};

XhrPollingTransport.enabled = XhrStreamingTransport.enabled;
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
    that.base_url = base_url;
    that.trans_url = trans_url;

    var iframe_url = base_url + '/iframe.html';
    if (that.ri._options.devel) {
        iframe_url += '?t=' + (+new Date);
    }
    that.window_id = utils.random_string(8);
    iframe_url += '#' + that.window_id;

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
        that.iframeObj.cleanup();
        that.iframeObj = null;
        that.onmessage_cb = that.iframeObj = null;
    }
};

IframeTransport.prototype.onmessage = function(e) {
    var that = this;
    if (e.origin !== that.origin) return;
    var window_id = e.data.slice(0, 8);
    var type = e.data.slice(8, 9);
    var data = e.data.slice(9);

    if (window_id !== that.window_id) return;

    switch(type) {
    case 's':
        that.iframeObj.loaded();
        that.postMessage('s', JSON.stringify([SockJS.version, that.protocol, that.trans_url, that.base_url]));
        break;
    case 't':
        that.ri._didMessage(data);
        break;
    }
};

IframeTransport.prototype.postMessage = function(type, data) {
    var that = this;
    that.iframeObj.iframe.contentWindow.postMessage(that.window_id + type + (data || ''), that.origin);
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
var curr_window_id;

var postMessage = function (type, data) {
    if(parent !== _window) {
        parent.postMessage(curr_window_id + type + (data || ''), '*');
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
    curr_window_id = _document.location.hash.slice(1);
    var onMessage = function(e) {
        if(e.source !== parent) return;
        var window_id = e.data.slice(0, 8);
        var type = e.data.slice(8, 9);
        var data = e.data.slice(9);
        if (window_id !== curr_window_id) return;
        switch(type) {
        case 's':
            var p = JSON.parse(data);
            var version = p[0];
            var protocol = p[1];
            var trans_url = p[2];
            var base_url = p[3];
            if (version !== SockJS.version) {
                utils.log("Incompatibile SockJS! Main site uses:" +
                          " \"" + version + "\", the iframe:" +
                          " \"" + SockJS.version + "\".");
            }
            facade = new FacadeJS();
            facade._transport = new FacadeJS[protocol](facade, trans_url, base_url);
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


//         [*] Including lib/chunking-test.js
var doChunkingTest = function(base_url, callback, cors) {
    var recv = new XhrReceiver(base_url + '/chunking_test', {cors: cors});
    var result = 0;
    recv.onmessage = function(e) {
        // Now a cool hack: we can stop receiving after we got at least
        // one chunk, contains some data, but not everyting.
        var l = e.responsetext.split('h\n').length;
        if(e.readystate === 3 && l > 0 && l < 6 ) {
            result = l;
            recv.abort();
        }
    };
    recv.onclose = function(e) {
        recv = recv.onmessage = recv.onclose = null;
        utils.log('Chunking test: ' + (result ? 'passed' : 'failed')
                  + ' (' + result + ' chunk received)');
        callback(!!result);
    };
};

var ChunkingTestIframe = FacadeJS['w-iframe-chunking-test'] = function (ri, trans_url, base_url) {
    doChunkingTest(base_url, function(r) {
                       ri._didMessage('m'+r);
                       ri._didClose();
                   }, false);
};
ChunkingTestIframe.prototype.doCleanup = function() {};

var chunkingTestUncached = SockJS.chunkingTest = function(base_url, callback, options) {
    base_url = utils.amendUrl(base_url);
    // 1. CORS
    if (_window.XDomainRequest ||
         (_window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())) {
        doChunkingTest(base_url, callback, true);
        return;
    }
    // 2. Iframe
    if (IframeTransport.enabled()) {
        var ifr = new IframeTransport();
        ifr.protocol = 'w-iframe-chunking-test';
        var fun = function(r) {
            if (ifr) {
                callback(r === 'mtrue');
                ifr.doCleanup();
                ifr = null;
            }
        };
        var mock_ri = {
            _options: options || {},
            _didClose: fun,
            _didMessage: fun
        };
        ifr.i_constructor(mock_ri, '', base_url);
        return;
    }
    // 3. Fall back to polling (IE 7)
    setTimeout(function() {
                   callback(false);
               }, 0);
    return;
};

// Although chunking test is run against a particular 'base_url', it's
// safe to assume that if chunking works for client, it will work for
// any SockJS server. That means we can cache the result of
// chunkingTest, at least until user switches network. Let's assume a
// value of 10 seconds.
var chunkingTest = function() {
    var value;
    var t0 = 0;
    return function (base_url, callback) {
        var t1 = (new Date()).getTime();
        if (t1 - t0 > 10000) {
            chunkingTestUncached(base_url, function (v) {
                                     value = v;
                                     t0 = (new Date()).getTime();
                                     callback(value);
                                 });
        } else {
            setTimeout(function() {
                           callback(value);
                       }, 0);
        }
    };
}();
//         [*] End of lib/chunking-test.js


//         [*] Including lib/trans-iframe-eventsource.js
var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {
    var that = this;
    that.protocol = 'w-iframe-eventsource';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
EventSourceIframeTransport.prototype = new IframeTransport();

EventSourceIframeTransport.enabled = function () {
    return ('EventSource' in window) && IframeTransport.enabled();
};

EventSourceIframeTransport.need_chunking = true;


var EventSourceTransport = FacadeJS['w-iframe-eventsource'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);
    that.poll = new Polling(ri, EventSourceReceiver, trans_url + '/eventsource');
};

// Inheritnace
EventSourceTransport.prototype = new BufferedSender();

EventSourceTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
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


var XhrPollingITransport = FacadeJS['w-iframe-xhr-polling'] = function (ri, trans_url) {
    var that = this;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);
    that.poll = new Polling(ri, XhrReceiver, trans_url + '/xhr', {cors: false});
};


// Inheritnace
XhrPollingITransport.prototype = new BufferedSender();

XhrPollingITransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};
//         [*] End of lib/trans-iframe-xhr-polling.js


//         [*] Including lib/trans-iframe-htmlfile.js
// This transport generally works in any browser, but will cause a
// spinning cursor to appear in any browser other than IE.
// We may test this transport in all browsers - why not, but in
// production it should be only run in IE.

var HtmlFileIframeTransport = SockJS['iframe-htmlfile'] = function () {
    var that = this;
    that.protocol = 'w-iframe-htmlfile';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
HtmlFileIframeTransport.prototype = new IframeTransport();

HtmlFileIframeTransport.enabled = function (options) {
    // Development or IE  _and_  iframe postWindow working.
    var ie = isIeHtmlfileCapable();
    return (options.cookie !== false && IframeTransport.enabled());
};

HtmlFileIframeTransport.need_chunking = true;


var HtmlFileTransport = FacadeJS['w-iframe-htmlfile'] = function (ri, trans_url) {
    var that = this;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);
    that.poll = new Polling(ri, HtmlfileReceiver, trans_url + '/htmlfile');
};

// Inheritnace
HtmlFileTransport.prototype = new BufferedSender();

HtmlFileTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};
//         [*] End of lib/trans-iframe-htmlfile.js


//         [*] Including lib/trans-polling.js

var Polling = function(ri, Receiver, recv_url, opts) {
    var that = this;
    that.ri = ri;
    that.Receiver = Receiver;
    that.recv_url = recv_url;
    that.opts = opts;
    that._scheduleRecv();
};

Polling.prototype._scheduleRecv = function() {
    var that = this;
    var poll = that.poll = new that.Receiver(that.recv_url, that.opts);
    var msg_counter = 0;
    poll.onmessage = function(e) {
        msg_counter += 1;
        that.ri._didMessage(e.data);
    };
    poll.onclose = function(e) {
        that.poll = poll = poll.onmessage = poll.onclose = null;
        if (!that.poll_is_closing) {
            if (e.reason === 'permanent') {
                that.ri._didClose(1006, 'Polling error (' + e.reason + ')');
            } else {
                that._scheduleRecv();
            }
        }
    };
};

Polling.prototype.abort = function() {
    var that = this;
    that.poll_is_closing = true;
    if (that.poll) {
        that.poll.abort();
    }
};
//         [*] End of lib/trans-polling.js


//         [*] Including lib/trans-receiver-eventsource.js

var EventSourceReceiver = function(url) {
    var that = this;
    var es = new EventSource(url);
    es.onmessage = function(e) {
        that.dispatchEvent(new SimpleEvent('message',
                                           {'data': unescape(e.data)}));
    };
    that.es_close = es.onerror = function(e, abort_reason) {
        // ES on reconnection has readyState = 0 or 1.
        // on network error it's CLOSED = 2
        var reason = abort_reason ? 'user' :
            (es.readyState !== 2 ? 'network' : 'permanent');
        that.es_close = es.onmessage = es.onerror = null;
        // EventSource reconnects automatically.
        es.close();
        es = null;
        // Safari and chrome < 15 crash if we close window before
        // waiting for ES cleanup. See:
        //   https://code.google.com/p/chromium/issues/detail?id=89155
        utils.delay(200, function() {
                        that.dispatchEvent(new SimpleEvent('close', {reason: reason}));
                    });
    };
};

EventSourceReceiver.prototype = new REventTarget();

EventSourceReceiver.prototype.abort = function() {
    var that = this;
    if (that.es_close) {
        that.es_close({}, true);
    }
};
//         [*] End of lib/trans-receiver-eventsource.js


//         [*] Including lib/trans-receiver-htmlfile.js
var _is_ie_htmlfile_capable;
var isIeHtmlfileCapable = function() {
    if (_is_ie_htmlfile_capable === undefined) {
        if ('ActiveXObject' in window) {
            try {
                _is_ie_htmlfile_capable = !!new ActiveXObject('htmlfile');
            } catch (x) {}
        } else {
            _is_ie_htmlfile_capable = false;
        }
    }
    return _is_ie_htmlfile_capable;
};


var HtmlfileReceiver = function(url) {
    var that = this;
    utils.polluteGlobalNamespace();

    that.id = 'a' + utils.random_string(6, 26);
    url += ((url.indexOf('?') === -1) ? '?' : '&') +
        'c=' + escape(WPrefix + '.' + that.id);

    var constructor = isIeHtmlfileCapable() ?
        utils.createHtmlfile : utils.createIframe;

    var iframeObj;
    _window[WPrefix][that.id] = {
        start: function () {
            iframeObj.loaded();
        },
        message: function (data) {
            that.dispatchEvent(new SimpleEvent('message', {'data': data}));
        },
        stop: function () {
            that.iframe_close({}, 'network');
        }
    };
    that.iframe_close = function(e, abort_reason) {
        iframeObj.cleanup();
        that.iframe_close = iframeObj = null;
        delete _window[WPrefix][that.id];
        that.dispatchEvent(new SimpleEvent('close', {reason: abort_reason}));
    };
    iframeObj = constructor(url, function(e) {
                                that.iframe_close({}, 'permanent');
                            });
};

HtmlfileReceiver.prototype = new REventTarget();

HtmlfileReceiver.prototype.abort = function() {
    var that = this;
    if (that.iframe_close) {
        that.iframe_close({}, 'user');
    }
};
//         [*] End of lib/trans-receiver-htmlfile.js


//         [*] Including lib/trans-receiver-xhr.js

var XhrReceiver = function(url, opts) {
    var that = this;
    var buf_pos = 0;
    var orsc = function (xhr, e, abort_reason) {
        if (xhr.readyState === 3 || xhr.readyState === 4) {
            // IE doesn't like peeking into responseText or status on
            // XHR and readystate=3
            try {
                var responseText = xhr.responseText;
                var status = xhr.status;
            } catch (x) {}
            if (responseText && status === 200) {
                var msgs = [];
                while (1) {
                    var buf = responseText.slice(buf_pos);
                    var p = buf.indexOf('\n');
                    if (p === -1) break;
                    buf_pos += p+1;
                    var msg = buf.slice(0, p);
                    that.dispatchEvent(
                        new SimpleEvent('message', {
                                            data: msg,
                                            readystate: xhr.readyState,
                                            responsetext: responseText
                                        }));
                }
            }
        }
        if (xhr.readyState === 4 || abort_reason) {
            var reason = abort_reason ? 'user' :
                (xhr.status === 200 ? 'network' : 'permanent');
            that.xhr_close = null;
            that.dispatchEvent(new SimpleEvent('close', {reason: reason}));
        }
    };
    var createXhr = (opts.cors && _window.XDomainRequest) ?
                                    utils.createXDR : utils.createXHR;
    that.xhr_close = createXhr('POST', url, null, orsc);
};

XhrReceiver.prototype = new REventTarget();

XhrReceiver.prototype.abort = function() {
    var that = this;
    if (that.xhr_close) {
        that.xhr_close(true);
    }
};
//         [*] End of lib/trans-receiver-xhr.js

                  return SockJS;
          })();
if ('_sockjs_onload' in window) setTimeout(_sockjs_onload, 1);
//     [*] End of lib/index.js

// [*] End of lib/all.js

