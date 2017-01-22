var randomBytes;
if (global.crypto && global.crypto.getRandomValues) {
  randomBytes = function randomBytes(length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  }
} else {
  randomBytes = function randomBytes(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }
}

export { randomBytes };
