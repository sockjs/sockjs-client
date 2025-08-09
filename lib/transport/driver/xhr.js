import {EventEmitter} from 'node:events';
import http from 'node:http';
import https from 'node:https';
import {URL} from 'url-parse';
import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:driver:xhr');

class XhrDriver extends EventEmitter {
  constructor(method, url, payload, options_) {
    debug(method, url, payload);
    super();

    const parsedUrl = new URL(url);
    const options = {
      method,
      hostname: parsedUrl.hostname.replace(/\[|\]/g, ''),
      port: parsedUrl.port,
      path: parsedUrl.pathname + (parsedUrl.query || ''),
      headers: options_ && options_.headers,
    };

    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    this.req = protocol.request(options, resp => {
      resp.setEncoding('utf8');
      let responseText = '';

      resp.on('data', chunk => {
        debug('data', chunk);
        responseText += chunk;
        this.emit('chunk', 200, responseText);
      });
      resp.once('end', () => {
        debug('end');
        this.emit('finish', resp.statusCode, responseText);
        this.req = null;
      });
    });

    this.req.on('error', evt => {
      debug('error', evt);
      this.emit('finish', 0, evt.message);
    });

    if (payload) {
      this.req.write(payload);
    }

    this.req.end();
  }

  close() {
    debug('close');
    this.removeAllListeners();
    if (this.req) {
      this.req.abort();
      this.req = null;
    }
  }

  static enabled = true;
  static supportsCORS = true;
}

export default XhrDriver;
