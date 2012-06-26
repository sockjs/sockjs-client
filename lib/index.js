// Public object
var SockJS = (function(){
              var _document = document;
              var _window = window;
              var utils = {};

<!-- include lib/reventtarget.js -->
<!-- include lib/simpleevent.js -->
<!-- include lib/eventemitter.js -->
<!-- include lib/utils.js -->
<!-- include lib/dom.js -->
<!-- include lib/dom2.js -->
<!-- include lib/sockjs.js -->
<!-- include lib/trans-websocket.js -->
<!-- include lib/trans-sender.js -->
<!-- include lib/trans-jsonp-receiver.js -->
<!-- include lib/trans-jsonp-polling.js -->
<!-- include lib/trans-xhr.js -->
<!-- include lib/trans-iframe.js -->
<!-- include lib/trans-iframe-within.js -->
<!-- include lib/info.js -->
<!-- include lib/trans-iframe-eventsource.js -->
<!-- include lib/trans-iframe-xhr-polling.js -->
<!-- include lib/trans-iframe-htmlfile.js -->
<!-- include lib/trans-polling.js -->
<!-- include lib/trans-receiver-eventsource.js -->
<!-- include lib/trans-receiver-htmlfile.js -->
<!-- include lib/trans-receiver-xhr.js -->
<!-- include lib/test-hooks.js -->
                  return SockJS;
          })();
if ('_sockjs_onload' in window) setTimeout(_sockjs_onload, 1);

// AMD compliance
if (typeof define === 'function' && define.amd) {
    define('sockjs', [], function(){return SockJS;});
}

if (typeof module === 'object' && module && module.exports) {
    module.exports = SockJS;
}
