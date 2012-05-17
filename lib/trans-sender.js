/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var init_max_window_size = 4096;

var BufferedSender = function() {};
BufferedSender.prototype.send_constructor = function(sender) {
    var that = this;
    that.send_buffer = [];
    that.sender = sender;
    // Start with a limit of 4 KiB and 4.5 sec for a single send request.
    that.max_window_size = init_max_window_size;
    that.max_window_time = 4500;
};
BufferedSender.prototype.doSend = function(message) {
    var that = this;
    if (message.length > 0) {
        that.send_buffer.push(message);
    }

    if (that.send_stop && message.length == 0) {
        that.ri._debug('Attempting to send a heartbeat, but sending previous messages is still in progress.');
    }

    if (!that.send_stop) {
        that.send_schedule();
    }

};

BufferedSender.prototype.adjustWindow = function(td, full_window) {
    if (td > that.max_window_time) {
        // Over time, reduce window
        that.max_window_time = Math.max(that.max_window_size / 2,
                                        init_max_window_size);
        return true;
    } else {
        if (full_window) {
            if (td*2 < that.max_window_time) {
                // A lot time left
                that.max_window_size *= 2;
            } else {
                // Not so much time left...
                that.max_window_size *= 1.1;
            }
            return true;
        }
    }
}

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.send_schedule_wait = function() {
    var that = this;
    var tref;
    that.send_stop = function() {
        that.send_stop = null;
        clearTimeout(tref);
    };
    tref = utils.delay(25, function() {
        that.send_stop = null;
        if (that.send_buffer.length > 0) {
            that.send_schedule();
        }
    });
};

BufferedSender.prototype.send_schedule = function() {
    var that = this;
    var t0 = +new Date();
    var i, serialized = 2, full_window = false;
    for (i=0; i < that.send_buffer.length; i++) {
        serialized += that.send_buffer[i].length + 1;
        if (serialized > that.max_window_size) {
            full_window = true;
            break;
        }
    }
    // Splice removes messages from the array.
    var messages = that.send_buffer.splice(0, i);

    var payload = '[' +  messages.join(',') + ']';
    that.send_stop = that.sender(that.trans_url, payload, function(success, abort_reason) {
        that.send_stop = null;
        if (success === false) {
            that.ri._didClose(1006, 'Sending error ' + abort_reason);
        } else {
            var td = (+new Date()) - t0;
            that.ri._debug('Sent ' + serialized + ' in ' + td + ' ms');
            if (that.adjustWindow(td, full_window)) {
                that.ri._debug('max_window_size adjusted: ' + that.max_window_size);
            }
            that.send_schedule_wait();
        }
    });
};

BufferedSender.prototype.send_destructor = function() {
    var that = this;
    if (that._send_stop) {
        that._send_stop();
    }
    that._send_stop = null;
};

var jsonPGenericSender = function(url, payload, callback) {
    var that = this;

    if (!('_send_form' in that)) {
        var form = that._send_form = _document.createElement('form');
        var area = that._send_area = _document.createElement('textarea');
        area.name = 'd';
        form.style.display = 'none';
        form.style.position = 'absolute';
        form.method = 'POST';
        form.enctype = 'application/x-www-form-urlencoded';
        form.acceptCharset = "UTF-8";
        form.appendChild(area);
        _document.body.appendChild(form);
    }
    var form = that._send_form;
    var area = that._send_area;
    var id = 'a' + utils.random_string(8);
    form.target = id;
    form.action = url + '/jsonp_send?i=' + id;

    var iframe;
    try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        iframe = _document.createElement('<iframe name="'+ id +'">');
    } catch(x) {
        iframe = _document.createElement('iframe');
        iframe.name = id;
    }
    iframe.id = id;
    form.appendChild(iframe);
    iframe.style.display = 'none';

    try {
        area.value = payload;
    } catch(e) {
        utils.log('Your browser is seriously broken. Go home! ' + e.message);
    }
    form.submit();

    var completed = function(e) {
        if (!iframe.onerror) return;
        iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
        // Opera mini doesn't like if we GC iframe
        // immediately, thus this timeout.
        utils.delay(500, function() {
                       iframe.parentNode.removeChild(iframe);
                       iframe = null;
                   });
        area.value = '';
        // It is not possible to detect if the iframe succeeded or
        // failed to submit our form.
        callback(true);
    };
    iframe.onerror = iframe.onload = completed;
    iframe.onreadystatechange = function(e) {
        if (iframe.readyState == 'complete') completed();
    };
    return completed;
};

var createAjaxSender = function(AjaxObject) {
    return function(url, payload, callback) {
        var xo = new AjaxObject('POST', url + '/xhr_send', payload);
        xo.onfinish = function(status, text) {
            callback(status === 200 || status === 204,
                     'http status ' + status);
        };
        return function(abort_reason) {
            callback(false, abort_reason);
        };
    };
};
