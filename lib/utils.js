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
    }
};

utils.detachMessage = function(listener) {
    if (typeof _window.addEventListener !== 'undefined') {
        _window.removeEventListener("message", listener, false);
    } else {
	    _document.removeEvent("onmessage", listener);
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
