import {URL} from 'url-parse';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:utils:url');

export function getOrigin(url) {
  if (!url) {
    return null;
  }

  const p = new URL(url);
  if (p.protocol === 'file:') {
    return null;
  }

  let {port} = p;
  if (!port) {
    port = (p.protocol === 'https:') ? '443' : '80';
  }

  return p.protocol + '//' + p.hostname + ':' + port;
}

export function isOriginEqual(a, b) {
  const equalOrigin = this.getOrigin(a) === this.getOrigin(b);
  debug('same', a, b, equalOrigin);
  return equalOrigin;
}

export function isSchemeEqual(a, b) {
  return (a.split(':')[0] === b.split(':')[0]);
}

export function addPath(url, path) {
  const qs = url.split('?');
  return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
}

export function addQuery(url, q) {
  return url + (url.includes('?') ? ('&' + q) : ('?' + q));
}

export function isLoopbackAddr(addr) {
  return /^127\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/i.test(addr) || /^\[::1]$/.test(addr);
}

