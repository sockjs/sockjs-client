import XhrDriver from '../driver/xhr.js';

class XHRCorsObject extends XhrDriver {
  static enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
}

export default XHRCorsObject;
