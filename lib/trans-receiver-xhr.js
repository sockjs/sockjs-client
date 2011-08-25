
var XhrCorsReceiver = function(url) {
    var that = this;
    var buf_pos = 0;
    var orsc = function (xhr, e, abort_reason) {
        if ((xhr.readyState === 3 || xhr.readyState === 4) &&
            xhr.responseText && xhr.status === 200) {
            var msgs = [];
            while (1) {
                var buf = xhr.responseText.slice(buf_pos);
                var p = buf.indexOf('\n');
                if (p === -1) break;
                buf_pos += p+1;
                var msg = buf.slice(0, p);
                that.dispatchEvent(new SimpleEvent('message', {'data': msg}));
            }
        }
        if (xhr.readyState === 4 || abort_reason) {
            var reason = abort_reason ? 'user' :
                (xhr.status === 200 ? 'network' : 'permanent');
            that.xhr_close = null;
            that.dispatchEvent(new SimpleEvent('close', {reason: reason}));
        }
    };
    var corsXhr = window.XDomainRequest ? utils.createXDR : utils.createXHR;
    that.xhr_close = corsXhr('POST', url, null, orsc);
};

XhrCorsReceiver.prototype = new REventTarget();

XhrCorsReceiver.prototype.abort = function() {
    var that = this;
    if (that.xhr_close) {
        that.xhr_close(true);
    }
};
