'use strict';

var expect = require('expect.js');

function clearEventUtilsCache() {
  delete require.cache[require.resolve('../../lib/utils/event')];
}

describe('utils/event', function () {
  var originalAddEventListener;
  var originalOnPageHide;
  var originalChrome;
  var hadOnPageHide;
  var hadChrome;

  beforeEach(function () {
    originalAddEventListener = global.addEventListener;
    hadOnPageHide = Object.prototype.hasOwnProperty.call(global, 'onpagehide');
    originalOnPageHide = global.onpagehide;
    hadChrome = Object.prototype.hasOwnProperty.call(global, 'chrome');
    originalChrome = global.chrome;
    // Ensure not a packaged app during tests
    global.chrome = null;
  });

  afterEach(function () {
    global.addEventListener = originalAddEventListener;
    if (hadOnPageHide) {
      global.onpagehide = originalOnPageHide;
    } else {
      delete global.onpagehide;
    }
    if (hadChrome) {
      global.chrome = originalChrome;
    } else {
      delete global.chrome;
    }
    clearEventUtilsCache();
  });

  it('uses pagehide when supported', function () {
    var registeredEvents = [];
    global.addEventListener = function (event, listener) {
      registeredEvents.push(event);
    };
    global.onpagehide = function () {};

    clearEventUtilsCache();
    var eventUtils = require('../../lib/utils/event');
    expect(eventUtils).to.be.ok();

    expect(registeredEvents).to.eql(['pagehide']);
  });

  it('falls back to unload when pagehide unsupported', function () {
    var registeredEvents = [];
    global.addEventListener = function (event, listener) {
      registeredEvents.push(event);
    };
    delete global.onpagehide;

    clearEventUtilsCache();
    var eventUtils = require('../../lib/utils/event');
    expect(eventUtils).to.be.ok();

    expect(registeredEvents).to.eql(['unload']);
  });
});
