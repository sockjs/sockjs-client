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

utils.dettachMessage = function(listener) {
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

// Stolen from: https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L195
var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
var stringQuote = utils.stringQuote = function(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
};

// Qutote an array of strings
utils.stringsQuote = function(strings){
    var d = [];
    for(var i=0; i < strings.length; i++) {
        d.push(stringQuote(strings[i]));
    }
    return '[' + d.join(',') + ']';
};
