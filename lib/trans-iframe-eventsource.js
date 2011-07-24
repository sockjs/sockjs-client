var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {
    var that = this;
    that.protocol = 'w-iframe-eventsource';
    that.i_constructor.apply(this, arguments);
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
    es.onopen = function(e){that.ri._didOpen();};
    es.onmessage = function(e){that.ri._didMessage(unescape(e.data.slice(1)));};
    es.onerror = function(e){
        // EventSource reconnects automatically.
        that.cleanup();
        that.ri._didClose(1001, "Socket closed.");
    };
    that.send_constructor(jsonPGenericSender);
};
// Inheritnace
EventSourceTransport.prototype = new BufferedSender();

EventSourceTransport.prototype.cleanup = function() {
    this.es.onopen = this.es.onmessage = this.es.onerror = null;
    this.es.close();
    this.es = null;
};

EventSourceTransport.prototype.doClose = function(data) {
    var that = this;
    that.cleanup();
    // Send didClose out of band.
    setTimeout(function(){that.ri._didClose(1001, "Socket closed.");}, 0);
};


