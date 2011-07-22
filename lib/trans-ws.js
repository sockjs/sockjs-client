var WebSocketTransport = SockJS.ws = function(ri, trans_url) {
    var that = this;
    var url = trans_url + '/websocket';
    if (url.slice(0, 5) === 'https') {
        url = 'wss' + url.slice(5);
    } else {
        url = 'ws' + url.slice(4);
    }
    that.ri = ri;
    that.url = url;
    var ws = that.ws = new WebSocket(that.url);
    ws.onopen = function(e){that.ri._didOpen();};
    ws.onmessage = function(e){that.ri._didMessage(e.data);};
    ws.onclose = function(e){
        ws.onopen = ws.onmessage = ws.onclose = null;
        that.ws = undefined;
        that.ri._didClose(1001, "Socket closed");
    };
};

WebSocketTransport.prototype.doSend = function(data) {
    this.ws.send(data);
};

WebSocketTransport.prototype.doClose = function() {
    this.ws.close();
};

WebSocketTransport.enabled = function() {
    return (typeof WebSocket === 'function');
};
