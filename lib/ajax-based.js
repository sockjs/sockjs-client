'use strict';

var util = require('util')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./trans-polling')
  ;

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type':'text/plain'};
    }
    var xo = new AjaxObject('POST', url + '/xhr_send', payload, opt);
    xo.on('finish', function(status) {
      callback(status === 200 || status === 204, 'http status ' + status);
    });
    return function(abortReason) {
      callback(false, abortReason);
    };
  };
}

function AjaxBasedTransport() {
}

util.inherits(AjaxBasedTransport, BufferedSender);

AjaxBasedTransport.prototype.run = function(ri, transUrl, urlSuffix, Receiver, AjaxObject) {
  this.ri = ri;
  this.transUrl = transUrl;
  this.sendConstructor(createAjaxSender(AjaxObject));
  this.poll = new Polling(ri, Receiver, transUrl + urlSuffix, AjaxObject);
};

AjaxBasedTransport.prototype.doCleanup = function() {
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = AjaxBasedTransport;
