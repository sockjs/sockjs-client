var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {
    var that = this;
    that.protocol = 'w-iframe-eventsource';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
EventSourceIframeTransport.prototype = new IframeTransport();

EventSourceIframeTransport.enabled = function () {
    return (typeof EventSource === 'function') && IframeTransport.enabled();
};


var EventSourceTransport = FacadeJS['w-iframe-eventsource'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    var url = trans_url + '/eventsource';
    var es = that.es = new EventSource(url);
    es.onmessage = function(e) {that.ri._didMessage(unescape(e.data));};
    es.onerror = function(e) {
        // EventSource reconnects automatically by default.
        that.cleanup();
        that.ri._didClose(1001, "Socket closed.");
    };
    that.send_constructor(ajaxSender);
};
// Inheritnace
EventSourceTransport.prototype = new BufferedSender();

EventSourceTransport.prototype.cleanup = function() {
    var that = this;
    var es = that.es;
    es.onmessage = es.onerror = null;
    es.close();
    that.es = null;
};

EventSourceTransport.prototype.doClose = function(data) {
    var that = this;
    that.cleanup();
    // Send didClose out of band.
    setTimeout(function(){that.ri._didClose(1001, "Socket closed.");}, 0);
};


