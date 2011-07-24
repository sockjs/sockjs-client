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

    var iframe_url = base_url + '/iframe-' + SockJS.version + '.html';

    var iframe = that.iframe = _document.createElement('iframe');
    iframe.src = iframe_url;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
        that.cleanup();
        that.ri._didClose(1001, "Can't load iframe");
    };
    iframe.onload = function() {
        // `onload` is triggered before scripts on the iframe are
        // executed. Give it few seconds to actually load stuff.
        setTimeout(function() {
                       if (that.iframe && that.iframe.onerror) that.iframe.onerror();
                   }, 5000);
    };
    that.onmessage_cb = function(e){that.onmessage(e);};
    utils.attachMessage(that.onmessage_cb);
    _document.body.appendChild(iframe);
};

IframeTransport.prototype.cleanup = function() {
    var that = this;
    if (that.iframe) {
        that.iframe.onload = that.iframe.onerror = null;
        that.iframe.parentNode.removeChild(that.iframe);
        utils.detachMessage(that.onmessage_cb);
        that.onmessage_cb  = that.iframe = undefined;
    }
};

IframeTransport.prototype.onmessage = function(e) {
    var that = this;
    if (e.origin !== that.origin ||
        e.source !== that.iframe.contentWindow) return;
    var type = e.data.slice(0, 1);
    var msg = JSON.parse(e.data.slice(1));
    switch(type) {
    case 'x':
        that.iframe.onload = that.iframe.onerror = null;
        break;
    case 's':
        that.iframe.onload = that.iframe.onerror = null;
        that.postMessage('s', [SockJS.version, that.protocol, that.trans_url]);
        break;
    case 'o':
        that.ri._didOpen();
        break;
    case 'm':
        that.ri._didMessage(msg[0]);
        break;
    case 'c':
        that.cleanup();
        that.ri._didClose(Number(msg[0]), msg[1]);
        break;
    }
};

IframeTransport.prototype.postMessage = function(type, messages) {
    var that = this;
    var msg = JSON.stringify(messages);
    that.iframe.contentWindow.postMessage(type + msg, that.origin);
};

IframeTransport.prototype.doSend = function (message) {
    this.postMessage('m', [message]);
};
IframeTransport.prototype.doClose = function () {
    this.postMessage('c', []);
};

IframeTransport.enabled = function() {
    return (typeof _window.postMessage === 'function');
};
