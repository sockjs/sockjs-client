var XhrPollingIframeTransport = SockJS['iframe-xhr-polling'] = function () {
    var that = this;
    that.protocol = 'w-iframe-xhr-polling';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
XhrPollingIframeTransport.prototype = new IframeTransport();

XhrPollingIframeTransport.enabled = function () {
    return window.XMLHttpRequest && IframeTransport.enabled();
};

XhrPollingIframeTransport.need_body = true;


var XhrPollingITransport = FacadeJS['w-iframe-xhr-polling'] = function (ri, trans_url) {
    var that = this;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);
    that.poll = new Polling(ri, XhrReceiver, trans_url + '/xhr', {cors: false});
};


// Inheritnace
XhrPollingITransport.prototype = new BufferedSender();

XhrPollingITransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};
