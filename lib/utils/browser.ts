export function isOpera() {
  return (<any>global).navigator &&
    /opera/i.test((<any>global).navigator.userAgent);
}

export function isKonqueror() {
  return (<any>global).navigator &&
    /konqueror/i.test((<any>global).navigator.userAgent);
}

// #187 wrap document.domain in try/catch because of WP8 from file:///
export function hasDomain() {
  // non-browser client always has a domain
  if (!(<any>global).document) {
    return true;
  }

  try {
    return !!(<any>global).document.domain;
  } catch (e) {
    return false;
  }
}
