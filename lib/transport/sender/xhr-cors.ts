import XhrDriver = require('../driver/xhr');

export class XHRCorsObject extends XhrDriver {
  constructor(method, url, payload, opts) {
    super(method, url, payload, opts);
  }

  static enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
}
