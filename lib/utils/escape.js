// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex, no-misleading-character-class
const extraEscapable = /[\u0000-\u001F\uD800-\uDFFF\uFFFE\uFFFF\u0300-\u0333\u033D-\u0346\u034A-\u034C\u0350-\u0352\u0357\u0358\u035C-\u0362\u0374\u037E\u0387\u0591-\u05AF\u05C4\u0610-\u0617\u0653\u0654\u0657-\u065B\u065D\u065E\u06DF-\u06E2\u06EB\u06EC\u0730\u0732\u0733\u0735\u0736\u073A\u073D\u073F-\u0741\u0743\u0745\u0747\u07EB-\u07F1\u0951\u0958-\u095F\u09DC\u09DD\u09DF\u0A33\u0A36\u0A59-\u0A5B\u0A5E\u0B5C\u0B5D\u0E38\u0E39\u0F43\u0F4D\u0F52\u0F57\u0F5C\u0F69\u0F72-\u0F76\u0F78\u0F80-\u0F83\u0F93\u0F9D\u0FA2\u0FA7\u0FAC\u0FB9\u1939\u193A\u1A17\u1B6B\u1CDA\u1CDB\u1DC0-\u1DCF\u1DFC\u1DFE\u1F71\u1F73\u1F75\u1F77\u1F79\u1F7B\u1F7D\u1FBB\u1FBE\u1FC9\u1FCB\u1FD3\u1FDB\u1FE3\u1FEB\u1FEE\u1FEF\u1FF9\u1FFB\u1FFD\u2000\u2001\u20D0\u20D1\u20D4-\u20D7\u20E7-\u20E9\u2126\u212A\u212B\u2329\u232A\u2ADC\u302B\u302C\uAAB2\uAAB3\uF900-\uFA0D\uFA10\uFA12\uFA15-\uFA1E\uFA20\uFA22\uFA25\uFA26\uFA2A-\uFA2D\uFA30-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4E\uFFF0-\uFFFF]/g;
let extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
function unrollLookup(escapable) {
  const unrolled = {};
  const c = [];
  for (let i = 0; i < 65_536; i++) {
    c.push(String.fromCodePoint(i));
  }

  escapable.lastIndex = 0;
  c.join('').replace(escapable, a => {
    unrolled[a] = '\\u' + ('0000' + a.codePointAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
}

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
export function quote(string) {
  const quoted = JSON.stringify(string);

  // In most cases this should be very fast and good enough.
  extraEscapable.lastIndex = 0;
  if (!extraEscapable.test(quoted)) {
    return quoted;
  }

  if (!extraLookup) {
    extraLookup = unrollLookup(extraEscapable);
  }

  return quoted.replace(extraEscapable, a => extraLookup[a]);
}
