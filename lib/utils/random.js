/* global crypto:true */
import { randomBytes } from 'crypto';

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
function string(length) {
  var max = _randomStringChars.length;
  var bytes = randomBytes(length);
  var ret = [];
  for (var i = 0; i < length; i++) {
    ret.push(_randomStringChars.substr(bytes[i] % max, 1));
  }
  return ret.join('');
}

function number(max) {
  return Math.floor(Math.random() * max);
}

function numberString(max) {
  var t = ('' + (max - 1)).length;
  var p = new Array(t + 1).join('0');
  return (p + number(max)).slice(-t);
}

export { string, number, numberString };
