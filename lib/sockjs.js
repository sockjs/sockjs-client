// Public object.
var SockJS = function(url, protocols, options) {
    this._options = {devel: true, debug: true};
    if (typeof options !== 'undefined') {
        utils.objectExtend(this._options, options);
    }
    this._base_url = url;
    this._server = this._options.server || utils.random_number_string(1000);
    this._connid = utils.random_string(8);
    this._trans_url = this._base_url + '/' + this._server + '/' + this._connid;
    this._protocols = ['ws', 'iframe-eventsource', 'jsonp'];
    switch(typeof protocols) {
    case 'undefined': break;
    case 'string': this._protocols = [protocols]; break;
    default: this._protocols = protocols; break;
    }
    this.protocol = undefined;
    this.readyState = SockJS.CONNECTING;
    this._try_next_protocol();
};
// Inheritance
SockJS.prototype = new REventTarget();

SockJS.version = "0.0.1";

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._debug = function() {
    if (this._options.debug && 'console' in _window && console.log) {
        console.log.apply(console, arguments);
    }
};

SockJS.prototype._didOpen = function() {
    if (this.readyState !== SockJS.CONNECTING)
            throw 'INVALID_STATE_ERR';
    this.readyState = SockJS.OPEN;
    this.dispatchEvent(new SimpleEvent("open"));
};

SockJS.prototype._didClose = function(status, reason) {
    if (this.readyState !== SockJS.CONNECTING &&
        this.readyState !== SockJS.OPEN &&
        this.readyState !== SockJS.CLOSING)
            throw 'INVALID_STATE_ERR';

    var close_event = new SimpleEvent("close", {status: status, reason: reason});
    if (this.readyState === SockJS.CONNECTING) {
        if (this._try_next_protocol(close_event) === false) {
            this.readyState = SockJS.CLOSED;
            var e = new SimpleEvent("close", {status: 2000,
                                              reason: "All transports failed."});
            this.dispatchEvent(e);
        }
    } else {
        if (this.readyState === SockJS.CLOSING &&
            status === 1001 && this._close_status) {
            close_event = new SimpleEvent("close", {status: this._close_status,
                                                    reason: this._close_reason});
        }
        this.readyState = SockJS.CLOSED;
        this.dispatchEvent(close_event);
    }
};

SockJS.prototype._didMessage = function(data) {
    if (this.readyState !== SockJS.OPEN)
            return;
    this.dispatchEvent(new SimpleEvent("message", {data: data}));
};

SockJS.prototype._try_next_protocol = function(close_event) {
    if (this.protocol)
        this._debug('Closed transport:', this.protocol, close_event);

    if (this._transport) {
        delete this._transport; this._transport = undefined;
    }

    this.protocol = this._protocols.shift();
    if (typeof this.protocol === 'undefined') {
        return false;
    }

    this._debug('Opening transport:', this.protocol);
    if (SockJS[this.protocol].enabled() === true) {
        this._transport = new SockJS[this.protocol](this, this._trans_url, this._base_url);
        return true;
    }
    var e = new SimpleEvent("close", {status: 1000,
                                      reason: "Transport unavailable"});
    return this._try_next_protocol(e);
};

SockJS.prototype.close = function(status, reason) {
    if(this.readyState !== SockJS.CONNECTING &&
       this.readyState !== SockJS.OPEN) {
        return false;
    }
    this.readyState = SockJS.CLOSING;
    this._close_status = status || 1000;
    this._close_reason = reason || "Normal closure";
    this._transport.doClose();
    return true;
};

SockJS.prototype.send = function(data) {
    if (this.readyState === SockJS.CONNECTING)
            throw 'INVALID_STATE_ERR';
    if (this.readyState === SockJS.OPEN) {
        this._transport.doSend(data);
    }
    return true;
};
