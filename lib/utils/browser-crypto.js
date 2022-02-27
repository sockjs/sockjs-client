export function randomBytes(length) {
  const bytes = new Uint8Array(length);
  global.crypto.getRandomValues(bytes);
  return bytes;
}
