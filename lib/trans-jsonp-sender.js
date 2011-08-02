var BufferedSender = function() {};
BufferedSender.prototype.send_constructor = function(sender) {
    var that = this;
    that.send_buffer = [];
    that.sender = sender;
};
BufferedSender.prototype.doSend = function(message) {
    var that = this;
    that.send_buffer.push(message);
    if (typeof that.send_stop === 'undefined') {
        that.send_schedule();
    }
};

BufferedSender.prototype.send_schedule = function() {
    var that = this;
    if (that.send_buffer.length > 0) {
        var payload = '[' + that.send_buffer.join(',') + ']';
        that.send_stop = that.sender(that.trans_url,
                                     payload,
                                     function() {
                                         that.send_stop = undefined;
                                         that.send_schedule();
                                     });
        that.send_buffer = [];
    }
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
    area.value = payload;
    form.submit();

    var completed = function() {
        form.removeChild(iframe);
        iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
        iframe = undefined;
        area.value = undefined;
        form.target = undefined;
        form.reset();
        callback();
    };
    iframe.onerror = iframe.onload = completed;
    iframe.onreadystatechange = function(e) {
        if (iframe.readyState == 'complete') completed();
    };
    return completed;
};

var ajaxSender = function(url, payload, callback) {
    var orsc = function (xhr, e, abort_reason) {
        if(xhr.readyState === 4 || abort_reason) {
            callback(xhr.status, abort_reason);
        }
    };
    return utils.createXHR('POST', url + '/xhr_send', payload, orsc);
};

var xdrSender = function(url, payload, callback) {
    var orsc = function (xhr, e, abort_reason) {
        if(xhr.readyState === 4 || abort_reason) {
            callback(xhr.status, abort_reason);
        }
    };
    var fun = window.XDomainRequest ? utils.createXDR : utils.createXHR;
    return fun('POST', url + '/xhr_send', payload, orsc);
};

