var WebSocketTransport = SockJS.websocket = function(ri, trans_url) {
    var that = this;
    var url = trans_url + '/websocket';
    if (url.slice(0, 5) === 'https') {
        url = 'wss' + url.slice(5);
    } else {
        url = 'ws' + url.slice(4);
    }
    that.ri = ri;
    that.url = url;
    var Constructor = window.WebSocket || window.MozWebSocket;

    if(_document_guard.state >= DocumentGuard.beforeunload) {
        // Firefox has an interesting bug. If a websocket connection
        // is created after onbeforeunload, it stays alive even when
        // user navigates away from the page. In such situation let's
        // lie - let's not open the ws connection at all. See:
        // https://github.com/sockjs/sockjs-client/issues/28
        return;
    }

    that.ws = new Constructor(that.url);
    that.ws.onmessage = function(e) {
        that.ri._didMessage(e.data);
    };
    that.ws.onclose = function() {
        that.ri._didMessage(utils.closeFrame(1006, "WebSocket connection broken"));
    };
};

WebSocketTransport.prototype.doSend = function(data) {
    this.ws.send(data);
};

WebSocketTransport.prototype.doCleanup = function() {
    var that = this;
    var ws = that.ws;
    if (ws) {
        ws.onmessage = ws.onclose = null;
        ws.close();
        that.ri = that.ws = null;
    }
};

WebSocketTransport.enabled = function() {
    return !!(window.WebSocket || window.MozWebSocket);
};
