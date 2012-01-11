var InfoReceiver = function(base_url) {
    var that = this;
    that.base_url = base_url;
    that.t0 = (new Date()).getTime();
    utils.delay(function(){that.doXhr();});
};

InfoReceiver.prototype = new EventEmitter(['finish']);

InfoReceiver.prototype.doXhr = function() {
    var that = this;
    var xo = utils.createXHR(true, 'GET', that.base_url + '/info' , null);
    xo.onfinish = function(status, text) {
        if (status === 200) {
            var rtt = (new Date()).getTime() - that.t0;
            var info = JSON.parse(text);
            if (typeof info !== 'object') info = {};
            that.emit('finish', info, rtt);
        } else {
            that.emit('finish');
        }
    };
};

var InfoReceiverIframe = function(base_url) {
    var that = this;
    var go = function() {
        var ifr = new IframeTransport();
        ifr.protocol = 'w-iframe-info-receiver';
        var fun = function(r) {
            if (typeof r === 'string' && r.substr(0,1) === 'm') {
                var d = JSON.parse(r.substr(1));
                var info = d[0], rtt = d[1];
                that.emit('finish', info, rtt);
            } else {
                that.emit('finish');
            }
            ifr.doCleanup();
            ifr = null;
        };
        var mock_ri = {
            _options: {},
            _didClose: fun,
            _didMessage: fun
        };
        ifr.i_constructor(mock_ri, base_url, base_url);
    }
    if(!_document.body) {
        utils.attachEvent('load', go);
    } else {
        go();
    }
};
InfoReceiverIframe.prototype = new EventEmitter(['finish']);


var InfoReceiverFake = function() {
    // It may not be possible to do cross domain AJAX to get the info
    // data, for example for IE7. But we want to run JSONP, so let's
    // fake the response, with rtt=2s (rto=6s).
    var that = this;
    utils.delay(function() {
        that.emit('finish', {}, 2000);
    });
};
InfoReceiverFake.prototype = new EventEmitter(['finish']);



var createInfoReceiver = function(base_url) {
    // 1. Local url or CORS
    if (utils.isLocalUrl(base_url) ||
        _window.XDomainRequest ||
        (_window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())) {
        return new InfoReceiver(base_url);
    }
    // 2. Iframe - Opera
    if (IframeTransport.enabled()) {
        return new InfoReceiverIframe(base_url);
    }
    // 3. IE 7
    return new InfoReceiverFake();
};


var WInfoReceiverIframe = FacadeJS['w-iframe-info-receiver'] = function(ri, _trans_url, base_url) {
    var ir = new InfoReceiver(base_url);
    ir.onfinish = function(info, rtt) {
        ri._didMessage('m'+JSON.stringify([info, rtt]));
        ri._didClose();
    }
};
WInfoReceiverIframe.prototype.doCleanup = function() {};

