'use strict';

var XHRLocalObject = require('./xhr-local');
var JSON3 = require('json3');
var InfoReceiver = require('./info-receiver');

function WInfoReceiverIframe(ri, _trans_url, base_url) {
    var ir = new InfoReceiver(base_url, XHRLocalObject);
    ir.onfinish = function(info, rtt) {
        ri._didMessage('m'+JSON3.stringify([info, rtt]));
        ri._didClose();
    };
}

WInfoReceiverIframe.prototype.doCleanup = function() {};

module.exports = WInfoReceiverIframe;