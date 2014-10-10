'use strict';

var random = require('../../utils/random')
  ;

module.exports = function (url, payload, callback) {
  var form = global._sendForm;
  var area = global._sendArea;

  if (!form) {
    form = global._sendForm = global.document.createElement('form');
    area = global._sendArea = global.document.createElement('textarea');
    area.name = 'd';
    form.style.display = 'none';
    form.style.position = 'absolute';
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';
    form.acceptCharset = 'UTF-8';
    form.appendChild(area);
    global.document.body.appendChild(form);
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = url + '/jsonp_send?i=' + id;

  var iframe;
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    iframe = global.document.createElement('<iframe name="' + id + '">');
  } catch(x) {
    iframe = global.document.createElement('iframe');
    iframe.name = id;
  }
  iframe.id = id;
  form.appendChild(iframe);
  iframe.style.display = 'none';

  try {
    area.value = payload;
  } catch(e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function() {
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
                   iframe.parentNode.removeChild(iframe);
                   iframe = null;
               }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback();
  };
  iframe.onerror = iframe.onload = completed;
  iframe.onreadystatechange = function() {
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return completed;
};
