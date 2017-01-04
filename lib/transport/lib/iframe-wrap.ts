import {IframeTransport} from '../iframe';
import objectUtils = require('../../utils/object');

export function iframeWrap(transport) {

  class IframeWrapTransport extends IframeTransport {
    constructor(transUrl, baseUrl) {
      super(transport.transportName, transUrl, baseUrl);
    }

    static enabled(url?, info?) {
      if (!(<any>global).document) {
        return false;
      }

      var iframeInfo = objectUtils.extend({}, info);
      iframeInfo.sameOrigin = true;
      return transport.enabled(iframeInfo) && IframeTransport.enabled();
    };

    static transportName = 'iframe-' + transport.transportName;
    static needBody = true;
    static roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

    static facadeTransport = transport;
  }
  return IframeWrapTransport;
}
