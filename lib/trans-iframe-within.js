var postMessage = function (type, messages) {
    var msg = JSON.stringify(messages);
    if(parent !== _window) {
        parent.postMessage(type + msg, '*');
    }
};

var FacadeJS = function() {};
FacadeJS.prototype._debug = function () {};
FacadeJS.prototype._didClose = function (status, reason) {
    postMessage('c', [''+status, reason]);
};
FacadeJS.prototype._didMessage = function (data) {
    postMessage('m', [data]);
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
        var messages = JSON.parse(e.data.slice(1));
        switch(type) {
        case 's':
            var version = messages[0];
            var protocol = messages[1];
            var trans_url = messages[2];
            if (version !== SockJS.version) {
                utils.log("Incompatibile SockJS! Main site uses:" +
                          " \"" + version + "\", the iframe:" +
                          " \"" + SockJS.version + "\".");
            }
            facade = new FacadeJS();
            facade._transport = new FacadeJS[protocol](facade, trans_url);
            break;
        case 'm':
            facade.send(messages[0]);
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
    postMessage('s', []);
};
