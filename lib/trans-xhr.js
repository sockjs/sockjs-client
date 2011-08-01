

var XhrTransport = SockJS.xhrpolling = function(ri, trans_url){
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xhrSender);
    that._schedule_recv();
};

XhrTransport.prototype = new BufferedSender();

XhrTransport.prototype._schedule_recv = function() {
    var that = this;
};


// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
XhrTransport.enabled = function() {
    if ('XMLHttpRequest' in window) return false;
    return ('withCredentials' in new XMLHttpRequest());
};