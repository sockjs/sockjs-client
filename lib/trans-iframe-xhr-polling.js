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


// Exactly the same as xhr-polling, but with different `enabled`
var XhrPollingITransport = FacadeJS['w-iframe-xhr-polling'] = function () {
    XhrTransport.apply(this, arguments);
};

// Inheritnace
XhrPollingITransport.prototype = new BufferedSender();
XhrPollingITransport.prototype._schedule_recv =
    XhrTransport.prototype._schedule_recv;
XhrPollingITransport.prototype.doCleanup =
    XhrTransport.prototype.doCleanup;

