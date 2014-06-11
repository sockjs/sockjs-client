'use strict';
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var utils = require('./utils');
var REventTarget = require('./reventtarget');
var SimpleEvent = require('./simpleevent');
var InfoReceiver = require('./info-receiver');
var InfoReceiverIframe = require('./info-receiver-iframe');
var InfoReceiverFake = require('./info-receiver-fake');
var FacadeJS = require('./facade');
var JSON3 = require('json3');
var XHRLocalObject = require('./xhr-local');
var XHRCorsObject = require('./xhr-cors');
var XDRObject = require('./xdr');
var XDRPolling = require('./trans-xdr-polling');
var IframeTransport = require('./trans-iframe');

function SockJS(url, _reserved, options) {
    if (!(this instanceof SockJS)) {
        // makes `new` optional
        return new SockJS(url, _reserved, options);
    }

    var that = this;
    that._base_url = utils.amendUrl(url);

    options = options || {};
    that._server = 'server' in options ? options.server : utils.random_number_string(1000);
    that._devel = 'devel' in options ? options.devel : false;
    that._debug = 'debug' in options ? options.debug : false;

    // only allow whitelist if it is valid
    if (options.protocols_whitelist && options.protocols_whitelist.length) {
        that._protocols_whitelist = utils.isArray(options.protocols_whitelist)
            ? options.protocols_whitelist
            : [options.protocols_whitelist]
            ;
    } else {
        that._protocols_whitelist = [];
    }

    that._protocols = [];
    that.protocol = null;
    that.readyState = SockJS.CONNECTING;
    that._ir = createInfoReceiver(that._base_url);
    that._ir.onfinish = function(info, rtt) {
        that._ir = null;
        if (info) {
            that._applyInfo(info, rtt, that._protocols_whitelist);
            that._didClose();
        } else {
            that._didClose(1002, "Can't connect to server", true);
        }
    };
}

// Inheritance
SockJS.prototype = new REventTarget();

SockJS.version = '1.0.0-alpha1';

SockJS.prototype.CONNECTING = SockJS.CONNECTING = 0;
SockJS.prototype.OPEN = SockJS.OPEN = 1;
SockJS.prototype.CLOSING = SockJS.CLOSING = 2;
SockJS.prototype.CLOSED = SockJS.CLOSED = 3;

