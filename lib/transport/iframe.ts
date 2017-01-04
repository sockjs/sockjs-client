'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var JSON3 = require('json3');
import {EventEmitter} from 'events';
import version = require('../version');
import urlUtils = require('../utils/url');
import iframeUtils = require('../utils/iframe');
import eventUtils = require('../utils/event');
import random = require('../utils/random');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:transport:iframe');
}

export class IframeTransport extends EventEmitter {
  origin;
  baseUrl;
  transUrl;
  transport;
  windowId;
  iframeObj;
  onmessageCallback;

  constructor(transport, transUrl, baseUrl) {
    super();

    if (!IframeTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }
    var self = this;
    this.origin = urlUtils.getOrigin(baseUrl);
    this.baseUrl = baseUrl;
    this.transUrl = transUrl;
    this.transport = transport;
    this.windowId = random.string(8);

    var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
    debug(transport, transUrl, iframeUrl);

    this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
      debug('err callback');
      self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
      self.close();
    });

    this.onmessageCallback = this._message.bind(this);
    eventUtils.attachEvent('message', this.onmessageCallback);
  }

  close() {
    debug('close');
    this.removeAllListeners();
    if (this.iframeObj) {
      eventUtils.detachEvent('message', this.onmessageCallback);
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        this.postMessage('c');
      } catch (x) {
        // intentionally empty
      }
      this.iframeObj.cleanup();
      this.iframeObj = null;
      this.onmessageCallback = this.iframeObj = null;
    }
  };

  _message(e) {
    debug('message', e.data);
    if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
      debug('not same origin', e.origin, this.origin);
      return;
    }

    var iframeMessage;
    try {
      iframeMessage = JSON3.parse(e.data);
    } catch (ignored) {
      debug('bad json', e.data);
      return;
    }

    if (iframeMessage.windowId !== this.windowId) {
      debug('mismatched window id', iframeMessage.windowId, this.windowId);
      return;
    }

    switch (iframeMessage.type) {
      case 's':
        this.iframeObj.loaded();
        // window global dependency
        this.postMessage('s', JSON3.stringify([
          version
          , this.transport
          , this.transUrl
          , this.baseUrl
        ]));
        break;
      case 't':
        this.emit('message', iframeMessage.data);
        break;
      case 'c':
        var cdata;
        try {
          cdata = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          return;
        }
        this.emit('close', cdata[0], cdata[1]);
        this.close();
        break;
    }
  };

  postMessage(type, data?) {
    debug('postMessage', type, data);
    this.iframeObj.post(JSON3.stringify({
      windowId: this.windowId
      , type: type
      , data: data || ''
    }), this.origin);
  };

  send(message) {
    debug('send', message);
    this.postMessage('m', message);
  };

  static enabled() {
    return iframeUtils.iframeEnabled;
  };

  static transportName = 'iframe';
  static roundTrips = 2;
}