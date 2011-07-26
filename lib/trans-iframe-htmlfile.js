var HtmlFileIframeTransport = SockJS['iframe-htmlfile'] = function () {
    var that = this;
    that.protocol = 'w-iframe-htmlfile';
    that.i_constructor.apply(this, arguments);
};
// Inheritance.
HtmlFileIframeTransport.prototype = new IframeTransport();
HtmlFileIframeTransport.enabled = function () {
    return true && IframeTransport.enabled();
};


var HtmlFileTransport = FacadeJS['w-iframe-htmlfile'] = function (ri, trans_url) {
    utils.polluteGlobalNamespace();

    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);

    that.id = 'a' + utils.random_string(6, 26);
    var iframe_url = trans_url + '/htmlfile?c=' + escape(WPrefix + '.' + that.id);
    var callback = function(e, t) {
        // alert('cb' + e + ' ' + t);
        // if (window.console)
        //     console.log('cb', e, t, typeof t);
        switch(t) {
        case 'open':
            // should get a proper messsage from now on.
            that.iframeObj.loaded();
            that.ri._didOpen();
            break;
        case 'close':
            that.cleanup();
            if (e) {
                that.ri._didClose(e.status, e.reason);
            } else {
                that.ri._didClose(1001, "Server closed iframe");
            }
            break;
        }
        if (typeof t === 'undefined') {
            that.ri._didMessage(e);
        }
    };
    _window[WPrefix][that.id] = callback;

    that.iframeObj = utils.createIframe(iframe_url, function() {
                                            that.cleanup();
                                            that.ri._didClose(1001, "Can't load iframe");
                                        });
};
// Inheritnace
HtmlFileTransport.prototype = new BufferedSender();

HtmlFileTransport.prototype.cleanup = function() {
    var that = this;
    if (that.iframeObj) {
        that.iframeObj.cleanup();
        delete _window[WPrefix][that.id];
    }
};

HtmlFileTransport.prototype.doClose = function(data) {
    var that = this;
    that.cleanup();
    // Send didClose out of band.
    setTimeout(function(){that.ri._didClose(1001, "Socket closed.");}, 0);
};


