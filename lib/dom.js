// May be used by htmlfile jsonp and transports.
var MPrefix = '_sockjs_global';
utils.createHook = function() {
    var window_id = 'a' + utils.random_string(8);
    if (!(MPrefix in _window)) {
        var map = {};
        _window[MPrefix] = function(window_id) {
            if (!(window_id in map)) {
                map[window_id] = {
                    id: window_id,
                    del: function() {delete map[window_id];}
                };
            }
            return map[window_id];
        }
    }
    return _window[MPrefix](window_id);
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

// Try to clear some headers, in order to save bandwidth. For
// reference see:
//   http://blog.mibbit.com/?p=143
//   http://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy_for_XMLHttpRequest
var xhrDefaultHeaders = {
    "User-Agent": '',
    "Accept": '',
    "Accept-Language": '',
    "Content-Type": "text/plain;charset=UTF-8"
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
        utils.delay(onerror);
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
        if (xhr) {
            // IE needs this field to be a function
            try {
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
            // This is required, in order to force ie7 to fire the
            // onunload event. Setting .src must happen before the
            // removeChild step.
            iframe.src = "about:blank";
            // This timeout makes chrome fire onbeforeunload event
            // within iframe. Without the timeout it goes straight to
            // onunload.
            setTimeout(function() {
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }, 10);
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
