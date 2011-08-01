// Requires CORS-enabled browser.

var XhrTransport = SockJS.xhrpolling = function(ri, trans_url){
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(ajaxSender);
    that._schedule_recv();
};

XhrTransport.prototype = new BufferedSender();

XhrTransport.prototype._schedule_recv = function() {
    var that = this;
    var callback = function (xhr, abort_reason) {
        that._recv_stop = null;
        if (abort_reason) return;
        if (xhr.status === 200) {
            var data = xhr.responseText;
            if (data) {
                // no data - heartbeat;
                if (!that._is_closing) {
                    that.ri._didMessage(data);
                }
            }
            // The message can be a close message, and change is_closing state.
            if (!that._is_closing) {
                that._schedule_recv();
            }
        } else {
            that.ri._didClose(1006, "XHR error");
        }
    };
    that._recv_stop = xhrPoll(that.trans_url + '/xhr', callback);
};

XhrTransport.prototype.doCleanup = function() {
    var that = this;
    that._is_closing = true;
    if (that._recv_stop) {
        that._recv_stop();
    }
    that.ri = that._recv_stop = null;
    that.send_destructor();
};

var xhrPoll = function(url, user_callback) {
    var orsc = function (xhr, e, abort_reason) {
        if (xhr.readyState === 4 || abort_reason) {
            user_callback(xhr, abort_reason);
        }
    };
    // Using POST can save us from caching issues.
    return utils.createXHR('POST', url, null, orsc);
};

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
XhrTransport.enabled = function() {
    if (!('XMLHttpRequest' in window)) return false;
    return ('withCredentials' in new XMLHttpRequest());
};

