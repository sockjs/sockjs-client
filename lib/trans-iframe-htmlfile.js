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
    return (options.devel || ie) && IframeTransport.enabled();
};


var HtmlFileTransport = FacadeJS['w-iframe-htmlfile'] = function (ri, trans_url) {
    utils.polluteGlobalNamespace();

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
