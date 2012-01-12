SockJS family:

  * [SockJS-client](https://github.com/sockjs/sockjs-client) JavaScript client library
  * [SockJS-node](https://github.com/sockjs/sockjs-node) Node.js server
  * [SockJS-erlang](https://github.com/sockjs/sockjs-erlang) Erlang server
  * [SockJS-lua](https://github.com/luvit/sockjs-luvit) Lua/Luvit server
  * [SockJS-tornado](https://github.com/MrJoes/sockjs-tornado) Python/Tornado server
  * [vert.x](https://github.com/purplefox/vert.x) Java/vert.x server


SockJS-client
=============

SockJS is a browser JavaScript library that provides a WebSocket-like
object. SockJS gives you a coherent, cross-browser, Javascript API
which creates a low latency, full duplex, cross-domain communication
channel between the browser and the web server.

Under the hood SockJS tries to use native WebSockets first. If that
fails it can use a variety of browser-specific transport protocols and
presents them through WebSocket-like abstractions.

SockJS is intended to work for all modern browsers and in environments
which don't support WebSocket protcol, for example behind restrictive
corporate proxies.

SockJS-client does require a server counterpart:

 * [SockJS-node](https://github.com/sockjs/sockjs-node) is a SockJS
   server for Node.js.


Philosophy:

 * The API should follow
   [HTML5 Websockets API](http://dev.w3.org/html5/websockets/) as
   closely as possible.
 * All the transports must support cross domain connections out of the
   box. It's possible and recommended to host SockJS server on
   different server than your main web site.
 * There is a support for at least one streaming protocol for every
   major browser.
 * Streaming transports should work cross-domain and
   should support cookies (for cookie-based sticky sessions).
 * Polling transports are be used as a fallback for old browsers and
   hosts behind restrictive proxies.
 * Connection establishment should be fast and lightweight.
 * No Flash inside (no need to open port 843 - which doesn't work
   through proxies, no need to host 'crossdomain.xml', no need
   [to wait for 3 seconds](https://github.com/gimite/web-socket-js/issues/49)
   in order to detect problems)


Subscribe to
[SockJS mailing list](https://groups.google.com/forum/#!forum/sockjs) for
discussions and support.


Live QUnit tests and smoke tests
--------------------------------

SockJS comes with some QUnit tests and a few smoke tests (using
[SockJS-node](https://github.com/sockjs/sockjs-client) on the server
side). At the moment they are deployed in few places:

 * http://sockjs.popcnt.org/ (hosted in Europe)
 * http://sockjs.cloudfoundry.com/ (CloudFoundry, websockets disabled, loadbalanced)
 * https://sockjs.cloudfoundry.com/ (CloudFoundry SSL, websockets disabled, loadbalanced)
 * http://sockjs.herokuapp.com/ (Heroku, websockets disabled)


Example
-------

SockJS mimics [WebSockets API](http://dev.w3.org/html5/websockets/)
but instead of `WebSocket` there is a `SockJS` Javascript object.

First, you need to load SockJS JavaScript library, for example you can
put that in your http head:

    <script src="http://cdn.sockjs.org/sockjs-0.1.min.js">
      </script>

After the script is loaded you can establish a connection with the
SockJS server. Here's a simple example:

```javascript
<script>
   var sock = new SockJS('http://mydomain.com/my_prefix');
   sock.onopen = function() {
       console.log('open');
   };
   sock.onmessage = function(e) {
       console.log('message', e.data);
   };
   sock.onclose = function() {
       console.log('close');
   };
</script>
```

SockJS-client API
-----------------

### SockJS class

Similar to 'WebSocket' class 'SockJS' constructor takes one, or more arguments:

```javascript
var sockjs = new SockJS(url, protocols, options);
```

Where `options` is a hash which can contain:

 *  **debug (boolean)**

    Print more debugging messages using 'console.log'.

 *  **devel (boolean)**

    Development mode. Currently settint it affects only caching of 'iframe.html'.

 *  **cookie (boolean)**

    Disables transports which doesn't support cookies (ie: XDR on
    IE). Usefull for load balancing based on sticky sessions provided
    by JSESSIONID cookie.

Although the 'SockJS' object tries to emulate the 'WebSocket'
behaviour, it's impossible to support all features. One of the
important SockJS limitations is the fact that you're not allowed to
open more than one SockJS connection to a single domain at a time.
This limitation is caused by a in-browser limit of outgoing
connections - usually browsers don't allow opening more than two
outgoing connections to a single domain. Single SockJS session
requires those two connections - one for downloading data, other for
sending messages.  Opening second SockJS session at the same time
would most probably block and can result in both sessions timing out.

Opening more than one SockJS connection at a time is generally a
bad practice. If you absolutely must do it, you can use
mutliple subdomains, using different subdomain for every
SockJS connection.


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
XHR streaming (CORS)   | IE 8 (cookie=no), Firefox <6 |          no                |          yes
IFrame + EventSource   | Opera 10.70+                  |          no                |          yes
IFrame + HtmlFile      | IE 8 (cookie=yes)            |          no                |          yes
XHR polling (CORS)     | Chrome, Safari, Firefox, IE 8 |          no                |          no
IFrame + XHR polling   | Opera                         |          no                |          no
JsonP polling          | any                           |          no                |          no


Deployment
----------

In order to utilize best performance you should use the SockJS-client
releases hosted on SockJS CDN. You should use a version of sockjs-client
that supports the protocol used by your server. For example:

    <script src="http://cdn.sockjs.org/sockjs-0.1.min.js">
      </script>

A list of files hosted on a CDN is available here: http://sockjs.github.com/sockjs-client/ .

You can also use or CDN via https (using Cloud Front domain name):

    <script src="https://d1fxtkz8shb9d2.cloudfront.net/sockjs-0.1.js">
      </script>

For server-side deployment tricks, especially about load balancing and
session stickiness, take a look at the
[SockJS-node readme](https://github.com/sockjs/sockjs-node#readme).


Development and testing
-----------------------

SockJS-client needs [Node.js](http://nodejs.org/) for running a test
server and JavaScript minification. If you want to work on
SockJS-client source code, check out the git repo and follow this
steps:

    cd sockjs-client
    npm install --dev

To generate JavaScript run:

    make sockjs.js

To generate minified JavaScript run:

    make sockjs.min.js

(To generate both run `make build`.)


### Testing

Once you compiled SockJS-client you may want to check if your changes
pass all the tests. To run the tests you need a server that can answer
various SockJS requests. A common way is to use `SockJS-node` test
server for that. To run it (by default it will be listening on port 8081):

    cd sockjs-node
    npm install --dev
    make build
    make test_server

At this point you're ready to run a SockJS-client server that will
server your freshly compiled JavaScript and various static http and
javscript files (by default it will run on port 8080).

    cd sockjs-client
    make test

At that point you should have two web servers running: sockjs-node on
8081 and sockjs-client on 8080. When you open the browser on
[http://localhost:8080/](http://localhost:8080/) you should be able
run the QUnit tests against your sockjs-node server.

If you look at your browser console you will see warnings like that:

    Incompatibile SockJS! Main site uses: "a", the iframe: "b".

This is due to a fact that SockJS-node test server is using compiled
javascript from CDN, rather than your freshly compiled version. To fix
that you must amend `sockjs_url` that is used by SockJS-node test
server. Edit the [`config.js`](https://github.com/sockjs/sockjs-node/blob/master/examples/test_server/config.js) file:

    vim sockjs-node/examples/test_server/config.js

And replace `sockjs_url` setting which by default points to CDN:

    sockjs_url: 'http://cdn.sockjs.org/sockjs-0.1.min.js',

to a freshly compiled sockjs, for example:

    sockjs_url: 'http://localhost:8080/lib/sockjs.js',


Also, if you want to run tests agains SockJS server not running on
`localhost:8081` you may want to edit the
[`tests/config.js`](https://github.com/sockjs/sockjs-client/blob/master/tests/config.js)
file.

Additionally, if you're doing more serious development consider using
`make serve`, which will automatically reload the server when you
modify the source code.


Browser Quirks
--------------

There are various browser quirks which we don't intend to address:

 * Pressing ESC in Firefox closes SockJS connection ([described
   in socket.io thread](https://groups.google.com/group/socket_io/browse_thread/thread/a705e4cb532e8808)).
 * Some older transports may result in a browser showing "spinning
   wheel" or "busy indicator".
 * In most of the browsers you can't open more than one SockJS
   connection to one domain at the same time.
 * You shouldn't start SockJS connection before `body` loads - don't
   create SockJS objects within `head` (see #15).
 * Although SockJS is trying to escape any strange Unicode characters
   (even
   [invalid ones, like surrogates](http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates),
   it's advisable to use only valid characters. Using invalid
   characters is a bit slower, and may not work with SockJS servers
   that have a proper Unicode support.
 * Having a global function called `onmessage` or such is probably a
   bad idea.
