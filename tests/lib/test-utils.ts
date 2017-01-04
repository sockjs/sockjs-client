import SockJS = require('../../lib/entry');
import iframeUtils = require('../../lib/utils/iframe');
import urlUtils = require('../../lib/utils/url');
import random = require('../../lib/utils/random');

var MPrefix = '_sockjs_global';

export function getSameOriginUrl () {
    if ((<any>global).location) {
      return urlUtils.getOrigin((<any>global).location.href);
    }
    return 'http://localhost:8081';
  }

export function getCrossOriginUrl () {
    if ((<any>global).clientOptions) {
      return (<any>global).clientOptions.url;
    }
    return null;
  }

export function getUrl (path) {
    return /^http/.test(path) ? path : this.getSameOriginUrl() + path;
  }

export function newSockJs (path, transport?) {
    return new SockJS(this.getUrl(path), null, { transports: transport });
  }

export function createHook () {
    var windowId = 'a' + random.string(8);
    if (!global[MPrefix]) {
      var map = {};
      global[MPrefix] = function(id) {
        if (!(id in map)) {
          map[id] = {
            id: id,
            del: function() {
              delete map[id];
            }
          };
        }
        return map[id];
      };
    }
    return global[MPrefix](windowId);
  }

export function createIframe (path?) {
    path = path || '/iframe.html';
    var hook = this.createHook();
    hook.iobj = iframeUtils.createIframe(path + '?a=' + random.number(1000) + '#' + hook.id, function () {
      throw new Error('iframe error');
    });
    return hook;
  }
