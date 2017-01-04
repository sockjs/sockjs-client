import XhrDriver = require('../driver/xhr');

export class XHRLocalObject extends XhrDriver {
  constructor(method, url, payload /*, opts */) {
    super(method, url, payload, {
      noCredentials: true
    });
  }

  static enabled = XhrDriver.enabled;
}