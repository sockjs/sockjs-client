import XhrDriver from '../driver/xhr.js';

class XHRLocalObject extends XhrDriver {
  constructor(method, url, payload /* , opts */) {
    super(method, url, payload, {
      noCredentials: true,
    });
  }

  static enabled = XhrDriver.enabled;
}

export default XHRLocalObject;
