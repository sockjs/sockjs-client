'use strict';

var u = require('url');

module.exports = {
  getOrigin: function (url) {
    var p = u.parse(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isSameOriginUrl: function(urlA, urlB) {
    // location.origin would do, but it's not always available.
    return this.getOrigin(urlA) === this.getOrigin(urlB);
  }

, isSameOriginScheme: function(urlA, urlB) {
    return (urlA.split(':')[0] === urlB.split(':')[0]);
  }
};
