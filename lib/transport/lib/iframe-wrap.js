import IframeTransport from '../iframe.js';
import {extend} from '../../utils/object.js';

export default function iframeWrap(transport) {
  const wrappedClass = class IframeWrapTransport extends IframeTransport {
    constructor(transUrl, baseUrl) {
      super(transport.transportName, transUrl, baseUrl);
    }

    static enabled(url, info) {
      if (!global.document) {
        return false;
      }

      const iframeInfo = extend({}, info);
      iframeInfo.sameOrigin = true;
      return transport.enabled(iframeInfo) && IframeTransport.enabled();
    }

    static transportName = 'iframe-' + transport.transportName;
    static needBody = true;
    static roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // Html, javascript (2) + transport - no CORS (1)
    static facadeTransport = transport;
  };

  return wrappedClass;
}
