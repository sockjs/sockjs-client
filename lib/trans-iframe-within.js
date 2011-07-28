var postMessage = function (type, data) {
    if(parent !== _window) {
        parent.postMessage(type + (data || ''), '*');
    } else {
        utils.log("Can't postMessage, no parent window.", type, data);
    }
};

var FacadeJS = function() {};
FacadeJS.prototype._debug = function () {};
FacadeJS.prototype._didClose = function (status, reason) {
    postMessage('t', utils.closeFrame(status, reason));
};
FacadeJS.prototype._didMessage = function (frame) {
    postMessage('t', frame);
};
FacadeJS.prototype.send = function (data) {
    this._transport.doSend(data);
};
FacadeJS.prototype.close = function () {
    this._transport.doClose();
};

SockJS.bootstrap_iframe = function() {
    var facade;
    var onMessage = function(e) {
        if(e.source !== parent) return;
        var type = e.data.slice(0, 1);
        var data = e.data.slice(1);
        switch(type) {
        case 's':
            var p = JSON.parse(data);
            var version = p[0];
            var protocol = p[1];
            var trans_url = p[2];
            if (version !== SockJS.version) {
                utils.log("Incompatibile SockJS! Main site uses:" +
                          " \"" + version + "\", the iframe:" +
                          " \"" + SockJS.version + "\".");
            }
            facade = new FacadeJS();
            facade._transport = new FacadeJS[protocol](facade, trans_url);
            break;
        case 'm':
            facade.send(data);
            break;
        case 'c':
            facade.close();
            facade = null;
            break;
        }
    };

    // alert('test ticker');
    // facade = new FacadeJS();
    // facade._transport = new FacadeJS['w-iframe-htmlfile'](facade, 'http://172.16.173.128:9999/ticker/12/basd');

    utils.attachMessage(onMessage);

    // Start
    postMessage('s');
};
