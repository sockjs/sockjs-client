// Public object
SockJS = (function(){
              var _document = document;
              var _window = window;
<!-- include lib/reventtarget.js -->
<!-- include lib/simpleevent.js -->
<!-- include lib/utils.js -->
<!-- include lib/sockjs.js -->
<!-- include lib/trans-ws.js -->
<!-- include lib/trans-jsonp-sender.js -->
<!-- include lib/trans-jsonp.js -->
<!-- include lib/trans-iframe.js -->
<!-- include lib/trans-iframe-within.js -->
<!-- include lib/trans-iframe-eventsource.js -->
                  return SockJS;
          })();
if ('_sockjs_onload' in window) setTimeout(function(){_sockjs_onload();}, 0);
