/* eslint-env worker */
/* global SockJS */
'use strict';
importScripts('sockjs.js');

var sjs;

onmessage = function(e) {
  var msg = JSON.parse(e.data);

  if (msg.type === 'open') {
    sjs = new SockJS(msg.url, null, msg.transports);
    sjs.onmessage = function(e) {
      postMessage(JSON.stringify({ type: 'message', data: e.data }));
    };
    sjs.onopen = function() {
      postMessage(JSON.stringify({ type: 'open' }));
    };
    sjs.onclose = function(e) {
      postMessage(JSON.stringify({ type: 'close', code: e.code, reason: e.reason }));
    };
    sjs.onerror = function(e) {
      postMessage(JSON.stringify({ type: 'error ', data: e.toString() }));
    };
    return;
  }

  if (msg.type === 'message') {
    sjs.send(msg.data);
    return;
  }

  if (msg.type === 'close') {
    sjs.close();
    return;
  }
};
