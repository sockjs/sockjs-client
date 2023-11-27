'use strict';

if (globalThis.crypto && globalThis.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}
