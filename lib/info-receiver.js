'use strict';
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , JSON3 = require('json3')
  , utils = require('./utils')
  ;

function InfoReceiver(base_url, AjaxObject) {
    var that = this;
    utils.delay(function(){that.doXhr(base_url, AjaxObject);});
}

util.inherits(InfoReceiver, EventEmitter);

InfoReceiver.prototype.doXhr = function(base_url, AjaxObject) {
    var that = this;
    var t0 = (new Date()).getTime();
    var xo = new AjaxObject('GET', base_url + '/info');

    var tref = utils.delay(8000,
                           function(){xo.ontimeout();});

    xo.on('finish', function(status, text) {
        clearTimeout(tref);
        tref = null;
        if (status === 200) {
            var rtt = (new Date()).getTime() - t0;
            var info;
            if (text) {
                try {
                    info = JSON3.parse(text);
                }
                catch (e) {}
            }
            if (typeof info !== 'object') info = {};
            that.emit('finish', info, rtt);
        } else {
            that.emit('finish');
        }
    });
    xo.ontimeout = function() {
        xo.close();
        that.emit('finish');
    };
};

module.exports = InfoReceiver;