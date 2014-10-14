'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var util = require('util')
  , JSON3 = require('json3')
  , EventEmitter = require('events').EventEmitter
  , originUtils = require('../utils/origin')
  , iframeUtils = require('../utils/iframe')
  , eventUtils = require('../utils/event')
  , random = require('../utils/random')
  , browser = require('../utils/browser')
  , debug = require('debug')('sockjs-client:transport:iframe')
  ;

function IframeTransport(transport, transUrl, baseUrl) {
  debug(transport, transUrl, baseUrl);
  EventEmitter.call(this);

  var self = this;
  this.origin = originUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = baseUrl + '/iframe.html#' + this.windowId;

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.removeAllListeners();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

util.inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {}
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
  this.removeAllListeners();
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!originUtils.isSameOriginUrl(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }
  var iframeMessage = JSON3.parse(e.data);

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      global.SockJS.version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function (message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  if (!global.document) {
    return false;
  }
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  return ((typeof global.postMessage === 'function' ||
          typeof global.postMessage === 'object') && (!browser.isKonqueror()));
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;
