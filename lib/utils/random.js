import {randomBytes} from 'node:crypto';

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
const _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
export function string(length) {
  const max = _randomStringChars.length;
  const bytes = randomBytes(length);
  const returnValue = [];
  for (let i = 0; i < length; i++) {
    returnValue.push(_randomStringChars.slice(bytes[i] % max, (bytes[i] % max) + 1));
  }

  return returnValue.join('');
}

export function number(max) {
  return Math.floor(Math.random() * max);
}

export function numberString(max) {
  const t = (String(max - 1)).length;
  const p = Array.from({length: t + 1}).join('0');
  return (p + this.number(max)).slice(-t);
}
