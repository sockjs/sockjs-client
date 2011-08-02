
SockJS
======

HTML5 WebSockets-like API for the older browsers.

 * No Flash inside (no need to open port 843 - which often doesn't
   work through proxies, no need to host `crossdomain.xml`)
 * All the transports support cross domain connections. It's possible
   and recommended to host SockJS on different domain than your main
   web site.
 * Polling transports are be used as a fallback for old browsers and
   hosts behind restrictive proxies.


Supported transports
--------------------

Protocol                      | Browser
----------------------------- | -------------
WebSocket hixie-76[^1]        | Chrome 6-12
WebSocket-hybi-10[^2]         | Chrome 14+, Firefox 6+
Cross domain XHR - multipart  | IE 8, Firefox 3.5+, Safari 4+
Cross domain XHR - polling    | IE 8, Firefox 3.5+, Safari 4+, Chrome 3+ (through misbehaving proxy)
Iframe[^3]  + XHR polling     | Opera 9+
JsonP polling                 | (fallback)


[^1]: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
[^2]: http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10
[^3]: Using [`postMessage` feature ](https://developer.mozilla.org/en/DOM/window.postMessage)
