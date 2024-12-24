'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , SenderReceiver = require('./sender-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject, opts) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    opts = opts || {};
    if (typeof payload === 'string') {
      opts.headers = opts.headers || {};
      opts.headers['Content-type'] = 'text/plain';
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opts);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject, opts) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject, opts), Receiver, AjaxObject, opts);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;
