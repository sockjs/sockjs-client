'use strict';

var expect = require('expect.js')
  , http = require('http')
  , XhrDriver = require('../../lib/transport/driver/xhr')
  ;

describe('The XHR driver of Node.js', function () {
  var server;
  var url;

  beforeEach(function (done) {
    server = http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=UTF-8' });
      res.write('o\n');
      if (req.url === '/drop') {
        // The connection drops after the response starts.
        setTimeout(function () {
          req.socket.destroy();
        }, 20);
      } else {
        res.end('c[3000,"Go away!"]\n');
      }
    });
    server.listen(0, '127.0.0.1', function () {
      url = 'http://127.0.0.1:' + server.address().port;
      done();
    });
  });

  afterEach(function (done) {
    server.close(function () {
      done();
    });
  });

  function finishes(path, cb) {
    var got = [];
    var xo = new XhrDriver('POST', url + path, null);
    xo.on('finish', function (status, text) {
      got.push({ status: status, text: text });
      // Wait for a second finish event.
      setTimeout(function () {
        xo.close();
        cb(got);
      }, 50);
    });
  }

  it('should finish one time with the status 0 when the connection drops during the response', function (done) {
    finishes('/drop', function (got) {
      try {
        expect(got.length).to.be(1);
        expect(got[0].status).to.be(0);
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });

  it('should finish one time with the status of a complete response', function (done) {
    finishes('/complete', function (got) {
      try {
        expect(got).to.eql([{ status: 200, text: 'o\nc[3000,"Go away!"]\n' }]);
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });
});
