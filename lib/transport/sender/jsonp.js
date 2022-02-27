import {string as randomString} from '../../utils/random.js';
import {addQuery, addPath} from '../../utils/url.js';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:sender:jsonp');

let form;
let area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // Ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch {
    const iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.append(area);

  global.document.body.append(form);
}

export default function jsonpSend(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }

  const id = 'a' + randomString(8);
  form.target = id;
  form.action = addQuery(addPath(url, '/jsonp_send'), 'i=' + id);

  let iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.append(iframe);

  try {
    area.value = payload;
  } catch {
    // Seriously broken browsers get here
  }

  form.submit();

  const completed = function (error) {
    debug('completed', id, error);
    if (!iframe.onerror) {
      return;
    }

    iframe.removeEventListener('load', iframeLoad);
    iframe.removeEventListener('error', iframeError);
    iframe.removeEventListener('readystatechange', iframeReadyStateChange);
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(() => {
      debug('cleaning up', id);
      iframe.remove();
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(error);
  };

  const iframeError = function () {
    debug('onerror', id);
    completed();
  };

  iframe.addEventListener('error', iframeError);

  const iframeLoad = function () {
    debug('onload', id);
    completed();
  };

  iframe.addEventListener('load', iframeLoad);

  const iframeReadyStateChange = function (evt) {
    debug('onreadystatechange', id, iframe.readyState, evt);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };

  iframe.addEventListener('readystatechange', iframeReadyStateChange);

  return function () {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
}
