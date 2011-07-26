var utils = {};
utils.random_string = function(letters, max) {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    if (typeof max === 'undefined') {
        max = chars.length;
    }
    var i, ret = [];
    for(i=0; i<letters;i++) {
        ret.push( chars[Math.floor(Math.random() * max)] );
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
    if (typeof _window.addEventListener !== 'undefined') {
        _window.addEventListener("message", listener, false);
    } else {
        // IE quirks.
        // According to: http://stevesouders.com/misc/test-postmessage.php
        // the message gets delivered only to 'document', not 'window'.
	    _document.attachEvent("onmessage", listener);
        // I get 'window' for ie8.
	    _window.attachEvent("onmessage", listener);
    }
};

utils.detachMessage = function(listener) {
    if (typeof _window.addEventListener !== 'undefined') {
        _window.removeEventListener("message", listener, false);
    } else {
        _document.detachEvent("onmessage", listener);
	    _window.detachEvent("onmessage", listener);
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

utils.createXHR = function(method, url, payload, callback) {
    var xhr;
    if (_window.ActiveXObject) {
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
    xhr.onreadystatechange = function (e) {
        if(xhr){
            callback(xhr, e);
            if (xhr.readyState === 4) {
                // explorer needs this field to be function
                try{
                    xhr.onreadystatechange = undefined;
                } catch (x) {
                    xhr.onreadystatechange = function(){};
                }
                // Explorer tends to keep connection open, even after the
                // tab is closed: http://bugs.jquery.com/ticket/5280
                try {
                    xhr.abort();
                } catch(e) {};
                xhr = null;
            }
        }
    };
    xhr.send(payload);
    return xhr;
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
            iframe = null;
        }
    };
    var onerror = function() {
        if (iframe) {
            cleanup();
            error_callback();
        }
    };
    iframe.src = iframe_url;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = onerror;
    iframe.onload = function() {
        // `onload` is triggered before scripts on the iframe are
        // executed. Give it few seconds to actually load stuff.
        clearTimeout(tref);
        tref = setTimeout(onerror, 2000);
    };
    _document.body.appendChild(iframe);
    tref = setTimeout(onerror, 5000);
    return {
        iframe: iframe,
        cleanup: cleanup,
        loaded: unattach
    };
};
