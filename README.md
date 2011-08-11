
SockJS
======

Pure JavaScript WebSockets-like API for browsers that don't support
HTML5 or are running behind a restrictive proxy.

Philosophy:

 * No Flash inside (no need to open port 843 - which doesn't work
   through proxies, no need to host `crossdomain.xml`, no need
   [to wait for 3 seconds](https://github.com/gimite/web-socket-js/issues/49)
   in order to detect that)
 * All the transports support cross domain connections. It's possible
   and recommended to host SockJS server on different domain than your
   main web site.
 * There is a support for at least one streaming protocol for every
   major browser.
 * Polling transports are be used as a fallback for old browsers and
   hosts behind restrictive proxies.
 * Connection establishment should be fast and lightweight.

Supported transports
--------------------

Protocol                                          | Browser
------------------------------------------------- | -------------
[WebSocket hixie-76][^1]                          | Chrome 6-12, Safari 5, Firefox 4 (disabled), Opera 11 (disabled)
[WebSocket hybi-10][^2]                           | Chrome 14+, Firefox 6+
[IFrame via postMessage][^3] + [EventSource][^4]  | Opera 10.70+, Firefox 3.5+
[XDR streaming][^7] (CORS)                        | IE 8, Firefox 3.5+, Safari 4+, Chrome 3+
[XDR polling][^5] (CORS)                          | IE 8, Firefox 3.5+, Safari 4+, Chrome 3+ (through misbehaving proxy)
[IFrame via postMessage][^3] + XHR polling        | Opera 9+
[JsonP polling][^6]                               | (fallback)


[^1]: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
[^2]: http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10
[^3]: https://developer.mozilla.org/en/DOM/window.postMessage
[^4]: http://dev.w3.org/html5/eventsource/
[^5]: https://secure.wikimedia.org/wikipedia/en/wiki/XMLHttpRequest#Cross-domain_requests
[^6]: https://secure.wikimedia.org/wikipedia/en/wiki/JSONP
[^7]: http://www.debugtheweb.com/test/teststreaming.aspx
