'use strict';

var utils = require('../../utils');

module.exports = function (url, payload, callback) {
  var form = window._sendForm;
  var area = window._sendArea;

  if (!form) {
    form = window._sendForm = document.createElement('form');
    area = window._sendArea = document.createElement('textarea');
    area.name = 'd';
    form.style.display = 'none';
    form.style.position = 'absolute';
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';
    form.acceptCharset = 'UTF-8';
    form.appendChild(area);
    document.body.appendChild(form);
  }
  var id = 'a' + utils.randomString(8);
  form.target = id;
  form.action = url + '/jsonp_send?i=' + id;

  var iframe;
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    iframe = document.createElement('<iframe name="' + id + '">');
  } catch(x) {
    iframe = document.createElement('iframe');
    iframe.name = id;
  }
  iframe.id = id;
  form.appendChild(iframe);
  iframe.style.display = 'none';

  try {
    area.value = payload;
  } catch(e) {
    utils.log('Your browser is seriously broken. Go home! ' + e.message);
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
