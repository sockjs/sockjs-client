var XhrStreamingTransport = SockJS['xhr-streaming'] = function (ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xdrSender);
    that.poll = new Polling(ri, XhrReceiver,
                            trans_url + '/xhr_streaming',
                            {cors: true});
};

// Inheritnace
XhrStreamingTransport.prototype = new BufferedSender();

XhrStreamingTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
XhrStreamingTransport.enabled = function(options) {
    if (!options.cookie && window.XDomainRequest) return true;
    if (window.XMLHttpRequest &&
        'withCredentials' in new XMLHttpRequest()) return true;
    return false;
};

XhrStreamingTransport.need_chunking = true;

