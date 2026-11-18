'use strict';

var expect = require('expect.js')
  , SockJS = require('../../lib/entry')
  ;

describe('SockJS', function() {
  describe('close() while a transport waits for the page load', function () {
    var names = ['document', 'addEventListener', 'removeEventListener'];
    var saved = {};

    beforeEach(function () {
      names.forEach(function (name) {
        saved[name] = { has: Object.prototype.hasOwnProperty.call(global, name), value: global[name] };
      });
    });

    afterEach(function () {
      names.forEach(function (name) {
        if (saved[name].has) {
          global[name] = saved[name].value;
        } else {
          delete global[name];
        }
      });
    });

    it('should remove the load listener and connect no transport on load', function () {
      var listeners = [];
      global.document = { body: null, readyState: 'loading' };
      global.addEventListener = function (event, listener) {
        listeners.push({ event: event, listener: listener });
      };
      global.removeEventListener = function (event, listener) {
        listeners = listeners.filter(function (l) {
          return l.event !== event || l.listener !== listener;
        });
      };

      var created = 0;
      function StubTransport() {
        created++;
      }
      StubTransport.prototype.on = StubTransport.prototype.once = function () {};
      StubTransport.transportName = 'stub';
      StubTransport.needBody = true;
      StubTransport.roundTrips = 1;

      var s = new SockJS('http://localhost');
      // The info request is done, and the transport waits for the page load.
      s._ir.close();
      s._ir = null;
      s._transUrl = s.url;
      s._transports = [StubTransport];
      s._connect();
      expect(listeners.map(function (l) {
        return l.event;
      })).to.eql(['load']);

      s.close();
      // the page load
      global.document = { body: {}, readyState: 'complete' };
      listeners.forEach(function (l) {
        l.listener();
      });

      expect(created).to.be(0);
      expect(listeners).to.eql([]);
      expect(s._transports).to.eql([]);
    });
  });
});
