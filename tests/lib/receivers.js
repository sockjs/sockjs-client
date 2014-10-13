'use strict';

var expect = require('expect.js')
  , JsonpReceiver = require('../../lib/transport/receiver/jsonp')
  , XhrReceiver = require('../../lib/transport/receiver/xhr')
  , XhrFake = require('../../lib/transport/sender/xhr-fake')
  , utils = require('../../lib/utils/iframe')
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
      jpr.on('close', function (code, reason) {
        expect(reason).to.eql('network');
        done();
      });
      jpr.on('message', function (msg) {
        expect(msg).to.eql('datadata');
      });
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
      jpr.on('close', function (code, reason) {
        expect(reason).to.contain('timeout');
        done();
      });
      jpr.on('message', function () {
        expect().fail('No message should be sent');
      });
    });

    it('aborts without sending a message', function (done) {
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          global[utils.WPrefix][self.id]('datadata');
        }, 200);
      };
      var jpr = new JsonpReceiver('test');
      jpr.on('close', function (code, reason) {
        expect(reason).to.contain('aborted');
        done();
      });
      jpr.on('message', function () {
        expect().fail('No message should be sent');
      });
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
      jpr.on('close', function (code, reason) {
        expect(reason).to.eql('network');
        done();
      });
      jpr.on('message', function (msg) {
        expect(msg).to.eql('datadata');
      });

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
      jpr.on('close', function (code, reason) {
        expect(reason).to.eql('network');
        done();
      });
      jpr.on('message', function (msg) {
        expect(msg).to.eql('datadata');
      });

      // simulate script error
      setTimeout(function () {
        jpr._scriptError();
      }, 150);
    });
  });

  describe('xhr', function () {
    before(function () {
      XhrFake.timeout = 100;
    });

    it('emits multiple messages for multi-line response', function (done) {
      var xhr = new XhrReceiver('test', XhrFake);
      var i = 0, responses = ['test', 'multiple', 'lines', '{}'];
      xhr.on('message', function (msg) {
        expect(msg).to.be.eql(responses[i]);
        i++;
      });
      xhr.on('close', function (code, reason) {
        expect(reason).to.be.eql('network');
        done();
      });
      xhr._chunkHandler(200, 'test\nmultiple\nlines');
    });

    it('emits no messages for an empty string response', function (done) {
      var xhr = new XhrReceiver('test', XhrFake);
      var i = 0, responses = ['{}'];
      xhr.on('message', function (msg) {
        expect(i).to.be.lessThan(responses.length);
        expect(msg).to.be.eql(responses[i]);
        i++;
      });
      xhr.on('close', function (code, reason) {
        expect(reason).to.be.eql('network');
        done();
      });
      xhr._chunkHandler(200, '');
    });

    it('aborts without sending a message', function (done) {
      var xhr = new XhrReceiver('test', XhrFake);
      xhr.on('message', function () {
        expect().fail();
      });
      xhr.on('close', function (code, reason) {
        expect(reason).to.be.eql('user');
        done();
      });
      xhr.abort();
    });
  });
});
