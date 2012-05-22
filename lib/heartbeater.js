/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var Heartbeater = function(timeout){
    var that = this;
    that.not_poked = 0;
    that.tref = setInterval(function(){
        that.not_poked += 1;
        if (that.not_poked === 2) {
            that.emit('first');
        } else if (that.not_poked === 3) {
            that.emit('second');
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


SockJS.prototype._startHeartbeats = function(){
    var that = this;
    var client_interval = 5000;

    that._heartbeater = new Heartbeater(client_interval);

    // 1. Answer server pings
    that._bus.on('heartbeat', function(){
        that._sendHeartbeat();
    });

    // 2. Sending pings between (interval...2*interval)
    that._heartbeater.onfirst = function(){
        that._sendHeartbeat();
    };
    // 3. Expect traffic between (2*interval...3*interval)
    that._heartbeater.onsecond = function(){
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
