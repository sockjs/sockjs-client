'use strict';

var expect = require('expect.js')
  , JsonpReceiver = require('../lib/transport/receiver/jsonp')
  , utils = require('../lib/utils')
  ;

describe('Receivers', function () {
  describe('jsonp', function () {
    before(function () {
      JsonpReceiver.prototype._createScript = function () {};
      JsonpReceiver.timeout = 300;
    });

    it('receives data', function (done) {
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          global[utils.WPrefix][self.id]('datadata');
        }, 5);
      };
      var jpr = new JsonpReceiver('test');
      jpr.onclose = function (e) {
        expect(e.reason).to.eql('network');
        done();
      };
      jpr.onmessage = function (e) {
        expect(e.data).to.eql('datadata');
      };
    });

    it('will timeout', function (done) {
      this.timeout(500);
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          global[utils.WPrefix][self.id]('datadata');
        }, 400);
      };

      var jpr = new JsonpReceiver('test');
      jpr.onclose = function (e) {
        expect(e.reason).to.contain('timeout');
        done();
      };
      jpr.onmessage = function () {
        expect().fail('No message should be sent');
      };
    });

    it('will abort without sending a message', function (done) {
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          global[utils.WPrefix][self.id]('datadata');
        }, 200);
      };
      var jpr = new JsonpReceiver('test');
      jpr.onclose = function (e) {
        expect(e.reason).to.contain('aborted');
        done();
      };
      jpr.onmessage = function () {
        expect().fail('No message should be sent');
      };
      jpr.abort();
    });

    it('will not report error if onerror triggered right before onreadystatechange (IE9)', function (done) {
      JsonpReceiver.scriptErrorTimeout = 300;
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        // simulate a normal JSONP response
        setTimeout(function () {
          self.loadedOkay = true;
          global[utils.WPrefix][self.id]('datadata');
        }, 200);
      };

      var jpr = new JsonpReceiver('test');
      jpr.onclose = function (e) {
        expect(e.reason).to.eql('network');
        done();
      };
      jpr.onmessage = function (e) {
        expect(e.data).to.eql('datadata');
      };

      // simulate script error
      jpr._scriptError();
    });

    it('will not report error if onerror triggered right after onreadystatechange (IE9)', function (done) {
      JsonpReceiver.scriptErrorTimeout = 100;
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        // simulate a normal JSONP response
        setTimeout(function () {
          self.loadedOkay = true;
          global[utils.WPrefix][self.id]('datadata');
        }, 100);
      };

      var jpr = new JsonpReceiver('test');
      jpr.onclose = function (e) {
        expect(e.reason).to.eql('network');
        done();
      };
      jpr.onmessage = function (e) {
        expect(e.data).to.eql('datadata');
      };

      // simulate script error
      setTimeout(function () {
        jpr._scriptError();  
      }, 150);
    });
  });
});
