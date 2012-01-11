var InfoReceiver = function(base_url) {
    var that = this;
    that.base_url = base_url;
    that.t0 = (new Date()).getTime();
    utils.delay(function(){that.doXhr();});
};

InfoReceiver.prototype = new REventTarget();

InfoReceiver.prototype.doXhr = function() {
    var that = this;
    var done = false;
    var orsc = function(xhr, e, abort_reason) {
        if (xhr.readyState === 4 && !done) {
            if (xhr.status === 200) {
                var data = xhr.responseText;
                if (data) {
                    var rtt = (new Date()).getTime() - that.t0;
                    var info = JSON.parse(data);
                    if (typeof info !== 'object') info = {};
                    done = true;
                    that.dispatchEvent(new SimpleEvent('message',
                                                       {info: info,
                                                        rtt: rtt}));
                }
            };
        }
        if (abort_reason && !done) {
            done = true;
            that.dispatchEvent(new SimpleEvent('message',
                                               {}));
        }
    };
    var createXhr = _window.XDomainRequest ?
                           utils.createXDR : utils.createXHR;
    var xhr_close = createXhr('GET', that.base_url + '/info' , null, orsc);
};

