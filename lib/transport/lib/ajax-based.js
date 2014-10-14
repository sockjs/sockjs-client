'use strict';

var util = require('util')
  , SenderReceiver = require('./sender-receiver')
  , debug = require('debug')('sockjs-client:ajax-based')
  ;

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type':'text/plain'};
    }
    var xo = new AjaxObject('POST', url + '/xhr_send', payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      callback(new Error('Aborted'));
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

util.inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;
