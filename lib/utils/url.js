import URL from 'url-parse';
import Debug from 'debug';
var debug = Debug('sockjs-client:utils:url');

function getOrigin(url) {
  if (!url) {
    return null;
  }

  var p = new URL(url);
  if (p.protocol === 'file:') {
    return null;
  }

  var port = p.port;
  if (!port) {
    port = (p.protocol === 'https:') ? '443' : '80';
  }

  return p.protocol + '//' + p.hostname + ':' + port;
}

function isOriginEqual(a, b) {
  var res = getOrigin(a) === getOrigin(b);
  debug('same', a, b, res);
  return res;
}

function isSchemeEqual(a, b) {
  return (a.split(':')[0] === b.split(':')[0]);
}

function addPath(url, path) {
  var qs = url.split('?');
  return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
}

function addQuery(url, q) {
  return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
}

export {
  getOrigin,
  isOriginEqual,
  isSchemeEqual,
  addPath,
  addQuery
};
