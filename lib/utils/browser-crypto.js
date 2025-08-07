export function randomBytes(length) {
  const bytes = new Uint8Array(length);
  if (typeof global !== 'undefined' && global.crypto && typeof global.crypto.getRandomValues === 'function') {
    global.crypto.getRandomValues(bytes);
    return bytes;
  } else {
    throw new Error('Secure random number generation is not supported by this environment.');
  }
}
