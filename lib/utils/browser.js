function isOpera() {
  return global.navigator &&
    /opera/i.test(global.navigator.userAgent);
}

function isKonqueror() {
  return global.navigator &&
    /konqueror/i.test(global.navigator.userAgent);
}

  // #187 wrap document.domain in try/catch because of WP8 from file:///
function hasDomain() {
  // non-browser client always has a domain
  if (!global.document) {
    return true;
  }

  try {
    return !!global.document.domain;
  } catch (e) {
    return false;
  }
}

export { isOpera, isKonqueror, hasDomain };
