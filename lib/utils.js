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
        onerror = xdr.onerror = xdr.ontimeout = xdr.onprogress =
            xdr.onload = null;
        try {
            xdr.abort();
        } catch (x) {}
        xdr = callback = null;
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
