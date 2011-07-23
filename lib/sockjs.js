// Public object.
var Sock = SockJS = function(url, protocols, options) {
    this._options = {devel: true, debug: true};
    if (typeof options !== 'undefined') {
        utils.objectExtend(this._options, options);
    }
    this._base_url = url;
    this._server = utils.random_number_string(1000);
    this._connid = utils.random_string(8);
    this._trans_url = this._base_url + '/' + this._server + '/' + this._connid;
    this._protocols = ['ws', 'jsonp'];
    switch(typeof protocols) {
    case 'undefined': break;
    case 'string': this._protocols = [protocols]; break;
    default: this._protocols = protocols; break;
    }
    this.protocol = undefined;
    this.readyState = Sock.CONNECTING;
    this._try_next_protocol();
};
// Inheritance
Sock.prototype = new REventTarget();

Sock.version = "0.0.1";

Sock.CONNECTING = 0;
Sock.OPEN = 1;
Sock.CLOSING = 2;
Sock.CLOSED = 3;

Sock.prototype._debug = function() {
    if ('console' in window && console.log) {
        console.log.apply(console, arguments);
    }
};

// Sock.prototype._emit = function(eventType, value, t) {
//     this._debug('emit', eventType, value, t);
//     if (this._protocol_is_fine === false &&
//         (eventType === 'open' || eventType === 'message')) {
//         this._protocol_is_fine = true;
//     }
//     switch(eventType) {
//     case 'open':
//         break;
//     case 'message':
//         break;
//     case 'stop':
//         break;
//     case 'close':
//         if ('wasClean' in value &&
//             value.wasClean === false &&
//             this._protocol_is_fine === false) {
//             this._try_next_protocol();
//         }
//         break; // ignore
//     case 'error':
//         break;
//     default:
//     }
//     //this.dispatchEvent(eventType, value);
// };

Sock.prototype._didOpen = function() {
    if (this.readyState !== Sock.CONNECTING)
            throw 'INVALID_STATE_ERR';
    this.readyState = Sock.OPEN;
    this.dispatchEvent(new SimpleEvent("open"));
};

Sock.prototype._didClose = function(status, reason) {
    if (this.readyState !== Sock.CONNECTING &&
        this.readyState !== Sock.OPEN &&
        this.readyState !== Sock.CLOSING)
            throw 'INVALID_STATE_ERR';

    var close_event = new SimpleEvent("close", {status: status, reason: reason});
    if (this.readyState === Sock.CONNECTING) {
        if (this._try_next_protocol(close_event) === false) {
            this.readyState = Sock.CLOSED;
            var e = new SimpleEvent("close", {status: 2000,
                                              reason: "All transports failed."});
            this.dispatchEvent(e);
        }
    } else {
        if (this.readyState === Sock.CLOSING &&
            status === 1001 && this._close_status) {
            close_event = new SimpleEvent("close", {status: this._close_status,
                                                    reason: this._close_reason});
        }
        this.readyState = Sock.CLOSED;
        this.dispatchEvent(close_event);
    }
};

Sock.prototype._didMessage = function(data) {
    if (this.readyState !== Sock.OPEN)
            return;
    this.dispatchEvent(new SimpleEvent("message", {data: data}));
};

Sock.prototype._try_next_protocol = function(close_event) {
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
    if (Sock[this.protocol].enabled() === true) {
        this._transport = new Sock[this.protocol](this, this._trans_url, this._base_url);
        return true;
    }
    var e = new SimpleEvent("close", {status: 1000,
                                      reason: "Transport unavailable"});
    return this._try_next_protocol(e);
};

Sock.prototype.close = function(status, reason) {
    if(this.readyState !== Sock.CONNECTING &&
       this.readyState !== Sock.OPEN) {
        return false;
    }
    this.readyState = Sock.CLOSING;
    this._close_status = status || 1000;
    this._close_reason = reason || "Normal closure";
    this._transport.doClose();
    return true;
};

Sock.prototype.send = function(data) {
    if (this.readyState === Sock.CONNECTING)
            throw 'INVALID_STATE_ERR';
    if (this.readyState === Sock.OPEN) {
        this._transport.doSend(data);
    }
    return true;
};
