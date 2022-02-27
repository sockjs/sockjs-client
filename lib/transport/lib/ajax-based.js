import {addPath} from '../../utils/url.js';
import debugFunc from './utils/debug.js';
import SenderReceiver from './sender-receiver.js';

const debug = debugFunc('sockjs-client:ajax-based');

function createAjaxSender(AjaxObject) {
  return function (url, payload, callback) {
    debug('create ajax sender', url, payload);
    const opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }

    const ajaxUrl = addPath(url, '/xhr_send');
    let xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', status => {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }

      callback();
    });
    return function () {
      debug('abort');
      xo.close();
      xo = null;

      const error = new Error('Aborted');
      error.code = 1000;
      callback(error);
    };
  };
}

class AjaxBasedTransport extends SenderReceiver {
  constructor(transUrl, urlSuffix, Receiver, AjaxObject) {
    super(transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
  }
}

export default AjaxBasedTransport;
