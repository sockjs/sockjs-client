'use strict';

var getRandomBytes;
if (global && global.crypto && global.crypto.getRandomValues) {
  getRandomBytes = function (length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  getRandomBytes = function (length) {
    var bytes = new Uint8Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = getRandomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push( _randomStringChars[bytes[i] % max] );
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};
