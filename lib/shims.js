'use strict';

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
