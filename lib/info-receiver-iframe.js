'use strict';
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var utils = require('./utils');
var EventEmitter = require('./eventemitter');
var IframeTransport = require('./trans-iframe');
var JSON3 = require('json3');

function InfoReceiverIframe(base_url) {
    var that = this;
    var go = function() {
        var ifr = new IframeTransport();
        ifr.protocol = 'w-iframe-info-receiver';
        var fun = function(r) {
            if (typeof r === 'string' && r.substr(0,1) === 'm') {
                var d = JSON3.parse(r.substr(1));
                var info = d[0], rtt = d[1];
                that.emit('finish', info, rtt);
            } else {
                that.emit('finish');
            }
            ifr.doCleanup();
            ifr = null;
        };
        var mock_ri = {
            _didClose: fun,
            _didMessage: fun
        };
        ifr.i_constructor(mock_ri, base_url, base_url);
    };
    if(!document.body) {
        utils.attachEvent('load', go);
    } else {
        go();
    }
}

InfoReceiverIframe.prototype = new EventEmitter(['finish']);

module.exports = InfoReceiverIframe;