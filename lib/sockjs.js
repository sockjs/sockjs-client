var SockJS = function(url, protocols, options) {
    var that = this;
    that._options = {devel: false, debug: false, chunking: undefined};
    if (options) {
        utils.objectExtend(that._options, options);
    }
    that._base_url = utils.amendUrl(url);
    that._server = that._options.server || utils.random_number_string(1000);
    that._connid = utils.random_string(8);
    that._trans_url = that._base_url + '/' + that._server + '/' + that._connid;
    that._protocols = ['websocket',
                       'xhr-streaming',
                       'iframe-eventsource',
                       'iframe-htmlfile',
                       'xhr-polling',
                       'iframe-xhr-polling',
                       'jsonp-polling'];
    switch(typeof protocols) {
    case 'undefined': break;
    case 'string': that._protocols = [protocols]; break;
    default: that._protocols = protocols; break;
    }
    that.protocol = null;
    that.readyState = SockJS.CONNECTING;
    that._didClose();
};
// Inheritance
SockJS.prototype = new REventTarget();

SockJS.version = "<!-- version -->";

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._debug = function() {
    if (this._options.debug)
        utils.log.apply(utils, arguments);
};

SockJS.prototype._dispatchOpen = function() {
    var that = this;
    if (that.readyState === SockJS.CONNECTING) {
        if (that._transport_tref) {
            clearTimeout(that._transport_tref);
            that._transport_tref = null;
        }
        that.readyState = SockJS.OPEN;
        that.dispatchEvent(new SimpleEvent("open"));
    } else {
        // The server might have been restarted, and lost track of our
        // connection.
        that._didClose(1006, "Server lost session");
    }
};

SockJS.prototype._dispatchMessage = function(data) {
    var that = this;
    if (that.readyState !== SockJS.OPEN)
            return;
    that.dispatchEvent(new SimpleEvent("message", {data: data}));
};

SockJS.prototype._dispatchHeartbeat = function(data) {
    var that = this;
    if (that.readyState !== SockJS.OPEN)
        return;
    that.dispatchEvent(new SimpleEvent('heartbeat', {}));
};

SockJS.prototype._didClose = function(code, reason) {
    var that = this;
    if (that.readyState !== SockJS.CONNECTING &&
        that.readyState !== SockJS.OPEN &&
        that.readyState !== SockJS.CLOSING)
            throw new Error('INVALID_STATE_ERR');
    if (that._transport)
        that._transport.doCleanup();
    that._transport = null;
    if (that._transport_tref) {
        clearTimeout(that._transport_tref);
        that._transport_tref = null;
    }
    var close_event = new SimpleEvent("close", {code: code,
                                                reason: reason,
                                                wasClean: utils.userSetCode(code)});

    if (!utils.userSetCode(code) && that.readyState === SockJS.CONNECTING) {
        if (that._try_next_protocol(close_event)) {
            that._transport_tref = setTimeout(
                function() {
                    if (that.readyState === SockJS.CONNECTING) {
                        // I can't understand how it is possible to run
                        // this timer, when the state is CLOSED, but
                        // apparently in IE everythin is possible.
                        that._didClose(2007,
                                       "Transport timeouted");
                    }
                }, 5001);
            return;
        }
        close_event = new SimpleEvent("close", {code: 2000,
                                                reason: "All transports failed",
                                                wasClean: false,
                                                last_event: close_event});
    }
    that.readyState = SockJS.CLOSED;

    utils.delay(function() {
                   that.dispatchEvent(close_event);
                });
};

SockJS.prototype._didMessage = function(data) {
    var that = this;
    var type = data.slice(0, 1);
    switch(type) {
    case 'o':
        that._dispatchOpen();
        break;
    case 'a':
        var payload = JSON.parse(data.slice(1) || '[]');
        for(var i=0; i < payload.length; i++){
            that._dispatchMessage(payload[i]);
        }
        break;
    case 'm':
        var payload = JSON.parse(data.slice(1) || 'null');
        that._dispatchMessage(payload);
        break;
    case 'c':
        var payload = JSON.parse(data.slice(1) || '[]');
        that._didClose(payload[0], payload[1]);
        break;
    case 'h':
        that._dispatchHeartbeat();
        break;
    }
};

SockJS.prototype._try_next_protocol = function(close_event) {
    var that = this;
    if (that.protocol) {
        that._debug('Closed transport:', that.protocol, ''+close_event);
        that.protocol = null;
    }

    while(1) {
        var protocol = that.protocol = that._protocols.shift();
        if (!protocol) {
            return false;
        }
        // Some protocols require chunking, we may need to run the
        // test beforehand.
        if (SockJS[protocol] &&
              SockJS[protocol].need_chunking === true &&
              that._options.chunking === undefined) {
            that._protocols.unshift(protocol);
            that.protocol = 'chunking-test';
            // Assert false, in case test timeouts.
            that._options.chunking = false;
            chunkingTest(that._base_url, function(chunking) {
                             that._options.chunking = chunking;
                             that._try_next_protocol();
                         }, that._options);
            return true;
        }
        // Some protocols require access to `body`, what if were in
        // the `head`?
        if (SockJS[protocol] &&
            SockJS[protocol].need_body === true &&
            !_document.body) {
            that._protocols.unshift(protocol);
            that.protocol = 'waiting-for-load';
            utils.attachEvent('load', function(){
                that._try_next_protocol();
            });
            return true;
        }

        if (!SockJS[protocol] ||
              (SockJS[protocol].need_chunking === true &&
                   that._options.chunking !== true) ||
              !SockJS[protocol].enabled(that._options)) {
            that._debug('Skipping transport:', protocol);
        } else {
            that._debug('Opening transport:', protocol);
            that._transport = new SockJS[protocol](that, that._trans_url,
                                                         that._base_url);
            return true;
        }
    }
};

SockJS.prototype.close = function(code, reason) {
    var that = this;
    if (code && !utils.userSetCode(code))
        throw new Error("INVALID_ACCESS_ERR");
    if(that.readyState !== SockJS.CONNECTING &&
       that.readyState !== SockJS.OPEN) {
        return false;
    }
    that.readyState = SockJS.CLOSING;
    that._didClose(code || 1000, reason || "Normal closure");
    return true;
};

SockJS.prototype.send = function(data) {
    var that = this;
    if (that.readyState === SockJS.CONNECTING)
        throw new Error('INVALID_STATE_ERR');
    if (that.readyState === SockJS.OPEN) {
        that._transport.doSend(utils.quote('' + data));
    }
    return true;
};
