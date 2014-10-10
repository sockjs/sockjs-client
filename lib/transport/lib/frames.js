'use strict';

var JSON3 = require('JSON3');

module.exports = {
  close: function (code, reason) {
    return 'c' + JSON3.stringify([code, reason]);
  }
};
