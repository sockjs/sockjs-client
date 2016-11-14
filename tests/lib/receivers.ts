'use strict';

var expect = require('expect.js')
  , JsonpReceiver = require('../../lib/transport/receiver/jsonp')
  , XhrReceiver = require('../../lib/transport/receiver/xhr')
  , XhrFake = require('../../lib/transport/sender/xhr-fake')
  , utils = require('../../lib/utils/iframe')
  ;

describe('Receivers', function () {
  describe('jsonp', function () {
    var oldTimeout = JsonpReceiver.timeout;
    var oldScriptTimeout = JsonpReceiver.scriptErrorTimeout;
    var scriptFunc = JsonpReceiver.prototype._createScript;
    before(function () {
      JsonpReceiver.prototype._createScript = function () {};
      JsonpReceiver.timeout = 300;
    });
    after(function () {
      JsonpReceiver.timeout = oldTimeout;
      JsonpReceiver.scriptErrorTimeout = oldScriptTimeout;
      JsonpReceiver.prototype._createScript = scriptFunc;
    });

    it('receives data', function (done) {
      var test = this.runnable();
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          global[utils.WPrefix][self.id]('datadata');
        }, 5);
      };
      var jpr = new JsonpReceiver('test');
      jpr.on('close', function (code, reason) {
        if (test.timedOut || test.duration) {
          return;
        }

        try {
          expect(reason).to.equal('network');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      jpr.on('message', function (msg) {
        try {
          expect(msg).to.equal('datadata');
        } catch (e) {
          done(e);
          jpr.abort();
          return;
        }
      });
    });

    it('will timeout', function (done) {
      this.timeout(500);
      var test = this.runnable();
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          if (global[utils.WPrefix][self.id]) {
            global[utils.WPrefix][self.id]('datadata');
          }
        }, 400);
      };

      var jpr = new JsonpReceiver('test');
      jpr.on('close', function (code, reason) {
        if (test.timedOut || test.duration) {
          return;
        }

        try {
          expect(reason).to.contain('timeout');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      jpr.on('message', function () {
        done(new Error('No message should be sent'));
        jpr.abort();
      });
    });

    it('aborts without sending a message', function (done) {
      var test = this.runnable();
      JsonpReceiver.prototype._createScript = function () {
        var self = this;
        setTimeout(function () {
          if (global[utils.WPrefix][self.id]) {
            global[utils.WPrefix][self.id]('datadata');
          }
        }, 200);
      };
      var jpr = new JsonpReceiver('test');
      jpr.on('close', function (code, reason) {
        if (test.timedOut || test.duration) {
          return;
        }

        try {
          expect(reason).to.contain('aborted');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      jpr.on('message', function () {
        done(new Error('No message should be sent'));
        jpr.abort();
      });
      jpr.abort();
    });

    it('will not report error if onerror triggered right before onreadystatechange (IE9)', function (done) {
      JsonpReceiver.scriptErrorTimeout = 300;
      var test = this.runnable();
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
        if (test.timedOut || test.duration) {
          return;
        }
        try {
          expect(reason).to.equal('network');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      jpr.on('message', function (msg) {
        try {
          expect(msg).to.equal('datadata');
        } catch (e) {
          done(e);
          jpr.abort();
        }
      });

      // simulate script error
      jpr._scriptError();
    });

    it('will not report error if onerror triggered right after onreadystatechange (IE9)', function (done) {
      JsonpReceiver.scriptErrorTimeout = 100;
      var test = this.runnable();
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
        if (test.timedOut || test.duration) {
          return;
        }
        try {
          expect(reason).to.equal('network');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      jpr.on('message', function (msg) {
        try {
          expect(msg).to.equal('datadata');
        } catch (e) {
          done(e);
          jpr.abort();
        }
      });

      // simulate script error
      setTimeout(function () {
        jpr._scriptError();
      }, 200);
    });
  });

  describe('xhr', function () {
    var oldTimeout;
    before(function () {
      oldTimeout = XhrFake.timeout;
      XhrFake.timeout = 100;
    });
    after(function () {
      XhrFake.timeout = oldTimeout;
    });

    it('emits multiple messages for multi-line response', function (done) {
      var test = this.runnable();
      var xhr = new XhrReceiver('test', XhrFake);
      var i = 0, responses = ['test', 'multiple', 'lines', '{}'];
      xhr.on('message', function (msg) {
        try {
          expect(msg).to.equal(responses[i]);
        } catch (e) {
          done(e);
          xhr.abort();
          return;
        }
        i++;
      });
      xhr.on('close', function (code, reason) {
        if (test.timedOut || test.duration) {
          return;
        }
        try {
          expect(reason).to.equal('network');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      xhr._chunkHandler(200, 'test\nmultiple\nlines');
    });

    it('emits no messages for an empty string response', function (done) {
      var test = this.runnable();
      var xhr = new XhrReceiver('test', XhrFake);
      var i = 0, responses = ['{}'];
      xhr.on('message', function (msg) {
        try {
          expect(i).to.be.lessThan(responses.length);
          expect(msg).to.equal(responses[i]);
        } catch (e) {
          done(e);
          xhr.abort();
          return;
        }
        i++;
      });
      xhr.on('close', function (code, reason) {
        if (test.timedOut || test.duration) {
          return;
        }
        try {
          expect(reason).to.equal('network');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      xhr._chunkHandler(200, '');
    });

    it('aborts without sending a message', function (done) {
      var test = this.runnable();
      var xhr = new XhrReceiver('test', XhrFake);
      xhr.on('message', function () {
        done(new Error());
        xhr.abort();
      });
      xhr.on('close', function (code, reason) {
        if (test.timedOut || test.duration) {
          return;
        }
        try {
          expect(reason).to.equal('user');
        } catch (e) {
          done(e);
          return;
        }
        done();
      });
      xhr.abort();
    });
  });
});
