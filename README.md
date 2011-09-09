SockJS
======

SockJS is a JavaScript library that creates a WebSockets-like object,
which allows low latency full duplex communication between browsers
and your web servers.

SockJS tries to use WebSockets, but it can use different transports
for browsers that don't support HTML5 or are running behind a
restrictive proxy.

Philosophy:

 * All the transports support cross domain connections out of the
   box. It's possible and recommended to host SockJS server on
   different domain than your main web site.
 * There is a support for at least one streaming protocol for every
   major browser.
 * Polling transports are be used as a fallback for old browsers and
   hosts behind restrictive proxies.
 * No Flash inside (no need to open port 843 - which doesn't work
   through proxies, no need to host 'crossdomain.xml', no need
   [to wait for 3 seconds](https://github.com/gimite/web-socket-js/issues/49)
   in order to detect problems)
 * Connection establishment should be fast and lightweight.
 * The API should follow
   [HTML5 Websockets API](http://dev.w3.org/html5/websockets/) as
   closely as possible (but we're not there yet).


Subscribe to
[SockJS mailing list](http://groups.google.com/group/sockjs) for
discussions and support.


Live QUnit tests and smoke tests
--------------------------------

SockJS comes with some QUnit tests and a few smoke tests (using
[SockJS-node](https://github.com/majek/sockjs-client) on the server
side). At the moment they are deployed in few places:

 * http://sockjs.popcnt.org/ (hosted in Europe)
 * http://sockjs.cloudfoundry.com/ (CloudFoundry, websockets disabled, loadbalanced)
 * https://sockjs.cloudfoundry.com/ (CloudFoundry SSL, websockets disabled, loadbalanced)
 * http://sockjs.herokuapp.com/ (Heroku, websockets disabled)


Example
-------

SockJS mimics [WebSockets API](http://dev.w3.org/html5/websockets/),
 instead of `WebSocket` there is `SockJS` JavaScript object.

First, you need to load SockJS JavaScript library, for example you can
put that in your http head:

    <script src="http://majek.github.com/sockjs-client/sockjs-latest.min.js">
      </script>

After the script is loaded you can establish a connection with the
SockJS server. Here's a simple example:

    <script>
      var sockjs = new SockJS('http://mydomain.com/my_prefix');
      sockjs.onopen = function() {
          console.log('open', e.data);
      };
      sockjs.onmessage = function(e) {
          console.log('message', e.data);
      };
      sockjs.onclose = function(e) {
          console.log('close', e.data);
      };
    </script>


SockJS-client API
-----------------

### SockJS class

Similar to 'WebSocket' class 'SockJS' constructor takes one, or more arguments:

```javascript
var sockjs = new SockJS(url, protocols, options);
```

Where `options` is a hash which can contain:

<dl>
<dt>debug (boolean)</dt>
<dd>Print more debugging messages using 'console.log'.</dd>
<dt>devel (boolean)</dt>
<dd>Development mode. Currently settint it affects only caching of 'iframe.html'.</dd>
<dt>cookie (boolean)</dt>
<dd>Disables transports which doesn't support cookies (ie: XDR on
    IE). Usefull for load balancing based on sticky sessions provided by
    JSESSIONID cookie.</dd>
<dt></dt>
<dd></dd>
</dl>


Supported transports (#1)
-------------------------

Protocol                                          | Browser
------------------------------------------------- | -------------
[WebSocket hixie-76][^1]                          | Chrome 6-12, Safari 5, Firefox 4 (disabled), Opera 11 (disabled)
[WebSocket hybi-10][^2]                           | Chrome 14+, Firefox 6+
[IFrame via postMessage][^3] + [EventSource][^4]  | Opera 10.70+, Firefox 3.5+
[XDR (CORS) streaming][^7]                        | IE 8 (no cookies), Firefox 3.5+, Safari 4+, Chrome 3+
[IFrame via postMessage][^3] + [HtmlFile][^8]     | IE 8 (with cookies)
[XDR (CORS) polling][^5]                          | IE 8, Firefox 3.5+, Safari 4+, Chrome 3+ (through misbehaving proxy)
[IFrame via postMessage][^3] + XHR polling        | Opera 9+
[JsonP polling][^6]                               | (rough and slow fallback)


[^1]: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
[^2]: http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10
[^3]: https://developer.mozilla.org/en/DOM/window.postMessage
[^4]: http://dev.w3.org/html5/eventsource/
[^5]: https://secure.wikimedia.org/wikipedia/en/wiki/XMLHttpRequest#Cross-domain_requests
[^6]: https://secure.wikimedia.org/wikipedia/en/wiki/JSONP
[^7]: http://www.debugtheweb.com/test/teststreaming.aspx
[^8]: http://cometdaily.com/2007/11/18/ie-activexhtmlfile-transport-part-ii/


Supported transports (#2)
-------------------------

Transport              | Target browsers               | Good loadbalancer required |  Behaving proxy required
---------------------- | ----------------------------- | -------------------------- | ------------------------
WebSocket              | Chrome, Safari, Firefox 6+    |          yes               |          yes
IFrame + EventSource   | Opera 10.70+                  |          no                |          yes
IFrame + HtmlFile      | IE 8 (cookies=yes)            |          no                |          yes
XHR streaming (CORS)   | IE 8 (cookies=no), Firefox <6 |          no                |          yes
XHR polling (CORS)     | Chrome, Safari, Firefox, IE 8 |          no                |          no
IFrame + XHR polling   | Opera                         |          no                |          no
JsonP polling          | any                           |          no                |          no


Deployment
----------

There should be a proper CDN to host generated javascript for SockJS,
but there isn't one yet. In the meantime you can use releases hosted
on Github: http://majek.github.com/sockjs-client/ .

For server-side deployment tricks, especially about load balancing and
session stickiness, take a look at the
[SockJS-node readme](https://github.com/majek/sockjs-node#readme).


Development
-----------

SockJS-client uses [Node.js](http://nodejs.org/) for testing and
javascript minification. If you want to play with SockJS code, check
out the git repo and follow this steps:

    npm install

(SockJS-client uses
[SockJS-node](https://github.com/majek/sockjs-node) for testing, you
may want to link 'node_modules/sockjs' to directory with cloned
SockJS-node.)

To generate javascript run:

    make sockjs.js

To generate minified javascript run:

    make sockjs.min.js

(To generate both run `make build`.)


### Testing

To run qunit tests, type:

    make test

This command runs script 'tests/server.js' which starts a web server
that listens on http://127.0.0.1:8000/ . It serves static QUnit files
and serves a simple SockJS.

To run QUnit tests simply point your browser at
http://127.0.0.1:8000/.

If you want the javascript to be recompiled when the source files are
modified and automatically restart the http server run `make serve`.
You will need 'inotifywait' command from package `inotify-tools`.

