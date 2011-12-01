var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {
    var that = this;
    that.protocol = 'w-iframe-eventsource';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
EventSourceIframeTransport.prototype = new IframeTransport();

EventSourceIframeTransport.enabled = function () {
    return ('EventSource' in window) && IframeTransport.enabled();
};

EventSourceIframeTransport.need_chunking = true;
EventSourceIframeTransport.need_body = true;


var EventSourceTransport = FacadeJS['w-iframe-eventsource'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);
    that.poll = new Polling(ri, EventSourceReceiver, trans_url + '/eventsource');
};

// Inheritnace
EventSourceTransport.prototype = new BufferedSender();

EventSourceTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};
