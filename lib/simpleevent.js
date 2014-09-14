'use strict';

var SimpleEvent = function(type, obj) {
  this.type = type;
  if (typeof obj !== 'undefined') {
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) {
        continue;
      }
      this[k] = obj[k];
    }
  }
};

SimpleEvent.prototype.toString = function() {
  var r = [];
  for (var k in this) {
    if (!this.hasOwnProperty(k)) {
      continue;
    }
    var v = this[k];
    if (typeof v === 'function') {
      v = '[function]';
    }
    r.push(k + '=' + v);
  }
  return 'SimpleEvent(' + r.join(', ') + ')';
};

module.exports = SimpleEvent;
