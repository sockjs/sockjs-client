/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var Heartbeater = function(timeout, how_many_intervals){
    var that = this;
    that.not_poked = 0;
    that.tref = setInterval(function(){
        that.not_poked += 1;
        if (that.not_poked === how_many_intervals) {
            that.emit('timeout');
        }
    }, timeout);
};

Heartbeater.prototype = new EventEmitter(['first', 'second']);
Heartbeater.prototype.poke = function(){
    this.not_poked = 0;
};

Heartbeater.prototype.close = function(){
    clearInterval(this.tref);
};


SockJS.prototype._startHeartbeats = function(server_heartbeat_interval){
    var that = this;

    that._heartbeater = new Heartbeater(server_heartbeat_interval, 2);

    // 1. Answer server pings
    that._bus.on('heartbeat', function(){
        if (!SockJS[that.protocol].polling) {
            // Polling transports need to reconnect on every delivery,
            // there is no need to send anything.
            that._sendEmpty();
        }
    });

    // 2. Expect traffic between (2*interval...3*interval)
    that._heartbeater.ontimeout = function(){
        that._didClose(1007, 'Server heartbeat missed');
    };
    var poke = function(){
        that._heartbeater.poke();
    };
    that._bus.on('heartbeat', poke);
    that._bus.on('message', poke);
    that._bus.on('close', function(){
        that._heartbeater.nuke();
        that._heartbeater.close();
    });
};
