// Requires CORS-enabled browser.

var XhrTransport = SockJS['xhr-polling'] = function(ri, trans_url) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(xdrSender);
    that._schedule_recv();
};

XhrTransport.prototype = new BufferedSender();

XhrTransport.prototype._schedule_recv = function() {
    var that = this;
    var message_callback = function (xhr, messages) {
        if (xhr.status === 200) {
            for(var i=0; i < messages.length; i++)
                that.ri._didMessage(messages[i]);
            if (messages.length === 1 && messages[0] === 'o') {
                that._streaming = true;
                utils.log('Upgrading from "xhr-polling" to "xhr-streaming"');
            }
        }
    };
    var end_callback = function (xhr, abort_reason) {
        that._recv_stop = null;
        if (abort_reason) return;
        if (xhr.status === 200) {
            if (!that._is_closing) {
                that._schedule_recv();
            }
        } else {
            that.ri._didClose(1006, "XHR error (" + xhr.status + ")");
        }
    };
    var postfix = that._streaming ? '/xhr_streaming' : '/xhr';
    that._recv_stop = xhrPoll(that.trans_url + postfix, message_callback, end_callback);
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

var xhrPoll = function(url, message_callback, end_callback) {
    var buf_pos = 0;
    var orsc = function (xhr, e, abort_reason) {
        if ((xhr.readyState === 3 || xhr.readyState === 4) && xhr.responseText) {
            // utils.log('responseText=', escape(xhr.responseText), 'buf_pos=',buf_pos);
            var msgs = [];
            while (1) {
                var buf = xhr.responseText.slice(buf_pos);
                var p = buf.indexOf('\n');
                if (p === -1) break;
                buf_pos += p+1;
                msgs.push( buf.slice(0, p) );
            }
            if (msgs.length)
                message_callback(xhr, msgs);
        }
        if (xhr.readyState === 4 || abort_reason) {
            end_callback(xhr, abort_reason);
        }
    };
    // Using POST can save us from caching issues.
    var fun = window.XDomainRequest ? utils.createXDR : utils.createXHR;
    return fun('POST', url, null, orsc);
};


// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
XhrTransport.enabled = function() {
    if (window.XDomainRequest) return true;
    if (window.XMLHttpRequest &&
        'withCredentials' in new XMLHttpRequest()) return true;
    return false;
};