SockJS.prototype._log = function() {
    if (this._debug)
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

SockJS.prototype._didClose = function(code, reason, force) {
    var that = this;
    if (that.readyState !== SockJS.CONNECTING &&
        that.readyState !== SockJS.OPEN &&
        that.readyState !== SockJS.CLOSING)
            throw new Error('INVALID_STATE_ERR');
    if (that._ir) {
        that._ir.nuke();
        that._ir = null;
    }

    if (that._transport) {
        that._transport.doCleanup();
        that._transport = null;
    }

    var close_event = new SimpleEvent("close", {
        code: code,
        reason: reason,
        wasClean: utils.userSetCode(code)});

    if (!utils.userSetCode(code) &&
        that.readyState === SockJS.CONNECTING && !force) {
        if (that._try_next_protocol(close_event)) {
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
    var payload;
    switch(type) {
    case 'o':
        that._dispatchOpen();
        break;
    case 'a':
        payload = JSON3.parse(data.slice(1) || '[]');
        for(var i=0; i < payload.length; i++){
            that._dispatchMessage(payload[i]);
        }
        break;
    case 'm':
        payload = JSON3.parse(data.slice(1) || 'null');
        that._dispatchMessage(payload);
        break;
    case 'c':
        payload = JSON3.parse(data.slice(1) || '[]');
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
        that._log('Closed transport:', that.protocol, ''+close_event);
        that.protocol = null;
    }
    if (that._transport_tref) {
        clearTimeout(that._transport_tref);
        that._transport_tref = null;
    }

    function timeoutFunction() {
        if (that.readyState === SockJS.CONNECTING) {
            // I can't understand how it is possible to run
            // this timer, when the state is CLOSED, but
            // apparently in IE everythin is possible.
            that._didClose(2007, "Transport timed out");
        }
    }

    function tryNextProtocol() {
        that._try_next_protocol();
    }

    while(1) {
        var protocol = that.protocol = that._protocols.shift();
        if (!protocol) {
            return false;
        }
        // Some protocols require access to `body`, what if were in
        // the `head`?
        if (SockJS[protocol] &&
            SockJS[protocol].need_body === true &&
            (!document.body ||
             (typeof document.readyState !== 'undefined'
              && document.readyState !== 'complete'))) {
            that._protocols.unshift(protocol);
            that.protocol = 'waiting-for-load';
            utils.attachEvent('load', tryNextProtocol);
            return true;
        }

        if (!SockJS[protocol] ||
              !SockJS[protocol].enabled(that._base_url)) {
            that._log('Skipping transport:', protocol);
        } else {
            var roundTrips = SockJS[protocol].roundTrips || 1;
            var to = ((that._rto || 0) * roundTrips) || 5000;
            that._transport_tref = utils.delay(to, timeoutFunction);

            var connid = utils.random_string(8);
            var trans_url = that._base_url + '/' + that._server + '/' + connid;
            that._log('Opening transport:', protocol, ' url:'+trans_url,
                        ' RTO:'+that._rto);
            that._transport = new SockJS[protocol](that, trans_url,
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

SockJS.prototype._applyInfo = function(info, rtt, protocols_whitelist) {
    var that = this;
    that._rtt = rtt;
    that._rto = utils.countRTO(rtt);

    info.null_origin = !document.domain;
    // Servers can override base_url, eg to provide a randomized domain name and
    // avoid browser per-domain connection limits.
    if (info.base_url)
      that._base_url = utils.amendUrl(info.base_url);
    var probed = utils.probeProtocols(that._base_url);
    that._protocols = utils.detectProtocols(probed, protocols_whitelist, info);
};

utils.parent_origin = undefined;

SockJS.bootstrap_iframe = function() {
    var facade;
    utils.curr_window_id = document.location.hash.slice(1);
    var onMessage = function(e) {
        if(e.source !== parent) return;
        if(typeof utils.parent_origin === 'undefined')
            utils.parent_origin = e.origin;
        if (e.origin !== utils.parent_origin) return;

        var window_id = e.data.slice(0, 8);
        var type = e.data.slice(8, 9);
        var data = e.data.slice(9);
        if (window_id !== utils.curr_window_id) return;
        switch(type) {
        case 's':
            var p = JSON3.parse(data);
            var version = p[0];
            var protocol = p[1];
            var trans_url = p[2];
            var base_url = p[3];
            // change this to semver logic
            if (version !== SockJS.version) {
                utils.log("Incompatibile SockJS! Main site uses:" +
                          " \"" + version + "\", the iframe:" +
                          " \"" + SockJS.version + "\".");
            }
            if (!utils.flatUrl(trans_url) || !utils.flatUrl(base_url)) {
                utils.log("Only basic urls are supported in SockJS");
                return;
            }

            if (!utils.isSameOriginUrl(trans_url) ||
                !utils.isSameOriginUrl(base_url)) {
                utils.log("Can't connect to different domain from within an " +
                          "iframe. (" + JSON3.stringify([window.location.href, trans_url, base_url]) +
                          ")");
                return;
            }
            facade = new FacadeJS();
            facade._transport = new FacadeJS[protocol](facade, trans_url, base_url);
            break;
        case 'm':
            facade._doSend(data);
            break;
        case 'c':
            if (facade)
                facade._doCleanup();
            facade = null;
            break;
        }
    };

    utils.attachMessage(onMessage);

    // Start
    utils.postMessage('s');
};

SockJS.websocket = require('./trans-websocket');
SockJS['iframe-eventsource'] = require('./trans-iframe-eventsource');
SockJS['iframe-htmlfile'] = require('./trans-iframe-htmlfile');
SockJS['iframe-xhr-polling'] = require('./trans-iframe-xhr-polling');
SockJS['jsonp-polling'] = require('./trans-jsonp-polling');
SockJS['xdr-polling'] = XDRPolling;
SockJS['xdr-streaming'] = require('./trans-xdr-streaming');
SockJS['xhr-polling'] = require('./trans-xhr-polling');
SockJS['xhr-streaming'] = require('./trans-xhr-streaming');

module.exports = SockJS;

FacadeJS['w-iframe-info-receiver'] = require('./info-receiver-iframe');
FacadeJS['w-iframe-eventsource'] = require('./trans-eventsource');
FacadeJS['w-iframe-htmlfile'] = require('./trans-htmlfile');
FacadeJS['w-iframe-xhr-polling'] = require('./xhr-polling-iframe');

// TODO get rid of both of these!!!!
SockJS.getUtils = function () { return utils; };

// This is seriously wack.
if ('_sockjs_onload' in window) setTimeout(window._sockjs_onload, 1);

function createInfoReceiver(base_url) {
    if (utils.isSameOriginUrl(base_url)) {
        // If, for some reason, we have SockJS locally - there's no
        // need to start up the complex machinery. Just use ajax.
        return new InfoReceiver(base_url, XHRCorsObject);
    }
    if (utils.isXHRCorsCapable()) {
        // XHRLocalObject -> no_credentials=true
        return new InfoReceiver(base_url, XHRLocalObject);
    }
    if (XDRPolling.enabled(base_url)) {
        return new InfoReceiver(base_url, XDRObject);
    }
    if (IframeTransport.enabled()) {
        return new InfoReceiverIframe(base_url);
    }

    // IE 7, and IE 8/9 if requesting across schemes (e.g. http -> https)
    return new InfoReceiverFake();
}
