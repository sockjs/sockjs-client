var HtmlFileIframeTransport = SockJS['iframe-htmlfile'] = function () {
    var that = this;
    that.protocol = 'w-iframe-htmlfile';
    that.i_constructor.apply(that, arguments);
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
    that.is_loaded = false;
    var callback = function(data) {
        if (!that.is_loaded) {
            that.is_loaded = true;
            that.iframeObj.loaded();
        }
        that.ri._didMessage(data);
    };
    _window[WPrefix][that.id] = callback;

    that.iframeObj = utils.createIframe(iframe_url, function(e) {
                                            that.doCleanup();
                                            that.ri._didClose(1001, "Can't load htmlfile iframe (" + e + ")");
                                        });
};
// Inheritnace
HtmlFileTransport.prototype = new BufferedSender();

HtmlFileTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.iframeObj) {
        that.iframeObj.cleanup();
        delete _window[WPrefix][that.id];
    }
    that.send_destructor();
};
