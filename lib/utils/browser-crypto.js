export function randomBytes(length) {
  const bytes = new Uint8Array(length);
  if (typeof global !== 'undefined' && global.crypto && typeof global.crypto.getRandomValues === 'function') {
    global.crypto.getRandomValues(bytes);
    return bytes;
  } else {
    // Fallback: use Math.random() (not cryptographically secure)
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }
}
