'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var util = require('util')
  , EventTarget = require('../../polyfills/eventtarget')
  , CloseEvent = require('../../closeevent')
  , TransportMessageEvent = require('../../trans-message-event')
  , JSON3 = require('json3')
  , utils = require('../../utils')
  ;

function IframeTransport() {
  EventTarget.call(this);
}

util.inherits(IframeTransport, EventTarget);

IframeTransport.prototype.start = function(transUrl, baseUrl) {
  var self = this;
  this.origin = utils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;

  var iframeUrl = baseUrl + '/iframe.html';
  // TODO figure out how to get this info again
  // if (this.ri._devel) {
  //   iframeUrl += '?t=' + Date.now();
  // }
  this.windowId = utils.randomString(8);
  iframeUrl += '#' + this.windowId;

  this.iframeObj = utils.createIframe(iframeUrl, function(r) {
    var closeEvent = new CloseEvent();
    closeEvent.code = 1006;
    closeEvent.reason = 'Unable to load an iframe (' + r + ')';
    self.dispatchEvent(closeEvent);
  });

  this.onmessageCallback = this._message.bind(this);
  utils.attachMessage(this.onmessageCallback);
};

IframeTransport.prototype.close = function() {
  if (this.iframeObj) {
    utils.detachMessage(this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {}
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  if (!utils.isSameOriginUrl(e.origin, this.origin)) {
    return;
  }
  var windowId = e.data.slice(0, 8);
  var type = e.data.slice(8, 9);
  var data = e.data.slice(9);

  if (windowId !== this.windowId) {
    console.log('Mismatched window id');
    return;
  }

  switch(type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      global.SockJS.version
    , this.protocol
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.dispatchEvent(new TransportMessageEvent(data));
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  this.iframeObj.post(this.windowId + type + (data || ''), this.origin);
};

IframeTransport.prototype.send = function (message) {
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  var konqueror = global.navigator &&
    global.navigator.userAgent &&
    global.navigator.userAgent.indexOf('Konqueror') !== -1;
  return ((typeof global.postMessage === 'function' ||
          typeof global.postMessage === 'object') && (!konqueror));
};

module.exports = IframeTransport;
