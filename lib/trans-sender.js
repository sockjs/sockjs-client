/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var BufferedSender = function() {};
BufferedSender.prototype.send_constructor = function(sender) {
    var that = this;
    that.send_buffer = [];
    that.sender = sender;
    that.init_window_size = that.ri._options.init_window_size;
    that.window_size      = that.init_window_size;
    that.max_window_time  = that.ri._options.max_window_time;
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
    var that = this;
    if (td > that.max_window_time) {
        // Over time, reduce window
        that.window_size = Math.max(that.window_size / 2,
                                    that.init_window_size);
        return true;
    } else {
        if (full_window) {
            if (td*2 < that.max_window_time) {
                // A lot time left
                that.window_size *= 2;
            } else {
                // Not so much time left...
                that.window_size *= 1.1;
            }
            return true;
        }
    }
    return false;
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
        if (serialized > that.window_size) {
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
            if (that.adjustWindow(td, full_window)) {
                that.ri._debug('window_size adjusted: ' + that.window_size);
            }
            that.send_schedule_wait();
        }
    });
};

BufferedSender.prototype.send_destructor = function() {
    var that = this;
    if (that.send_stop) {
        that.send_stop();
    }
    that.send_stop = null;
};

var jsonPGenericSender = function(url, payload, callback) {
    var that = this;
    var js = new JsonpSender(url, payload, that);
    js.onfinish = function(){
        callback(true);
    };
    return function(){
        js.close();
    };
};

var createAjaxSender = function(AjaxObject) {
    return function(url, payload, callback) {
        var xo = new AjaxObject('POST', url + '/xhr_send', payload);
        xo.onfinish = function(status, text) {
            callback(status === 200 || status === 204,
                     'http status ' + status);
        };
        return function(abort_reason) {
            xo.close();
        };
    };
};
