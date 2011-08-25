var XhrPollingTransport = SockJS['xhr-polling'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xdrSender);
    that.poll = new Polling(ri, XhrReceiver, trans_url + '/xhr', {cors: true});
};

// Inheritnace
XhrPollingTransport.prototype = new BufferedSender();

XhrPollingTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};

XhrPollingTransport.enabled = XhrStreamingTransport.enabled;

