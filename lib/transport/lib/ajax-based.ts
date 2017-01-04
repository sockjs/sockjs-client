import * as urlUtils from '../../utils/url';
import {SenderReceiver} from './sender-receiver';

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function (url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt: any = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function (status) {
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

      var err: any = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

export class AjaxBasedTransport extends SenderReceiver {
  constructor(transUrl, urlSuffix, Receiver, AjaxObject) {
    super(transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
  }
}
