import FacadeJS from './facade.js';
import {postMessage, currentWindowId, setCurrentWindowId} from './utils/iframe.js';
import {attachEvent} from './utils/event.js';
import {isOriginEqual} from './utils/url.js';
import InfoIframeReceiver from './info-iframe-receiver.js';
import loc from './location.js';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:iframe-bootstrap');

export default function createSockJs(SockJS, availableTransports) {
  const transportMap = {};
  for (const at of availableTransports) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  }

  // Hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  let parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function () {
    /* eslint-enable camelcase */
    /* eslint-env browser */
    let facade;
    setCurrentWindowId(loc.hash.slice(1));
    const onMessage = function (evt) {
      if (evt.source !== parent) {
        return;
      }

      if (typeof parentOrigin === 'undefined') {
        parentOrigin = evt.origin;
      }

      if (evt.origin !== parentOrigin) {
        return;
      }

      let iframeMessage;
      try {
        iframeMessage = JSON.parse(evt.data);
      } catch {
        debug('bad json', evt.data);
        return;
      }

      if (iframeMessage.windowId !== currentWindowId) {
        return;
      }

      switch (iframeMessage.type) {
        case 's':
          {
            let p;
            try {
              p = JSON.parse(iframeMessage.data);
            } catch {
              debug('bad json', iframeMessage.data);
              break;
            }

            const version = p[0];
            const transport = p[1];
            const transUrl = p[2];
            const baseUrl = p[3];
            debug(version, transport, transUrl, baseUrl);
            // Change this to semver logic
            if (version !== SockJS.version) {
              throw new Error('Incompatible SockJS! Main site uses:'
                      + ' "' + version + '", the iframe:'
                      + ' "' + SockJS.version + '".');
            }

            if (!isOriginEqual(transUrl, loc.href)
              || !isOriginEqual(baseUrl, loc.href)) {
              throw new Error('Can\'t connect to different domain from within an '
                      + 'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
            }

            facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
          }

          break;
        case 'm':
          facade._send(iframeMessage.data);
          break;
        case 'c':
          if (facade) {
            facade._close();
          }

          facade = null;
          break;
        default:
          break;
      }
    };

    attachEvent('message', onMessage);

    // Start
    postMessage('s');
  };
}
