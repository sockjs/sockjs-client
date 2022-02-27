// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

import {EventEmitter} from 'node:events';
import {string as randomString} from '../utils/random.js';
import {attachEvent, detachEvent} from '../utils/event.js';
import {createIframe, iframeEnabled} from '../utils/iframe.js';
import {getOrigin, addPath, isOriginEqual} from '../utils/url.js';
import {version} from '../package.json';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:transport:iframe');

class IframeTransport extends EventEmitter {
  constructor(transport, transUrl, baseUrl) {
    if (!IframeTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }

    super();

    this.origin = getOrigin(baseUrl);
    this.baseUrl = baseUrl;
    this.transUrl = transUrl;
    this.transport = transport;
    this.windowId = randomString(8);

    const iframeUrl = addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
    debug(transport, transUrl, iframeUrl);

    this.iframeObj = createIframe(iframeUrl, r => {
      debug('err callback');
      this.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
      this.close();
    });

    this.onmessageCallback = this._message.bind(this);
    attachEvent('message', this.onmessageCallback);
  }

  close() {
    debug('close');
    this.removeAllListeners();
    if (this.iframeObj) {
      detachEvent('message', this.onmessageCallback);
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        this.postMessage('c');
      } catch {
        // Intentionally empty
      }

      this.iframeObj.cleanup();
      this.iframeObj = null;
      this.onmessageCallback = null;
    }
  }

  _message(evt) {
    debug('message', evt.data);
    if (!isOriginEqual(evt.origin, this.origin)) {
      debug('not same origin', evt.origin, this.origin);
      return;
    }

    let iframeMessage;
    try {
      iframeMessage = JSON.parse(evt.data);
    } catch {
      debug('bad json', evt.data);
      return;
    }

    if (iframeMessage.windowId !== this.windowId) {
      debug('mismatched window id', iframeMessage.windowId, this.windowId);
      return;
    }

    switch (iframeMessage.type) {
      case 's':
        this.iframeObj.loaded();
        // Window global dependency
        this.postMessage('s', JSON.stringify([
          version,
          this.transport,
          this.transUrl,
          this.baseUrl,
        ]));
        break;
      case 't':
        this.emit('message', iframeMessage.data);
        break;
      case 'c':
        {
          let cdata;
          try {
            cdata = JSON.parse(iframeMessage.data);
          } catch {
            debug('bad json', iframeMessage.data);
            return;
          }

          this.emit('close', cdata[0], cdata[1]);
          this.close();
        }

        break;
      default:
        break;
    }
  }

  postMessage(type, data) {
    debug('postMessage', type, data);
    this.iframeObj.post(JSON.stringify({
      windowId: this.windowId,
      type,
      data: data || '',
    }), this.origin);
  }

  send(message) {
    debug('send', message);
    this.postMessage('m', message);
  }

  static enabled() {
    return iframeEnabled;
  }

  static transportName = 'iframe';
  static roundTrips = 2;
}

export default IframeTransport;
