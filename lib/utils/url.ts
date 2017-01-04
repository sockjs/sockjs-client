'use strict';

var URL = require('url-parse');

var debug = function (..._) {
};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:url');
}

export function getOrigin(url) {
  if (!url) {
    return null;
  }

  var p = new URL(url, null, null);
  if (p.protocol === 'file:') {
    return null;
  }

  var port = p.port;
  if (!port) {
    port = (p.protocol === 'https:') ? '443' : '80';
  }

  return p.protocol + '//' + p.hostname + ':' + port;
}

export function isOriginEqual(a, b) {
  var res = this.getOrigin(a) === this.getOrigin(b);
  debug('same', a, b, res);
  return res;
}

export function isSchemeEqual(a, b) {
  return (a.split(':')[0] === b.split(':')[0]);
}

export function addPath(url, path) {
  var qs = url.split('?');
  return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
}

export function addQuery(url, q) {
  return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
}
