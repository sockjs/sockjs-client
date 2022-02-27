export function isObject(object) {
  const type = typeof object;
  return type === 'function' || (type === 'object' && Boolean(object));
}

export function extend(object, ...args) {
  if (!this.isObject(object)) {
    return object;
  }

  let source;
  let prop;
  for (source in args) {
    if (Object.prototype.hasOwnProperty.call(args, source)) {
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          object[prop] = source[prop];
        }
      }
    }
  }

  return object;
}
