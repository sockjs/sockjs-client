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

var xhrDefaultHeaders = {
   // "User-Agent": '',
   // "Accept-Encoding": '',
   // "Accept-Charset": '',
   // "Connection": "keep-alive",
   // "Keep-Alive": '',
    "Accept": '',
    "Accept-Language": '',
    "Content-Type": "T"
};

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

    // Try to clear some headers, in order to save bandwidth.
    // See http://blog.mibbit.com/?p=143
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
