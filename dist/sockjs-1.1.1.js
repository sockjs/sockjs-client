/* sockjs-client v1.1.1 | http://sockjs.org | MIT license */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.SockJS=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'ts-helpers', './transport-list'], factory);
    }
})(function (require, exports) {
    "use strict";
    require('ts-helpers');
    var transportList = require('./transport-list');
    // TODO can't get rid of this until all servers do
    if ('_sockjs_onload' in global) {
        setTimeout(global._sockjs_onload, 1);
    }
    return require('./main')(transportList);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAndHMtaGVscGVycycsICcuL3RyYW5zcG9ydC1saXN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmVxdWlyZSgndHMtaGVscGVycycpO1xuICAgIHZhciB0cmFuc3BvcnRMaXN0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQtbGlzdCcpO1xuICAgIC8vIFRPRE8gY2FuJ3QgZ2V0IHJpZCBvZiB0aGlzIHVudGlsIGFsbCBzZXJ2ZXJzIGRvXG4gICAgaWYgKCdfc29ja2pzX29ubG9hZCcgaW4gZ2xvYmFsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZ2xvYmFsLl9zb2NranNfb25sb2FkLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vbWFpbicpKHRyYW5zcG9ydExpc3QpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnRyeS5qcy5tYXAiXX0=
},{"./main":14,"./transport-list":16,"ts-helpers":61}],2:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './event'], factory);
    }
})(function (require, exports) {
    "use strict";
    var event_1 = require('./event');
    var CloseEvent = (function (_super) {
        __extends(CloseEvent, _super);
        function CloseEvent() {
            _super.call(this, 'close', false, false);
            this.wasClean = false;
            this.code = 0;
            this.reason = '';
        }
        return CloseEvent;
    }(event_1["default"]));
    exports.__esModule = true;
    exports["default"] = CloseEvent;
});
//# sourceMappingURL=close.js.map
},{"./event":4}],3:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './eventtarget'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventTarget = require('./eventtarget');
    var EventEmitter = (function (_super) {
        __extends(EventEmitter, _super);
        function EventEmitter() {
            _super.call(this);
            this.addListener = _super.prototype.addEventListener;
            this.on = _super.prototype.addEventListener;
            this.removeListener = _super.prototype.removeEventListener;
        }
        EventEmitter.prototype.removeAllListeners = function (type) {
            if (type) {
                delete this._listeners[type];
            }
            else {
                this._listeners = {};
            }
        };
        EventEmitter.prototype.once = function (type, listener) {
            var self = this, fired = false;
            function g() {
                self.removeListener(type, g);
                if (!fired) {
                    fired = true;
                    listener.apply(this, arguments);
                }
            }
            this.on(type, g);
        };
        EventEmitter.prototype.emit = function () {
            var type = arguments[0];
            var listeners = this._listeners[type];
            if (!listeners) {
                return;
            }
            // equivalent of Array.prototype.slice.call(arguments, 1);
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var ai = 1; ai < l; ai++) {
                args[ai - 1] = arguments[ai];
            }
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].apply(this, args);
            }
        };
        return EventEmitter;
    }(EventTarget));
    exports.EventEmitter = EventEmitter;
});
//# sourceMappingURL=emitter.js.map
},{"./eventtarget":5}],4:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Event = (function () {
        function Event(type, bubbles, cancelable) {
            this.type = type;
            this.bubbles = bubbles;
            this.cancelable = cancelable;
            this.timeStamp = +new Date();
        }
        Event.prototype.stopPropagation = function () {
        };
        ;
        Event.prototype.preventDefault = function () {
        };
        ;
        Event.CAPTURING_PHASE = 1;
        Event.AT_TARGET = 2;
        Event.BUBBLING_PHASE = 3;
        return Event;
    }());
    exports.__esModule = true;
    exports["default"] = Event;
});
//# sourceMappingURL=event.js.map
},{}],5:[function(require,module,exports){
/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return (function () {
        function EventTarget() {
            if (this instanceof EventTarget)
                this._listeners = {};
        }
        EventTarget.prototype.addEventListener = function (eventType, listener) {
            if (!(eventType in this._listeners)) {
                this._listeners[eventType] = [];
            }
            var arr = this._listeners[eventType];
            // #4
            if (arr.indexOf(listener) === -1) {
                // Make a copy so as not to interfere with a current dispatchEvent.
                arr = arr.concat([listener]);
            }
            this._listeners[eventType] = arr;
        };
        ;
        EventTarget.prototype.removeEventListener = function (eventType, listener) {
            var arr = this._listeners[eventType];
            if (!arr) {
                return;
            }
            var idx = arr.indexOf(listener);
            if (idx !== -1) {
                if (arr.length > 1) {
                    // Make a copy so as not to interfere with a current dispatchEvent.
                    this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
                }
                else {
                    delete this._listeners[eventType];
                }
                return;
            }
        };
        ;
        EventTarget.prototype.dispatchEvent = function (event) {
            var t = event.type;
            // equivalent of Array.prototype.slice.call(arguments, 0);
            var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
            // TODO: This doesn't match the real behavior; per spec, onfoo get
            // their place in line from the /first/ time they're set from
            // non-null. Although WebKit bumps it to the end every time it's
            // set.
            if (this['on' + t]) {
                this['on' + t].apply(this, args);
            }
            if (t in this._listeners) {
                // Grab a reference to the listeners list. removeEventListener may alter the list.
                var listeners = this._listeners[t];
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i].apply(this, args);
                }
            }
        };
        ;
        return EventTarget;
    }());
});
//# sourceMappingURL=eventtarget.js.map
},{}],6:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './event'], factory);
    }
})(function (require, exports) {
    'use strict';
    var event_1 = require('./event');
    var TransportMessageEvent = (function (_super) {
        __extends(TransportMessageEvent, _super);
        function TransportMessageEvent(data) {
            _super.call(this, 'message', false, false);
            this.data = data;
        }
        return TransportMessageEvent;
    }(event_1["default"]));
    exports.__esModule = true;
    exports["default"] = TransportMessageEvent;
});
//# sourceMappingURL=trans-message.js.map
},{"./event":4}],7:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './utils/iframe'], factory);
    }
})(function (require, exports) {
    'use strict';
    var JSON3 = require('json3');
    var iframeUtils = require('./utils/iframe');
    var FacadeJS = (function () {
        function FacadeJS(transport) {
            this._transport = transport;
            transport.on('message', this._transportMessage.bind(this));
            transport.on('close', this._transportClose.bind(this));
        }
        FacadeJS.prototype._transportClose = function (code, reason) {
            iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
        };
        FacadeJS.prototype._transportMessage = function (frame) {
            iframeUtils.postMessage('t', frame);
        };
        FacadeJS.prototype._send = function (data) {
            this._transport.send(data);
        };
        FacadeJS.prototype._close = function () {
            this._transport.close();
            this._transport.removeAllListeners();
        };
        return FacadeJS;
    }());
    exports.__esModule = true;
    exports["default"] = FacadeJS;
});
//# sourceMappingURL=facade.js.map
},{"./utils/iframe":47,"json3":57}],8:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './utils/url', './utils/event', './facade', './info-iframe-receiver', './utils/iframe', './location'], factory);
    }
})(function (require, exports) {
    'use strict';
    var urlUtils = require('./utils/url');
    var eventUtils = require('./utils/event');
    var JSON3 = require('json3');
    var facade_1 = require('./facade');
    var InfoIframeReceiver = require('./info-iframe-receiver');
    var iframeUtils = require('./utils/iframe');
    var loc = require('./location');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:iframe-bootstrap');
    }
    return function (SockJS, availableTransports) {
        var transportMap = {};
        availableTransports.forEach(function (at) {
            if (at.facadeTransport) {
                transportMap[at.facadeTransport.transportName] = at.facadeTransport;
            }
        });
        // hard-coded for the info iframe
        // TODO see if we can make this more dynamic
        transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
        var parentOrigin;
        /* eslint-disable camelcase */
        SockJS.bootstrap_iframe = function () {
            /* eslint-enable camelcase */
            var facade;
            iframeUtils.currentWindowId = loc.hash.slice(1);
            var onMessage = function (e) {
                if (e.source !== parent) {
                    return;
                }
                if (typeof parentOrigin === 'undefined') {
                    parentOrigin = e.origin;
                }
                if (e.origin !== parentOrigin) {
                    return;
                }
                var iframeMessage;
                try {
                    iframeMessage = JSON3.parse(e.data);
                }
                catch (ignored) {
                    debug('bad json', e.data);
                    return;
                }
                if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
                    return;
                }
                switch (iframeMessage.type) {
                    case 's':
                        var p;
                        try {
                            p = JSON3.parse(iframeMessage.data);
                        }
                        catch (ignored) {
                            debug('bad json', iframeMessage.data);
                            break;
                        }
                        var version = p[0];
                        var transport = p[1];
                        var transUrl = p[2];
                        var baseUrl = p[3];
                        debug(version, transport, transUrl, baseUrl);
                        // change this to semver logic
                        if (version !== SockJS.version) {
                            throw new Error('Incompatible SockJS! Main site uses:' +
                                ' "' + version + '", the iframe:' +
                                ' "' + SockJS.version + '".');
                        }
                        if (!urlUtils.isOriginEqual(transUrl, loc.href) || !urlUtils.isOriginEqual(baseUrl, loc.href)) {
                            throw new Error('Can\'t connect to different domain from within an ' +
                                'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
                        }
                        facade = new facade_1["default"](new transportMap[transport](transUrl, baseUrl));
                        break;
                    case 'm':
                        facade._send(iframeMessage.data);
                        break;
                    case 'c':
                        if (facade) {
                            facade._close();
                        }
                        facade = null;
                        break;
                }
            };
            eventUtils.attachEvent('message', onMessage);
            // Start
            iframeUtils.postMessage('s');
        };
    };
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9pZnJhbWUtYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi91dGlscy91cmwnLCAnLi91dGlscy9ldmVudCcsICcuL2ZhY2FkZScsICcuL2luZm8taWZyYW1lLXJlY2VpdmVyJywgJy4vdXRpbHMvaWZyYW1lJywgJy4vbG9jYXRpb24nXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIHVybFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy91cmwnKTtcbiAgICB2YXIgZXZlbnRVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKTtcbiAgICB2YXIgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpO1xuICAgIHZhciBmYWNhZGVfMSA9IHJlcXVpcmUoJy4vZmFjYWRlJyk7XG4gICAgdmFyIEluZm9JZnJhbWVSZWNlaXZlciA9IHJlcXVpcmUoJy4vaW5mby1pZnJhbWUtcmVjZWl2ZXInKTtcbiAgICB2YXIgaWZyYW1lVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lmcmFtZScpO1xuICAgIHZhciBsb2MgPSByZXF1aXJlKCcuL2xvY2F0aW9uJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OmlmcmFtZS1ib290c3RyYXAnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChTb2NrSlMsIGF2YWlsYWJsZVRyYW5zcG9ydHMpIHtcbiAgICAgICAgdmFyIHRyYW5zcG9ydE1hcCA9IHt9O1xuICAgICAgICBhdmFpbGFibGVUcmFuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKGF0KSB7XG4gICAgICAgICAgICBpZiAoYXQuZmFjYWRlVHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0TWFwW2F0LmZhY2FkZVRyYW5zcG9ydC50cmFuc3BvcnROYW1lXSA9IGF0LmZhY2FkZVRyYW5zcG9ydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGhhcmQtY29kZWQgZm9yIHRoZSBpbmZvIGlmcmFtZVxuICAgICAgICAvLyBUT0RPIHNlZSBpZiB3ZSBjYW4gbWFrZSB0aGlzIG1vcmUgZHluYW1pY1xuICAgICAgICB0cmFuc3BvcnRNYXBbSW5mb0lmcmFtZVJlY2VpdmVyLnRyYW5zcG9ydE5hbWVdID0gSW5mb0lmcmFtZVJlY2VpdmVyO1xuICAgICAgICB2YXIgcGFyZW50T3JpZ2luO1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICAgICAgU29ja0pTLmJvb3RzdHJhcF9pZnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuICAgICAgICAgICAgdmFyIGZhY2FkZTtcbiAgICAgICAgICAgIGlmcmFtZVV0aWxzLmN1cnJlbnRXaW5kb3dJZCA9IGxvYy5oYXNoLnNsaWNlKDEpO1xuICAgICAgICAgICAgdmFyIG9uTWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuc291cmNlICE9PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmVudE9yaWdpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50T3JpZ2luID0gZS5vcmlnaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlLm9yaWdpbiAhPT0gcGFyZW50T3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGlmcmFtZU1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lTWVzc2FnZSA9IEpTT04zLnBhcnNlKGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChpZ25vcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlmcmFtZU1lc3NhZ2Uud2luZG93SWQgIT09IGlmcmFtZVV0aWxzLmN1cnJlbnRXaW5kb3dJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWZyYW1lTWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBKU09OMy5wYXJzZShpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnYmFkIGpzb24nLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSBwWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHBbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNVcmwgPSBwWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBwWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcodmVyc2lvbiwgdHJhbnNwb3J0LCB0cmFuc1VybCwgYmFzZVVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhpcyB0byBzZW12ZXIgbG9naWNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9PSBTb2NrSlMudmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb21wYXRpYmxlIFNvY2tKUyEgTWFpbiBzaXRlIHVzZXM6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgXCInICsgdmVyc2lvbiArICdcIiwgdGhlIGlmcmFtZTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyBcIicgKyBTb2NrSlMudmVyc2lvbiArICdcIi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXJsVXRpbHMuaXNPcmlnaW5FcXVhbCh0cmFuc1VybCwgbG9jLmhyZWYpIHx8ICF1cmxVdGlscy5pc09yaWdpbkVxdWFsKGJhc2VVcmwsIGxvYy5ocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBjb25uZWN0IHRvIGRpZmZlcmVudCBkb21haW4gZnJvbSB3aXRoaW4gYW4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZnJhbWUuICgnICsgbG9jLmhyZWYgKyAnLCAnICsgdHJhbnNVcmwgKyAnLCAnICsgYmFzZVVybCArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNhZGUgPSBuZXcgZmFjYWRlXzFbXCJkZWZhdWx0XCJdKG5ldyB0cmFuc3BvcnRNYXBbdHJhbnNwb3J0XSh0cmFuc1VybCwgYmFzZVVybCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjYWRlLl9zZW5kKGlmcmFtZU1lc3NhZ2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFjYWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjYWRlLl9jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjYWRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICAgICAgICAgIC8vIFN0YXJ0XG4gICAgICAgICAgICBpZnJhbWVVdGlscy5wb3N0TWVzc2FnZSgncycpO1xuICAgICAgICB9O1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlmcmFtZS1ib290c3RyYXAuanMubWFwIl19
},{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":54,"json3":57}],9:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', './utils/object'], factory);
    }
})(function (require, exports) {
    'use strict';
    var events_1 = require('events');
    var inherits = require('inherits');
    var JSON3 = require('json3');
    var objectUtils = require('./utils/object');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:info-ajax');
    }
    return (function (_super) {
        __extends(InfoAjax, _super);
        function InfoAjax(url, AjaxObject) {
            _super.call(this);
            var self = this;
            var t0 = +new Date();
            this.xo = new AjaxObject('GET', url);
            this.xo.once('finish', function (status, text) {
                var info, rtt;
                if (status === 200) {
                    rtt = (+new Date()) - t0;
                    if (text) {
                        try {
                            info = JSON3.parse(text);
                        }
                        catch (e) {
                            debug('bad json', text);
                        }
                    }
                    if (!objectUtils.isObject(info)) {
                        info = {};
                    }
                }
                self.emit('finish', info, rtt);
                self.removeAllListeners();
            });
        }
        InfoAjax.prototype.close = function () {
            this.removeAllListeners();
            this.xo.close();
        };
        ;
        return InfoAjax;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9pbmZvLWFqYXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnZXZlbnRzJywgJy4vdXRpbHMvb2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBldmVudHNfMSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuICAgIHZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4gICAgdmFyIEpTT04zID0gcmVxdWlyZSgnanNvbjMnKTtcbiAgICB2YXIgb2JqZWN0VXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL29iamVjdCcpO1xuICAgIHZhciBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIF9bX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDppbmZvLWFqYXgnKTtcbiAgICB9XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhJbmZvQWpheCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSW5mb0FqYXgodXJsLCBBamF4T2JqZWN0KSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciB0MCA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy54byA9IG5ldyBBamF4T2JqZWN0KCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdGhpcy54by5vbmNlKCdmaW5pc2gnLCBmdW5jdGlvbiAoc3RhdHVzLCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZm8sIHJ0dDtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcnR0ID0gKCtuZXcgRGF0ZSgpKSAtIHQwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gSlNPTjMucGFyc2UodGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0VXRpbHMuaXNPYmplY3QoaW5mbykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIEluZm9BamF4LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnhvLmNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIEluZm9BamF4O1xuICAgIH0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZm8tYWpheC5qcy5tYXAiXX0=
},{"./utils/object":49,"debug":54,"events":3,"inherits":56,"json3":57}],10:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', './transport/sender/xhr-local', './info-ajax'], factory);
    }
})(function (require, exports) {
    'use strict';
    var events_1 = require('events');
    var JSON3 = require('json3');
    var XHRLocalObject = require('./transport/sender/xhr-local');
    var InfoAjax = require('./info-ajax');
    return (function (_super) {
        __extends(InfoReceiverIframe, _super);
        function InfoReceiverIframe(transUrl) {
            _super.call(this);
            var self = this;
            this.ir = new InfoAjax(transUrl, XHRLocalObject);
            this.ir.once('finish', function (info, rtt) {
                self.ir = null;
                self.emit('message', JSON3.stringify([info, rtt]));
            });
        }
        InfoReceiverIframe.prototype.close = function () {
            if (this.ir) {
                this.ir.close();
                this.ir = null;
            }
            this.removeAllListeners();
        };
        InfoReceiverIframe.transportName = 'iframe-info-receiver';
        return InfoReceiverIframe;
    }(events_1.EventEmitter));
});
//# sourceMappingURL=info-iframe-receiver.js.map
},{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"json3":57}],11:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', './utils/event', './transport/iframe', './info-iframe-receiver'], factory);
    }
})(function (require, exports) {
    'use strict';
    var events_1 = require('events');
    var JSON3 = require('json3');
    var utils = require('./utils/event');
    var IframeTransport = require('./transport/iframe');
    var InfoReceiverIframe = require('./info-iframe-receiver');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:info-iframe');
    }
    return (function (_super) {
        __extends(InfoIframe, _super);
        function InfoIframe(baseUrl, url) {
            _super.call(this);
            var self = this;
            var go = function () {
                var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
                ifr.once('message', function (msg) {
                    if (msg) {
                        var d;
                        try {
                            d = JSON3.parse(msg);
                        }
                        catch (e) {
                            debug('bad json', msg);
                            self.emit('finish');
                            self.close();
                            return;
                        }
                        var info = d[0], rtt = d[1];
                        self.emit('finish', info, rtt);
                    }
                    self.close();
                });
                ifr.once('close', function () {
                    self.emit('finish');
                    self.close();
                });
            };
            // TODO this seems the same as the 'needBody' from transports
            if (!global.document.body) {
                utils.attachEvent('load', go);
            }
            else {
                go();
            }
        }
        InfoIframe.enabled = function () {
            return IframeTransport.enabled();
        };
        InfoIframe.prototype.close = function () {
            if (this.ifr) {
                this.ifr.close();
            }
            this.removeAllListeners();
            this.ifr = null;
        };
        return InfoIframe;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9pbmZvLWlmcmFtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2V2ZW50cycsICcuL3V0aWxzL2V2ZW50JywgJy4vdHJhbnNwb3J0L2lmcmFtZScsICcuL2luZm8taWZyYW1lLXJlY2VpdmVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBldmVudHNfMSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuICAgIHZhciBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJyk7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudCcpO1xuICAgIHZhciBJZnJhbWVUcmFuc3BvcnQgPSByZXF1aXJlKCcuL3RyYW5zcG9ydC9pZnJhbWUnKTtcbiAgICB2YXIgSW5mb1JlY2VpdmVySWZyYW1lID0gcmVxdWlyZSgnLi9pbmZvLWlmcmFtZS1yZWNlaXZlcicpO1xuICAgIHZhciBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIF9bX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDppbmZvLWlmcmFtZScpO1xuICAgIH1cbiAgICByZXR1cm4gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEluZm9JZnJhbWUsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEluZm9JZnJhbWUoYmFzZVVybCwgdXJsKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBnbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWZyID0gc2VsZi5pZnIgPSBuZXcgSWZyYW1lVHJhbnNwb3J0KEluZm9SZWNlaXZlcklmcmFtZS50cmFuc3BvcnROYW1lLCB1cmwsIGJhc2VVcmwpO1xuICAgICAgICAgICAgICAgIGlmci5vbmNlKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZCA9IEpTT04zLnBhcnNlKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdmaW5pc2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZm8gPSBkWzBdLCBydHQgPSBkWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdmaW5pc2gnLCBpbmZvLCBydHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZnIub25jZSgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZmluaXNoJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBUT0RPIHRoaXMgc2VlbXMgdGhlIHNhbWUgYXMgdGhlICduZWVkQm9keScgZnJvbSB0cmFuc3BvcnRzXG4gICAgICAgICAgICBpZiAoIWdsb2JhbC5kb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuYXR0YWNoRXZlbnQoJ2xvYWQnLCBnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEluZm9JZnJhbWUuZW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBJZnJhbWVUcmFuc3BvcnQuZW5hYmxlZCgpO1xuICAgICAgICB9O1xuICAgICAgICBJbmZvSWZyYW1lLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlmcikge1xuICAgICAgICAgICAgICAgIHRoaXMuaWZyLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgdGhpcy5pZnIgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gSW5mb0lmcmFtZTtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmZvLWlmcmFtZS5qcy5tYXAiXX0=
},{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":54,"events":3,"json3":57}],12:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', './utils/url', './transport/sender/xdr', './transport/sender/xhr-cors', './transport/sender/xhr-local', './transport/sender/xhr-fake', './info-iframe', './info-ajax'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    var urlUtils = require('./utils/url');
    var XDR = require('./transport/sender/xdr');
    var XHRCors = require('./transport/sender/xhr-cors');
    var XHRLocal = require('./transport/sender/xhr-local');
    var XHRFake = require('./transport/sender/xhr-fake');
    var InfoIframe = require('./info-iframe');
    var InfoAjax = require('./info-ajax');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:info-receiver');
    }
    return (function (_super) {
        __extends(InfoReceiver, _super);
        function InfoReceiver(baseUrl, urlInfo) {
            _super.call(this);
            debug(baseUrl);
            var self = this;
            setTimeout(function () {
                self.doXhr(baseUrl, urlInfo);
            }, 0);
        }
        // TODO this is currently ignoring the list of available transports and the whitelist
        InfoReceiver._getReceiver = function (baseUrl, url, urlInfo) {
            // determine method of CORS support (if needed)
            if (urlInfo.sameOrigin) {
                return new InfoAjax(url, XHRLocal);
            }
            if (XHRCors.enabled) {
                return new InfoAjax(url, XHRCors);
            }
            if (XDR.enabled && urlInfo.sameScheme) {
                return new InfoAjax(url, XDR);
            }
            if (InfoIframe.enabled()) {
                return new InfoIframe(baseUrl, url);
            }
            return new InfoAjax(url, XHRFake);
        };
        ;
        InfoReceiver.prototype.doXhr = function (baseUrl, urlInfo) {
            var self = this, url = urlUtils.addPath(baseUrl, '/info');
            debug('doXhr', url);
            this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
            this.timeoutRef = setTimeout(function () {
                debug('timeout');
                self._cleanup(false);
                self.emit('finish');
            }, InfoReceiver.timeout);
            this.xo.once('finish', function (info, rtt) {
                debug('finish', info, rtt);
                self._cleanup(true);
                self.emit('finish', info, rtt);
            });
        };
        ;
        InfoReceiver.prototype._cleanup = function (wasClean) {
            debug('_cleanup');
            clearTimeout(this.timeoutRef);
            this.timeoutRef = null;
            if (!wasClean && this.xo) {
                this.xo.close();
            }
            this.xo = null;
        };
        ;
        InfoReceiver.prototype.close = function () {
            debug('close');
            this.removeAllListeners();
            this._cleanup(false);
        };
        ;
        InfoReceiver.timeout = 8000;
        return InfoReceiver;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9pbmZvLXJlY2VpdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2V2ZW50cycsICcuL3V0aWxzL3VybCcsICcuL3RyYW5zcG9ydC9zZW5kZXIveGRyJywgJy4vdHJhbnNwb3J0L3NlbmRlci94aHItY29ycycsICcuL3RyYW5zcG9ydC9zZW5kZXIveGhyLWxvY2FsJywgJy4vdHJhbnNwb3J0L3NlbmRlci94aHItZmFrZScsICcuL2luZm8taWZyYW1lJywgJy4vaW5mby1hamF4J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGV2ZW50c18xID0gcmVxdWlyZSgnZXZlbnRzJyk7XG4gICAgdmFyIHVybFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy91cmwnKTtcbiAgICB2YXIgWERSID0gcmVxdWlyZSgnLi90cmFuc3BvcnQvc2VuZGVyL3hkcicpO1xuICAgIHZhciBYSFJDb3JzID0gcmVxdWlyZSgnLi90cmFuc3BvcnQvc2VuZGVyL3hoci1jb3JzJyk7XG4gICAgdmFyIFhIUkxvY2FsID0gcmVxdWlyZSgnLi90cmFuc3BvcnQvc2VuZGVyL3hoci1sb2NhbCcpO1xuICAgIHZhciBYSFJGYWtlID0gcmVxdWlyZSgnLi90cmFuc3BvcnQvc2VuZGVyL3hoci1mYWtlJyk7XG4gICAgdmFyIEluZm9JZnJhbWUgPSByZXF1aXJlKCcuL2luZm8taWZyYW1lJyk7XG4gICAgdmFyIEluZm9BamF4ID0gcmVxdWlyZSgnLi9pbmZvLWFqYXgnKTtcbiAgICB2YXIgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBfW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6aW5mby1yZWNlaXZlcicpO1xuICAgIH1cbiAgICByZXR1cm4gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEluZm9SZWNlaXZlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSW5mb1JlY2VpdmVyKGJhc2VVcmwsIHVybEluZm8pIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgZGVidWcoYmFzZVVybCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRvWGhyKGJhc2VVcmwsIHVybEluZm8pO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyB0aGlzIGlzIGN1cnJlbnRseSBpZ25vcmluZyB0aGUgbGlzdCBvZiBhdmFpbGFibGUgdHJhbnNwb3J0cyBhbmQgdGhlIHdoaXRlbGlzdFxuICAgICAgICBJbmZvUmVjZWl2ZXIuX2dldFJlY2VpdmVyID0gZnVuY3Rpb24gKGJhc2VVcmwsIHVybCwgdXJsSW5mbykge1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIG1ldGhvZCBvZiBDT1JTIHN1cHBvcnQgKGlmIG5lZWRlZClcbiAgICAgICAgICAgIGlmICh1cmxJbmZvLnNhbWVPcmlnaW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEluZm9BamF4KHVybCwgWEhSTG9jYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFhIUkNvcnMuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW5mb0FqYXgodXJsLCBYSFJDb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChYRFIuZW5hYmxlZCAmJiB1cmxJbmZvLnNhbWVTY2hlbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEluZm9BamF4KHVybCwgWERSKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChJbmZvSWZyYW1lLmVuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW5mb0lmcmFtZShiYXNlVXJsLCB1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbmZvQWpheCh1cmwsIFhIUkZha2UpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEluZm9SZWNlaXZlci5wcm90b3R5cGUuZG9YaHIgPSBmdW5jdGlvbiAoYmFzZVVybCwgdXJsSW5mbykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCB1cmwgPSB1cmxVdGlscy5hZGRQYXRoKGJhc2VVcmwsICcvaW5mbycpO1xuICAgICAgICAgICAgZGVidWcoJ2RvWGhyJywgdXJsKTtcbiAgICAgICAgICAgIHRoaXMueG8gPSBJbmZvUmVjZWl2ZXIuX2dldFJlY2VpdmVyKGJhc2VVcmwsIHVybCwgdXJsSW5mbyk7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygndGltZW91dCcpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZmluaXNoJyk7XG4gICAgICAgICAgICB9LCBJbmZvUmVjZWl2ZXIudGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLnhvLm9uY2UoJ2ZpbmlzaCcsIGZ1bmN0aW9uIChpbmZvLCBydHQpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnZmluaXNoJywgaW5mbywgcnR0KTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jbGVhbnVwKHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZmluaXNoJywgaW5mbywgcnR0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEluZm9SZWNlaXZlci5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbiAod2FzQ2xlYW4pIHtcbiAgICAgICAgICAgIGRlYnVnKCdfY2xlYW51cCcpO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFJlZik7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRSZWYgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCF3YXNDbGVhbiAmJiB0aGlzLnhvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54by5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54byA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgSW5mb1JlY2VpdmVyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdjbG9zZScpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFudXAoZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEluZm9SZWNlaXZlci50aW1lb3V0ID0gODAwMDtcbiAgICAgICAgcmV0dXJuIEluZm9SZWNlaXZlcjtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmZvLXJlY2VpdmVyLmpzLm1hcCJdfQ==
},{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":54,"events":3}],13:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    return global.location || {
        origin: 'http://localhost:80',
        protocol: 'http',
        host: 'localhost',
        port: 80,
        href: 'http://localhost/',
        hash: ''
    };
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9sb2NhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gZ2xvYmFsLmxvY2F0aW9uIHx8IHtcbiAgICAgICAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDo4MCcsXG4gICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICBwb3J0OiA4MCxcbiAgICAgICAgaHJlZjogJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcbiAgICAgICAgaGFzaDogJydcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhdGlvbi5qcy5tYXAiXX0=
},{}],14:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './utils/random', './utils/escape', './utils/url', './utils/event', './utils/transport', './utils/object', './utils/browser', './utils/log', './event/event', './event/eventtarget', './location', './event/close', './event/trans-message', './info-receiver'], factory);
    }
})(function (require, exports) {
    'use strict';
    require('./shims');
    var URL = require('url-parse');
    var inherits = require('inherits');
    var JSON3 = require('json3');
    var random = require('./utils/random');
    var escape = require('./utils/escape');
    var urlUtils = require('./utils/url');
    var eventUtils = require('./utils/event');
    var transport = require('./utils/transport');
    var objectUtils = require('./utils/object');
    var browser = require('./utils/browser');
    var log = require('./utils/log');
    var event_1 = require('./event/event');
    var EventTarget = require('./event/eventtarget');
    var loc = require('./location');
    var close_1 = require('./event/close');
    var trans_message_1 = require('./event/trans-message');
    var InfoReceiver = require('./info-receiver');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:main');
    }
    var transports;
    function userSetCode(code) {
        return code === 1000 || (code >= 3000 && code <= 4999);
    }
    // follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
    var SockJS = (function (_super) {
        __extends(SockJS, _super);
        function SockJS(url, protocols, options) {
            _super.call(this);
            if (!(this instanceof SockJS)) {
                return new SockJS(url, protocols, options);
            }
            if (arguments.length < 1) {
                throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
            }
            this.readyState = SockJS.CONNECTING;
            this.extensions = '';
            this.protocol = '';
            // non-standard extension
            options = options || {};
            if (options.protocols_whitelist) {
                log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
            }
            this._transportsWhitelist = options.transports;
            this._transportOptions = options.transportOptions || {};
            var sessionId = options.sessionId || 8;
            if (typeof sessionId === 'function') {
                this._generateSessionId = sessionId;
            }
            else if (typeof sessionId === 'number') {
                this._generateSessionId = function () {
                    return random.string(sessionId);
                };
            }
            else {
                throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
            }
            this._server = options.server || random.numberString(1000);
            // Step 1 of WS spec - parse and validate the url. Issue #8
            var parsedUrl = new URL(url, null, null);
            if (!parsedUrl.host || !parsedUrl.protocol) {
                throw new SyntaxError("The URL '" + url + "' is invalid");
            }
            else if (parsedUrl.hash) {
                throw new SyntaxError('The URL must not contain a fragment');
            }
            else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
                throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
            }
            var secure = parsedUrl.protocol === 'https:';
            // Step 2 - don't allow secure origin with an insecure protocol
            if (loc.protocol === 'https' && !secure) {
                throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
            }
            // Step 3 - check port access - no need here
            // Step 4 - parse protocols argument
            if (!protocols) {
                protocols = [];
            }
            else if (!Array.isArray(protocols)) {
                protocols = [protocols];
            }
            // Step 5 - check protocols argument
            var sortedProtocols = protocols.sort();
            sortedProtocols.forEach(function (proto, i) {
                if (!proto) {
                    throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
                }
                if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
                    throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
                }
            });
            // Step 6 - convert origin
            var o = urlUtils.getOrigin(loc.href);
            this._origin = o ? o.toLowerCase() : null;
            // remove the trailing slash
            parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));
            // store the sanitized url
            this.url = parsedUrl.href;
            debug('using url', this.url);
            // Step 7 - start connection in background
            // obtain server info
            // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
            this._urlInfo = {
                nullOrigin: !browser.hasDomain(),
                sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
                sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
            };
            this._ir = new InfoReceiver(this.url, this._urlInfo);
            this._ir.once('finish', this._receiveInfo.bind(this));
        }
        SockJS.prototype.close = function (code, reason) {
            // Step 1
            if (code && !userSetCode(code)) {
                throw new Error('InvalidAccessError: Invalid code');
            }
            // Step 2.4 states the max is 123 bytes, but we are just checking length
            if (reason && reason.length > 123) {
                throw new SyntaxError('reason argument has an invalid length');
            }
            // Step 3.1
            if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
                return;
            }
            // TODO look at docs to determine how to set this
            var wasClean = true;
            this._close(code || 1000, reason || 'Normal closure', wasClean);
        };
        SockJS.prototype.send = function (data) {
            // #13 - convert anything non-string to string
            // TODO this currently turns objects into [object Object]
            if (typeof data !== 'string') {
                data = '' + data;
            }
            if (this.readyState === SockJS.CONNECTING) {
                throw new Error('InvalidStateError: The connection has not been established yet');
            }
            if (this.readyState !== SockJS.OPEN) {
                return;
            }
            this._transport.send(escape.quote(data));
        };
        SockJS.prototype._receiveInfo = function (info, rtt) {
            debug('_receiveInfo', rtt);
            this._ir = null;
            if (!info) {
                this._close(1002, 'Cannot connect to server');
                return;
            }
            // establish a round-trip timeout (RTO) based on the
            // round-trip time (RTT)
            this._rto = this.countRTO(rtt);
            // allow server to override url used for the actual transport
            this._transUrl = info.base_url ? info.base_url : this.url;
            info = objectUtils.extend(info, this._urlInfo);
            debug('info', info);
            // determine list of desired and supported transports
            var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
            this._transports = enabledTransports.main;
            debug(this._transports.length + ' enabled transports');
            this._connect();
        };
        SockJS.prototype._connect = function () {
            for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
                debug('attempt', Transport.transportName);
                if (Transport.needBody) {
                    if (!global.document.body ||
                        (typeof global.document.readyState !== 'undefined' &&
                            global.document.readyState !== 'complete' &&
                            global.document.readyState !== 'interactive')) {
                        debug('waiting for body');
                        this._transports.unshift(Transport);
                        eventUtils.attachEvent('load', this._connect.bind(this));
                        return;
                    }
                }
                // calculate timeout based on RTO and round trips. Default to 5s
                var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
                this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
                debug('using timeout', timeoutMs);
                var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
                var options = this._transportOptions[Transport.transportName];
                debug('transport url', transportUrl);
                var transportObj = new Transport(transportUrl, this._transUrl, options);
                transportObj.on('message', this._transportMessage.bind(this));
                transportObj.once('close', this._transportClose.bind(this));
                transportObj.transportName = Transport.transportName;
                this._transport = transportObj;
                return;
            }
            this._close(2000, 'All transports failed', false);
        };
        SockJS.prototype._transportTimeout = function () {
            debug('_transportTimeout');
            if (this.readyState === SockJS.CONNECTING) {
                this._transportClose(2007, 'Transport timed out');
            }
        };
        SockJS.prototype._transportMessage = function (msg) {
            debug('_transportMessage', msg);
            var self = this, type = msg.slice(0, 1), content = msg.slice(1), payload;
            // first check for messages that don't need a payload
            switch (type) {
                case 'o':
                    this._open();
                    return;
                case 'h':
                    this.dispatchEvent(new event_1["default"]('heartbeat'));
                    debug('heartbeat', this.transport);
                    return;
            }
            if (content) {
                try {
                    payload = JSON3.parse(content);
                }
                catch (e) {
                    debug('bad json', content);
                }
            }
            if (typeof payload === 'undefined') {
                debug('empty payload', content);
                return;
            }
            switch (type) {
                case 'a':
                    if (Array.isArray(payload)) {
                        payload.forEach(function (p) {
                            debug('message', self.transport, p);
                            self.dispatchEvent(new trans_message_1["default"](p));
                        });
                    }
                    break;
                case 'm':
                    debug('message', this.transport, payload);
                    this.dispatchEvent(new trans_message_1["default"](payload));
                    break;
                case 'c':
                    if (Array.isArray(payload) && payload.length === 2) {
                        this._close(payload[0], payload[1], true);
                    }
                    break;
            }
        };
        SockJS.prototype._transportClose = function (code, reason) {
            debug('_transportClose', this.transport, code, reason);
            if (this._transport) {
                this._transport.removeAllListeners();
                this._transport = null;
                this.transport = null;
            }
            if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
                this._connect();
                return;
            }
            this._close(code, reason);
        };
        SockJS.prototype._open = function () {
            debug('_open', this._transport.transportName, this.readyState);
            if (this.readyState === SockJS.CONNECTING) {
                if (this._transportTimeoutId) {
                    clearTimeout(this._transportTimeoutId);
                    this._transportTimeoutId = null;
                }
                this.readyState = SockJS.OPEN;
                this.transport = this._transport.transportName;
                this.dispatchEvent(new event_1["default"]('open'));
                debug('connected', this.transport);
            }
            else {
                // The server might have been restarted, and lost track of our
                // connection.
                this._close(1006, 'Server lost session');
            }
        };
        SockJS.prototype._close = function (code, reason, wasClean) {
            debug('_close', this.transport, code, reason, wasClean, this.readyState);
            var forceFail = false;
            if (this._ir) {
                forceFail = true;
                this._ir.close();
                this._ir = null;
            }
            if (this._transport) {
                this._transport.close();
                this._transport = null;
                this.transport = null;
            }
            if (this.readyState === SockJS.CLOSED) {
                throw new Error('InvalidStateError: SockJS has already been closed');
            }
            this.readyState = SockJS.CLOSING;
            setTimeout(function () {
                this.readyState = SockJS.CLOSED;
                if (forceFail) {
                    this.dispatchEvent(new event_1["default"]('error'));
                }
                var e = new close_1["default"]();
                e.wasClean = wasClean || false;
                e.code = code || 1000;
                e.reason = reason;
                this.dispatchEvent(e);
                this.onmessage = this.onclose = this.onerror = null;
                debug('disconnected');
            }.bind(this), 0);
        };
        // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
        // and RFC 2988.
        SockJS.prototype.countRTO = function (rtt) {
            // In a local environment, when using IE8/9 and the `jsonp-polling`
            // transport the time needed to establish a connection (the time that pass
            // from the opening of the transport to the call of `_dispatchOpen`) is
            // around 200msec (the lower bound used in the article above) and this
            // causes spurious timeouts. For this reason we calculate a value slightly
            // larger than that used in the article.
            if (rtt > 100) {
                return 4 * rtt; // rto > 400msec
            }
            return 300 + rtt; // 300msec < rto <= 400msec
        };
        ;
        SockJS.version = require('./version');
        SockJS.CONNECTING = 0;
        SockJS.OPEN = 1;
        SockJS.CLOSING = 2;
        SockJS.CLOSED = 3;
        return SockJS;
    }(EventTarget));
    return function (availableTransports) {
        transports = transport(availableTransports);
        require('./iframe-bootstrap')(SockJS, availableTransports);
        return SockJS;
    };
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi91dGlscy9yYW5kb20nLCAnLi91dGlscy9lc2NhcGUnLCAnLi91dGlscy91cmwnLCAnLi91dGlscy9ldmVudCcsICcuL3V0aWxzL3RyYW5zcG9ydCcsICcuL3V0aWxzL29iamVjdCcsICcuL3V0aWxzL2Jyb3dzZXInLCAnLi91dGlscy9sb2cnLCAnLi9ldmVudC9ldmVudCcsICcuL2V2ZW50L2V2ZW50dGFyZ2V0JywgJy4vbG9jYXRpb24nLCAnLi9ldmVudC9jbG9zZScsICcuL2V2ZW50L3RyYW5zLW1lc3NhZ2UnLCAnLi9pbmZvLXJlY2VpdmVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJlcXVpcmUoJy4vc2hpbXMnKTtcbiAgICB2YXIgVVJMID0gcmVxdWlyZSgndXJsLXBhcnNlJyk7XG4gICAgdmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbiAgICB2YXIgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpO1xuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3V0aWxzL3JhbmRvbScpO1xuICAgIHZhciBlc2NhcGUgPSByZXF1aXJlKCcuL3V0aWxzL2VzY2FwZScpO1xuICAgIHZhciB1cmxVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvdXJsJyk7XG4gICAgdmFyIGV2ZW50VXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50Jyk7XG4gICAgdmFyIHRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdXRpbHMvdHJhbnNwb3J0Jyk7XG4gICAgdmFyIG9iamVjdFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9vYmplY3QnKTtcbiAgICB2YXIgYnJvd3NlciA9IHJlcXVpcmUoJy4vdXRpbHMvYnJvd3NlcicpO1xuICAgIHZhciBsb2cgPSByZXF1aXJlKCcuL3V0aWxzL2xvZycpO1xuICAgIHZhciBldmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudCcpO1xuICAgIHZhciBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnR0YXJnZXQnKTtcbiAgICB2YXIgbG9jID0gcmVxdWlyZSgnLi9sb2NhdGlvbicpO1xuICAgIHZhciBjbG9zZV8xID0gcmVxdWlyZSgnLi9ldmVudC9jbG9zZScpO1xuICAgIHZhciB0cmFuc19tZXNzYWdlXzEgPSByZXF1aXJlKCcuL2V2ZW50L3RyYW5zLW1lc3NhZ2UnKTtcbiAgICB2YXIgSW5mb1JlY2VpdmVyID0gcmVxdWlyZSgnLi9pbmZvLXJlY2VpdmVyJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50Om1haW4nKTtcbiAgICB9XG4gICAgdmFyIHRyYW5zcG9ydHM7XG4gICAgZnVuY3Rpb24gdXNlclNldENvZGUoY29kZSkge1xuICAgICAgICByZXR1cm4gY29kZSA9PT0gMTAwMCB8fCAoY29kZSA+PSAzMDAwICYmIGNvZGUgPD0gNDk5OSk7XG4gICAgfVxuICAgIC8vIGZvbGxvdyBjb25zdHJ1Y3RvciBzdGVwcyBkZWZpbmVkIGF0IGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnNvY2tldHMvI3RoZS13ZWJzb2NrZXQtaW50ZXJmYWNlXG4gICAgdmFyIFNvY2tKUyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhTb2NrSlMsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFNvY2tKUyh1cmwsIHByb3RvY29scywgb3B0aW9ucykge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29ja0pTKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU29ja0pTKHVybCwgcHJvdG9jb2xzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdTb2NrSlM6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNvY2tKUy5DT05ORUNUSU5HO1xuICAgICAgICAgICAgdGhpcy5leHRlbnNpb25zID0gJyc7XG4gICAgICAgICAgICB0aGlzLnByb3RvY29sID0gJyc7XG4gICAgICAgICAgICAvLyBub24tc3RhbmRhcmQgZXh0ZW5zaW9uXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnByb3RvY29sc193aGl0ZWxpc3QpIHtcbiAgICAgICAgICAgICAgICBsb2cud2FybihcIidwcm90b2NvbHNfd2hpdGVsaXN0JyBpcyBERVBSRUNBVEVELiBVc2UgJ3RyYW5zcG9ydHMnIGluc3RlYWQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0c1doaXRlbGlzdCA9IG9wdGlvbnMudHJhbnNwb3J0cztcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydE9wdGlvbnMgPSBvcHRpb25zLnRyYW5zcG9ydE9wdGlvbnMgfHwge307XG4gICAgICAgICAgICB2YXIgc2Vzc2lvbklkID0gb3B0aW9ucy5zZXNzaW9uSWQgfHwgODtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbklkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVTZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2Vzc2lvbklkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuZG9tLnN0cmluZyhzZXNzaW9uSWQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJZiBzZXNzaW9uSWQgaXMgdXNlZCBpbiB0aGUgb3B0aW9ucywgaXQgbmVlZHMgdG8gYmUgYSBudW1iZXIgb3IgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlcnZlciA9IG9wdGlvbnMuc2VydmVyIHx8IHJhbmRvbS5udW1iZXJTdHJpbmcoMTAwMCk7XG4gICAgICAgICAgICAvLyBTdGVwIDEgb2YgV1Mgc3BlYyAtIHBhcnNlIGFuZCB2YWxpZGF0ZSB0aGUgdXJsLiBJc3N1ZSAjOFxuICAgICAgICAgICAgdmFyIHBhcnNlZFVybCA9IG5ldyBVUkwodXJsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghcGFyc2VkVXJsLmhvc3QgfHwgIXBhcnNlZFVybC5wcm90b2NvbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBVUkwgJ1wiICsgdXJsICsgXCInIGlzIGludmFsaWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXJzZWRVcmwuaGFzaCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVGhlIFVSTCBtdXN0IG5vdCBjb250YWluIGEgZnJhZ21lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlZFVybC5wcm90b2NvbCAhPT0gJ2h0dHA6JyAmJiBwYXJzZWRVcmwucHJvdG9jb2wgIT09ICdodHRwczonKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGhlIFVSTCdzIHNjaGVtZSBtdXN0IGJlIGVpdGhlciAnaHR0cDonIG9yICdodHRwczonLiAnXCIgKyBwYXJzZWRVcmwucHJvdG9jb2wgKyBcIicgaXMgbm90IGFsbG93ZWQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNlY3VyZSA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgICAgICAvLyBTdGVwIDIgLSBkb24ndCBhbGxvdyBzZWN1cmUgb3JpZ2luIHdpdGggYW4gaW5zZWN1cmUgcHJvdG9jb2xcbiAgICAgICAgICAgIGlmIChsb2MucHJvdG9jb2wgPT09ICdodHRwcycgJiYgIXNlY3VyZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2VjdXJpdHlFcnJvcjogQW4gaW5zZWN1cmUgU29ja0pTIGNvbm5lY3Rpb24gbWF5IG5vdCBiZSBpbml0aWF0ZWQgZnJvbSBhIHBhZ2UgbG9hZGVkIG92ZXIgSFRUUFMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFN0ZXAgMyAtIGNoZWNrIHBvcnQgYWNjZXNzIC0gbm8gbmVlZCBoZXJlXG4gICAgICAgICAgICAvLyBTdGVwIDQgLSBwYXJzZSBwcm90b2NvbHMgYXJndW1lbnRcbiAgICAgICAgICAgIGlmICghcHJvdG9jb2xzKSB7XG4gICAgICAgICAgICAgICAgcHJvdG9jb2xzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShwcm90b2NvbHMpKSB7XG4gICAgICAgICAgICAgICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTdGVwIDUgLSBjaGVjayBwcm90b2NvbHMgYXJndW1lbnRcbiAgICAgICAgICAgIHZhciBzb3J0ZWRQcm90b2NvbHMgPSBwcm90b2NvbHMuc29ydCgpO1xuICAgICAgICAgICAgc29ydGVkUHJvdG9jb2xzLmZvckVhY2goZnVuY3Rpb24gKHByb3RvLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm90bykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUaGUgcHJvdG9jb2xzIGVudHJ5ICdcIiArIHByb3RvICsgXCInIGlzIGludmFsaWQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IChzb3J0ZWRQcm90b2NvbHMubGVuZ3RoIC0gMSkgJiYgcHJvdG8gPT09IHNvcnRlZFByb3RvY29sc1tpICsgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGhlIHByb3RvY29scyBlbnRyeSAnXCIgKyBwcm90byArIFwiJyBpcyBkdXBsaWNhdGVkLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFN0ZXAgNiAtIGNvbnZlcnQgb3JpZ2luXG4gICAgICAgICAgICB2YXIgbyA9IHVybFV0aWxzLmdldE9yaWdpbihsb2MuaHJlZik7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW4gPSBvID8gby50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdHJhaWxpbmcgc2xhc2hcbiAgICAgICAgICAgIHBhcnNlZFVybC5zZXQoJ3BhdGhuYW1lJywgcGFyc2VkVXJsLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyskLywgJycpKTtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBzYW5pdGl6ZWQgdXJsXG4gICAgICAgICAgICB0aGlzLnVybCA9IHBhcnNlZFVybC5ocmVmO1xuICAgICAgICAgICAgZGVidWcoJ3VzaW5nIHVybCcsIHRoaXMudXJsKTtcbiAgICAgICAgICAgIC8vIFN0ZXAgNyAtIHN0YXJ0IGNvbm5lY3Rpb24gaW4gYmFja2dyb3VuZFxuICAgICAgICAgICAgLy8gb2J0YWluIHNlcnZlciBpbmZvXG4gICAgICAgICAgICAvLyBodHRwOi8vc29ja2pzLmdpdGh1Yi5pby9zb2NranMtcHJvdG9jb2wvc29ja2pzLXByb3RvY29sLTAuMy4zLmh0bWwjc2VjdGlvbi0yNlxuICAgICAgICAgICAgdGhpcy5fdXJsSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBudWxsT3JpZ2luOiAhYnJvd3Nlci5oYXNEb21haW4oKSxcbiAgICAgICAgICAgICAgICBzYW1lT3JpZ2luOiB1cmxVdGlscy5pc09yaWdpbkVxdWFsKHRoaXMudXJsLCBsb2MuaHJlZiksXG4gICAgICAgICAgICAgICAgc2FtZVNjaGVtZTogdXJsVXRpbHMuaXNTY2hlbWVFcXVhbCh0aGlzLnVybCwgbG9jLmhyZWYpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5faXIgPSBuZXcgSW5mb1JlY2VpdmVyKHRoaXMudXJsLCB0aGlzLl91cmxJbmZvKTtcbiAgICAgICAgICAgIHRoaXMuX2lyLm9uY2UoJ2ZpbmlzaCcsIHRoaXMuX3JlY2VpdmVJbmZvLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIFNvY2tKUy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoY29kZSwgcmVhc29uKSB7XG4gICAgICAgICAgICAvLyBTdGVwIDFcbiAgICAgICAgICAgIGlmIChjb2RlICYmICF1c2VyU2V0Q29kZShjb2RlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yOiBJbnZhbGlkIGNvZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFN0ZXAgMi40IHN0YXRlcyB0aGUgbWF4IGlzIDEyMyBieXRlcywgYnV0IHdlIGFyZSBqdXN0IGNoZWNraW5nIGxlbmd0aFxuICAgICAgICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ubGVuZ3RoID4gMTIzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdyZWFzb24gYXJndW1lbnQgaGFzIGFuIGludmFsaWQgbGVuZ3RoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTdGVwIDMuMVxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNMT1NJTkcgfHwgdGhpcy5yZWFkeVN0YXRlID09PSBTb2NrSlMuQ0xPU0VEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVE9ETyBsb29rIGF0IGRvY3MgdG8gZGV0ZXJtaW5lIGhvdyB0byBzZXQgdGhpc1xuICAgICAgICAgICAgdmFyIHdhc0NsZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2Nsb3NlKGNvZGUgfHwgMTAwMCwgcmVhc29uIHx8ICdOb3JtYWwgY2xvc3VyZScsIHdhc0NsZWFuKTtcbiAgICAgICAgfTtcbiAgICAgICAgU29ja0pTLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vICMxMyAtIGNvbnZlcnQgYW55dGhpbmcgbm9uLXN0cmluZyB0byBzdHJpbmdcbiAgICAgICAgICAgIC8vIFRPRE8gdGhpcyBjdXJyZW50bHkgdHVybnMgb2JqZWN0cyBpbnRvIFtvYmplY3QgT2JqZWN0XVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBTb2NrSlMuQ09OTkVDVElORykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZFN0YXRlRXJyb3I6IFRoZSBjb25uZWN0aW9uIGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZCB5ZXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFNvY2tKUy5PUEVOKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0LnNlbmQoZXNjYXBlLnF1b3RlKGRhdGEpKTtcbiAgICAgICAgfTtcbiAgICAgICAgU29ja0pTLnByb3RvdHlwZS5fcmVjZWl2ZUluZm8gPSBmdW5jdGlvbiAoaW5mbywgcnR0KSB7XG4gICAgICAgICAgICBkZWJ1ZygnX3JlY2VpdmVJbmZvJywgcnR0KTtcbiAgICAgICAgICAgIHRoaXMuX2lyID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlKDEwMDIsICdDYW5ub3QgY29ubmVjdCB0byBzZXJ2ZXInKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlc3RhYmxpc2ggYSByb3VuZC10cmlwIHRpbWVvdXQgKFJUTykgYmFzZWQgb24gdGhlXG4gICAgICAgICAgICAvLyByb3VuZC10cmlwIHRpbWUgKFJUVClcbiAgICAgICAgICAgIHRoaXMuX3J0byA9IHRoaXMuY291bnRSVE8ocnR0KTtcbiAgICAgICAgICAgIC8vIGFsbG93IHNlcnZlciB0byBvdmVycmlkZSB1cmwgdXNlZCBmb3IgdGhlIGFjdHVhbCB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zVXJsID0gaW5mby5iYXNlX3VybCA/IGluZm8uYmFzZV91cmwgOiB0aGlzLnVybDtcbiAgICAgICAgICAgIGluZm8gPSBvYmplY3RVdGlscy5leHRlbmQoaW5mbywgdGhpcy5fdXJsSW5mbyk7XG4gICAgICAgICAgICBkZWJ1ZygnaW5mbycsIGluZm8pO1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGxpc3Qgb2YgZGVzaXJlZCBhbmQgc3VwcG9ydGVkIHRyYW5zcG9ydHNcbiAgICAgICAgICAgIHZhciBlbmFibGVkVHJhbnNwb3J0cyA9IHRyYW5zcG9ydHMuZmlsdGVyVG9FbmFibGVkKHRoaXMuX3RyYW5zcG9ydHNXaGl0ZWxpc3QsIGluZm8pO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0cyA9IGVuYWJsZWRUcmFuc3BvcnRzLm1haW47XG4gICAgICAgICAgICBkZWJ1Zyh0aGlzLl90cmFuc3BvcnRzLmxlbmd0aCArICcgZW5hYmxlZCB0cmFuc3BvcnRzJyk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIFNvY2tKUy5wcm90b3R5cGUuX2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBUcmFuc3BvcnQgPSB0aGlzLl90cmFuc3BvcnRzLnNoaWZ0KCk7IFRyYW5zcG9ydDsgVHJhbnNwb3J0ID0gdGhpcy5fdHJhbnNwb3J0cy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2F0dGVtcHQnLCBUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKFRyYW5zcG9ydC5uZWVkQm9keSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdsb2JhbC5kb2N1bWVudC5ib2R5IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5kb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnY29tcGxldGUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdpbnRlcmFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zygnd2FpdGluZyBmb3IgYm9keScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0cy51bnNoaWZ0KFRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdsb2FkJywgdGhpcy5fY29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGltZW91dCBiYXNlZCBvbiBSVE8gYW5kIHJvdW5kIHRyaXBzLiBEZWZhdWx0IHRvIDVzXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXRNcyA9ICh0aGlzLl9ydG8gKiBUcmFuc3BvcnQucm91bmRUcmlwcykgfHwgNTAwMDtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuX3RyYW5zcG9ydFRpbWVvdXQuYmluZCh0aGlzKSwgdGltZW91dE1zKTtcbiAgICAgICAgICAgICAgICBkZWJ1ZygndXNpbmcgdGltZW91dCcsIHRpbWVvdXRNcyk7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydFVybCA9IHVybFV0aWxzLmFkZFBhdGgodGhpcy5fdHJhbnNVcmwsICcvJyArIHRoaXMuX3NlcnZlciArICcvJyArIHRoaXMuX2dlbmVyYXRlU2Vzc2lvbklkKCkpO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5fdHJhbnNwb3J0T3B0aW9uc1tUcmFuc3BvcnQudHJhbnNwb3J0TmFtZV07XG4gICAgICAgICAgICAgICAgZGVidWcoJ3RyYW5zcG9ydCB1cmwnLCB0cmFuc3BvcnRVcmwpO1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnRPYmogPSBuZXcgVHJhbnNwb3J0KHRyYW5zcG9ydFVybCwgdGhpcy5fdHJhbnNVcmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRyYW5zcG9ydE9iai5vbignbWVzc2FnZScsIHRoaXMuX3RyYW5zcG9ydE1lc3NhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0T2JqLm9uY2UoJ2Nsb3NlJywgdGhpcy5fdHJhbnNwb3J0Q2xvc2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0T2JqLnRyYW5zcG9ydE5hbWUgPSBUcmFuc3BvcnQudHJhbnNwb3J0TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BvcnQgPSB0cmFuc3BvcnRPYmo7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2xvc2UoMjAwMCwgJ0FsbCB0cmFuc3BvcnRzIGZhaWxlZCcsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgU29ja0pTLnByb3RvdHlwZS5fdHJhbnNwb3J0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfdHJhbnNwb3J0VGltZW91dCcpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BvcnRDbG9zZSgyMDA3LCAnVHJhbnNwb3J0IHRpbWVkIG91dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTb2NrSlMucHJvdG90eXBlLl90cmFuc3BvcnRNZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgZGVidWcoJ190cmFuc3BvcnRNZXNzYWdlJywgbXNnKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcywgdHlwZSA9IG1zZy5zbGljZSgwLCAxKSwgY29udGVudCA9IG1zZy5zbGljZSgxKSwgcGF5bG9hZDtcbiAgICAgICAgICAgIC8vIGZpcnN0IGNoZWNrIGZvciBtZXNzYWdlcyB0aGF0IGRvbid0IG5lZWQgYSBwYXlsb2FkXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BlbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgZXZlbnRfMVtcImRlZmF1bHRcIl0oJ2hlYXJ0YmVhdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ2hlYXJ0YmVhdCcsIHRoaXMudHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gSlNPTjMucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnZW1wdHkgcGF5bG9hZCcsIGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoJ21lc3NhZ2UnLCBzZWxmLnRyYW5zcG9ydCwgcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaEV2ZW50KG5ldyB0cmFuc19tZXNzYWdlXzFbXCJkZWZhdWx0XCJdKHApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnbWVzc2FnZScsIHRoaXMudHJhbnNwb3J0LCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyB0cmFuc19tZXNzYWdlXzFbXCJkZWZhdWx0XCJdKHBheWxvYWQpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpICYmIHBheWxvYWQubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZShwYXlsb2FkWzBdLCBwYXlsb2FkWzFdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgU29ja0pTLnByb3RvdHlwZS5fdHJhbnNwb3J0Q2xvc2UgPSBmdW5jdGlvbiAoY29kZSwgcmVhc29uKSB7XG4gICAgICAgICAgICBkZWJ1ZygnX3RyYW5zcG9ydENsb3NlJywgdGhpcy50cmFuc3BvcnQsIGNvZGUsIHJlYXNvbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fdHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF1c2VyU2V0Q29kZShjb2RlKSAmJiBjb2RlICE9PSAyMDAwICYmIHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2xvc2UoY29kZSwgcmVhc29uKTtcbiAgICAgICAgfTtcbiAgICAgICAgU29ja0pTLnByb3RvdHlwZS5fb3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfb3BlbicsIHRoaXMuX3RyYW5zcG9ydC50cmFuc3BvcnROYW1lLCB0aGlzLnJlYWR5U3RhdGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJhbnNwb3J0VGltZW91dElkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrSlMuT1BFTjtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRoaXMuX3RyYW5zcG9ydC50cmFuc3BvcnROYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgZXZlbnRfMVtcImRlZmF1bHRcIl0oJ29wZW4nKSk7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2Nvbm5lY3RlZCcsIHRoaXMudHJhbnNwb3J0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBzZXJ2ZXIgbWlnaHQgaGF2ZSBiZWVuIHJlc3RhcnRlZCwgYW5kIGxvc3QgdHJhY2sgb2Ygb3VyXG4gICAgICAgICAgICAgICAgLy8gY29ubmVjdGlvbi5cbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZSgxMDA2LCAnU2VydmVyIGxvc3Qgc2Vzc2lvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTb2NrSlMucHJvdG90eXBlLl9jbG9zZSA9IGZ1bmN0aW9uIChjb2RlLCByZWFzb24sIHdhc0NsZWFuKSB7XG4gICAgICAgICAgICBkZWJ1ZygnX2Nsb3NlJywgdGhpcy50cmFuc3BvcnQsIGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4sIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICB2YXIgZm9yY2VGYWlsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5faXIpIHtcbiAgICAgICAgICAgICAgICBmb3JjZUZhaWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3RyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNMT1NFRCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZFN0YXRlRXJyb3I6IFNvY2tKUyBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU29ja0pTLkNMT1NJTkc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrSlMuQ0xPU0VEO1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZUZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBldmVudF8xW1wiZGVmYXVsdFwiXSgnZXJyb3InKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBlID0gbmV3IGNsb3NlXzFbXCJkZWZhdWx0XCJdKCk7XG4gICAgICAgICAgICAgICAgZS53YXNDbGVhbiA9IHdhc0NsZWFuIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgIGUuY29kZSA9IGNvZGUgfHwgMTAwMDtcbiAgICAgICAgICAgICAgICBlLnJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1lc3NhZ2UgPSB0aGlzLm9uY2xvc2UgPSB0aGlzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIGRlYnVnKCdkaXNjb25uZWN0ZWQnKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFNlZTogaHR0cDovL3d3dy5lcmcuYWJkbi5hYy51ay9+Z2Vycml0L2RjY3Avbm90ZXMvY2NpZDIvcnRvX2VzdGltYXRvci9cbiAgICAgICAgLy8gYW5kIFJGQyAyOTg4LlxuICAgICAgICBTb2NrSlMucHJvdG90eXBlLmNvdW50UlRPID0gZnVuY3Rpb24gKHJ0dCkge1xuICAgICAgICAgICAgLy8gSW4gYSBsb2NhbCBlbnZpcm9ubWVudCwgd2hlbiB1c2luZyBJRTgvOSBhbmQgdGhlIGBqc29ucC1wb2xsaW5nYFxuICAgICAgICAgICAgLy8gdHJhbnNwb3J0IHRoZSB0aW1lIG5lZWRlZCB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uICh0aGUgdGltZSB0aGF0IHBhc3NcbiAgICAgICAgICAgIC8vIGZyb20gdGhlIG9wZW5pbmcgb2YgdGhlIHRyYW5zcG9ydCB0byB0aGUgY2FsbCBvZiBgX2Rpc3BhdGNoT3BlbmApIGlzXG4gICAgICAgICAgICAvLyBhcm91bmQgMjAwbXNlYyAodGhlIGxvd2VyIGJvdW5kIHVzZWQgaW4gdGhlIGFydGljbGUgYWJvdmUpIGFuZCB0aGlzXG4gICAgICAgICAgICAvLyBjYXVzZXMgc3B1cmlvdXMgdGltZW91dHMuIEZvciB0aGlzIHJlYXNvbiB3ZSBjYWxjdWxhdGUgYSB2YWx1ZSBzbGlnaHRseVxuICAgICAgICAgICAgLy8gbGFyZ2VyIHRoYW4gdGhhdCB1c2VkIGluIHRoZSBhcnRpY2xlLlxuICAgICAgICAgICAgaWYgKHJ0dCA+IDEwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA0ICogcnR0OyAvLyBydG8gPiA0MDBtc2VjXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMzAwICsgcnR0OyAvLyAzMDBtc2VjIDwgcnRvIDw9IDQwMG1zZWNcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBTb2NrSlMudmVyc2lvbiA9IHJlcXVpcmUoJy4vdmVyc2lvbicpO1xuICAgICAgICBTb2NrSlMuQ09OTkVDVElORyA9IDA7XG4gICAgICAgIFNvY2tKUy5PUEVOID0gMTtcbiAgICAgICAgU29ja0pTLkNMT1NJTkcgPSAyO1xuICAgICAgICBTb2NrSlMuQ0xPU0VEID0gMztcbiAgICAgICAgcmV0dXJuIFNvY2tKUztcbiAgICB9KEV2ZW50VGFyZ2V0KSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhdmFpbGFibGVUcmFuc3BvcnRzKSB7XG4gICAgICAgIHRyYW5zcG9ydHMgPSB0cmFuc3BvcnQoYXZhaWxhYmxlVHJhbnNwb3J0cyk7XG4gICAgICAgIHJlcXVpcmUoJy4vaWZyYW1lLWJvb3RzdHJhcCcpKFNvY2tKUywgYXZhaWxhYmxlVHJhbnNwb3J0cyk7XG4gICAgICAgIHJldHVybiBTb2NrSlM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5qcy5tYXAiXX0=
},{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":54,"inherits":56,"json3":57,"url-parse":62}],15:[function(require,module,exports){
/* eslint-disable */
/* jscs: disable */
'use strict';
// pulled specific shims from https://github.com/es-shims/es5-shim
var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;
var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};
var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    }
    catch (e) {
        return false;
    }
}());
// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) {
            return;
        }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
}
else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) {
            return;
        }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
            defineProperty(object, name, map[name], forceAssign);
        }
    }
};
var toObject = function (o) {
    if (o == null) {
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};
//
// Util
// ======
//
// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer
function toInteger(num) {
    var n = +num;
    if (n !== n) {
        n = 0;
    }
    else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}
function ToUint32(x) {
    return x >>> 0;
}
//
// Function
// ========
//
// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5
function Empty() {
}
defineProperties(FunctionPrototype, {
    bind: function bind(that) {
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {
            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.
                var result = target.apply(this, args.concat(array_slice.call(arguments)));
                if (Object(result) === result) {
                    return result;
                }
                return this;
            }
            else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.
                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(that, args.concat(array_slice.call(arguments)));
            }
        };
        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.
        var boundLength = Math.max(0, target.length - args.length);
        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }
        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }
        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.
        return bound;
    }
});
//
// Array
// =====
//
// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') {
                properlyBoxesNonStrict = false;
            }
        });
        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};
defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this), self = splitString && isString(this) ? this.split('') : object, thisp = arguments[1], i = -1, length = self.length >>> 0;
        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }
        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));
// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */) {
        var self = splitString && isString(this) ? this.split('') : toObject(this), length = self.length >>> 0;
        if (!length) {
            return -1;
        }
        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }
        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);
//
// String
// ======
//
// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14
// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]
var string_split = StringPrototype.split;
if ('ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group
        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }
            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }
            var output = [], flags = (separator.ignoreCase ? 'i' : '') +
                (separator.multiline ? 'm' : '') +
                (separator.extended ? 'x' : '') +
                (separator.sticky ? 'y' : ''), // Firefox 3+
            lastLastIndex = 0, 
            // Make `global` and avoid `lastIndex` issues by working with a copy
            separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 :
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            }
            else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());
}
else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) {
            return [];
        }
        return string_split.call(this, separator, limit);
    };
}
// ES5 15.5.4.20
// whitespace from: http://es5.github.io/#x15.5.4.20
var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
    '\u2029\uFEFF';
var zeroWidth = '\u200b';
var wsRegexChars = '[' + ws + ']';
var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
defineProperties(StringPrototype, {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    // http://perfectionkills.com/whitespace-deviations/
    trim: function trim() {
        if (this === void 0 || this === null) {
            throw new TypeError("can't convert " + this + ' to object');
        }
        return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
    }
}, hasTrimWhitespaceBug);
// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(this, start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start, length);
    }
}, hasNegativeSubstrBug);
//# sourceMappingURL=shims.js.map
},{}],16:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return [
        // streaming transports
        require('./transport/websocket'),
        require('./transport/xhr-streaming'),
        require('./transport/xdr-streaming'),
        require('./transport/eventsource'),
        require('./transport/lib/iframe-wrap')(require('./transport/eventsource')),
        require('./transport/htmlfile'),
        require('./transport/lib/iframe-wrap')(require('./transport/htmlfile')),
        require('./transport/xhr-polling'),
        require('./transport/xdr-polling'),
        require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling')),
        require('./transport/jsonp-polling')
    ];
});
//# sourceMappingURL=transport-list.js.map
},{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', '../../utils/event', '../../utils/url'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    var utils = require('../../utils/event');
    var urlUtils = require('../../utils/url');
    var XHR = global.XMLHttpRequest;
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:browser:xhr');
    }
    var cors = false;
    try {
        cors = 'withCredentials' in new XHR();
    }
    catch (ignored) {
    }
    var AbstractXHRObject = (function (_super) {
        __extends(AbstractXHRObject, _super);
        function AbstractXHRObject(method, url, payload, opts) {
            _super.call(this);
            debug(method, url);
            var self = this;
            setTimeout(function () {
                self._start(method, url, payload, opts);
            }, 0);
        }
        AbstractXHRObject.prototype._start = function (method, url, payload, opts) {
            var self = this;
            try {
                this.xhr = new XHR();
            }
            catch (x) {
            }
            if (!this.xhr) {
                debug('no xhr');
                this.emit('finish', 0, 'no xhr support');
                this._cleanup();
                return;
            }
            // several browsers cache POSTs
            url = urlUtils.addQuery(url, 't=' + (+new Date()));
            // Explorer tends to keep connection open, even after the
            // tab gets closed: http://bugs.jquery.com/ticket/5280
            this.unloadRef = utils.unloadAdd(function () {
                debug('unload cleanup');
                self._cleanup(true);
            });
            try {
                this.xhr.open(method, url, true);
                if (this.timeout && 'timeout' in this.xhr) {
                    this.xhr.timeout = this.timeout;
                    this.xhr.ontimeout = function () {
                        debug('xhr timeout');
                        self.emit('finish', 0, '');
                        self._cleanup(false);
                    };
                }
            }
            catch (e) {
                debug('exception', e);
                // IE raises an exception on wrong port.
                this.emit('finish', 0, '');
                this._cleanup(false);
                return;
            }
            if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
                debug('withCredentials');
                // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
                // "This never affects same-site requests."
                this.xhr.withCredentials = 'true';
            }
            if (opts && opts.headers) {
                for (var key in opts.headers) {
                    this.xhr.setRequestHeader(key, opts.headers[key]);
                }
            }
            this.xhr.onreadystatechange = function () {
                if (self.xhr) {
                    var x = self.xhr;
                    var text, status;
                    debug('readyState', x.readyState);
                    switch (x.readyState) {
                        case 3:
                            // IE doesn't like peeking into responseText or status
                            // on Microsoft.XMLHTTP and readystate=3
                            try {
                                status = x.status;
                                text = x.responseText;
                            }
                            catch (e) {
                            }
                            debug('status', status);
                            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
                            if (status === 1223) {
                                status = 204;
                            }
                            // IE does return readystate == 3 for 404 answers.
                            if (status === 200 && text && text.length > 0) {
                                debug('chunk');
                                self.emit('chunk', status, text);
                            }
                            break;
                        case 4:
                            status = x.status;
                            debug('status', status);
                            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
                            if (status === 1223) {
                                status = 204;
                            }
                            // IE returns this for a bad port
                            // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
                            if (status === 12005 || status === 12029) {
                                status = 0;
                            }
                            debug('finish', status, x.responseText);
                            self.emit('finish', status, x.responseText);
                            self._cleanup(false);
                            break;
                    }
                }
            };
            try {
                self.xhr.send(payload);
            }
            catch (e) {
                self.emit('finish', 0, '');
                self._cleanup(false);
            }
        };
        ;
        AbstractXHRObject.prototype._cleanup = function (abort) {
            debug('cleanup');
            if (!this.xhr) {
                return;
            }
            this.removeAllListeners();
            utils.unloadDel(this.unloadRef);
            // IE needs this field to be a function
            this.xhr.onreadystatechange = function () {
            };
            if (this.xhr.ontimeout) {
                this.xhr.ontimeout = null;
            }
            if (abort) {
                try {
                    this.xhr.abort();
                }
                catch (x) {
                }
            }
            this.unloadRef = this.xhr = null;
        };
        ;
        AbstractXHRObject.prototype.close = function () {
            debug('close');
            this._cleanup(true);
        };
        ;
        AbstractXHRObject.enabled = !!XHR;
        AbstractXHRObject.supportsCORS = cors;
        return AbstractXHRObject;
    }(events_1.EventEmitter));
    // override XMLHttpRequest for IE6/7
    // obfuscate to avoid firewalls
    var axo = ['Active'].concat('Object').join('X');
    if (!AbstractXHRObject.enabled && (axo in global)) {
        debug('overriding xmlhttprequest');
        XHR = function () {
            try {
                return new global[axo]('Microsoft.XMLHTTP');
            }
            catch (e) {
                return null;
            }
        };
        AbstractXHRObject.enabled = !!new XHR();
    }
    return AbstractXHRObject;
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvYnJvd3Nlci9hYnN0cmFjdC14aHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2V2ZW50cycsICcuLi8uLi91dGlscy9ldmVudCcsICcuLi8uLi91dGlscy91cmwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgZXZlbnRzXzEgPSByZXF1aXJlKCdldmVudHMnKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9ldmVudCcpO1xuICAgIHZhciB1cmxVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VybCcpO1xuICAgIHZhciBYSFIgPSBnbG9iYWwuWE1MSHR0cFJlcXVlc3Q7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OmJyb3dzZXI6eGhyJyk7XG4gICAgfVxuICAgIHZhciBjb3JzID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgY29ycyA9ICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYSFIoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICB9XG4gICAgdmFyIEFic3RyYWN0WEhST2JqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEFic3RyYWN0WEhST2JqZWN0LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBBYnN0cmFjdFhIUk9iamVjdChtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cykge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBkZWJ1ZyhtZXRob2QsIHVybCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGFydChtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cyk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBBYnN0cmFjdFhIUk9iamVjdC5wcm90b3R5cGUuX3N0YXJ0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBwYXlsb2FkLCBvcHRzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyID0gbmV3IFhIUigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy54aHIpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Zygnbm8geGhyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdmaW5pc2gnLCAwLCAnbm8geGhyIHN1cHBvcnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V2ZXJhbCBicm93c2VycyBjYWNoZSBQT1NUc1xuICAgICAgICAgICAgdXJsID0gdXJsVXRpbHMuYWRkUXVlcnkodXJsLCAndD0nICsgKCtuZXcgRGF0ZSgpKSk7XG4gICAgICAgICAgICAvLyBFeHBsb3JlciB0ZW5kcyB0byBrZWVwIGNvbm5lY3Rpb24gb3BlbiwgZXZlbiBhZnRlciB0aGVcbiAgICAgICAgICAgIC8vIHRhYiBnZXRzIGNsb3NlZDogaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNTI4MFxuICAgICAgICAgICAgdGhpcy51bmxvYWRSZWYgPSB1dGlscy51bmxvYWRBZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCd1bmxvYWQgY2xlYW51cCcpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy54aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dCAmJiAndGltZW91dCcgaW4gdGhpcy54aHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54aHIudGltZW91dCA9IHRoaXMudGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoJ3hociB0aW1lb3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIDAsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2V4Y2VwdGlvbicsIGUpO1xuICAgICAgICAgICAgICAgIC8vIElFIHJhaXNlcyBhbiBleGNlcHRpb24gb24gd3JvbmcgcG9ydC5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2ZpbmlzaCcsIDAsICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKCFvcHRzIHx8ICFvcHRzLm5vQ3JlZGVudGlhbHMpICYmIEFic3RyYWN0WEhST2JqZWN0LnN1cHBvcnRzQ09SUykge1xuICAgICAgICAgICAgICAgIGRlYnVnKCd3aXRoQ3JlZGVudGlhbHMnKTtcbiAgICAgICAgICAgICAgICAvLyBNb3ppbGxhIGRvY3Mgc2F5cyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9YTUxIdHRwUmVxdWVzdCA6XG4gICAgICAgICAgICAgICAgLy8gXCJUaGlzIG5ldmVyIGFmZmVjdHMgc2FtZS1zaXRlIHJlcXVlc3RzLlwiXG4gICAgICAgICAgICAgICAgdGhpcy54aHIud2l0aENyZWRlbnRpYWxzID0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdHMuaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgb3B0cy5oZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBzZWxmLnhocjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQsIHN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ3JlYWR5U3RhdGUnLCB4LnJlYWR5U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHgucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIGRvZXNuJ3QgbGlrZSBwZWVraW5nIGludG8gcmVzcG9uc2VUZXh0IG9yIHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIE1pY3Jvc29mdC5YTUxIVFRQIGFuZCByZWFkeXN0YXRlPTNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB4LnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHgucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zygnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSByZXR1cm5zIDEyMjMgZm9yIDIwNDogaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEyMjMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMjA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSBkb2VzIHJldHVybiByZWFkeXN0YXRlID09IDMgZm9yIDQwNCBhbnN3ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDIwMCAmJiB0ZXh0ICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnY2h1bmsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdjaHVuaycsIHN0YXR1cywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHguc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIHJldHVybnMgMTIyMyBmb3IgMjA0OiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xNDUwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIHJldHVybnMgdGhpcyBmb3IgYSBiYWQgcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS93aW5kb3dzL2Rlc2t0b3AvYWEzODM3NzAodj12cy44NSkuYXNweFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEyMDA1IHx8IHN0YXR1cyA9PT0gMTIwMjkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoJ2ZpbmlzaCcsIHN0YXR1cywgeC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZmluaXNoJywgc3RhdHVzLCB4LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2xlYW51cChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLnhoci5zZW5kKHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIDAsICcnKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jbGVhbnVwKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBBYnN0cmFjdFhIUk9iamVjdC5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbiAoYWJvcnQpIHtcbiAgICAgICAgICAgIGRlYnVnKCdjbGVhbnVwJyk7XG4gICAgICAgICAgICBpZiAoIXRoaXMueGhyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHV0aWxzLnVubG9hZERlbCh0aGlzLnVubG9hZFJlZik7XG4gICAgICAgICAgICAvLyBJRSBuZWVkcyB0aGlzIGZpZWxkIHRvIGJlIGEgZnVuY3Rpb25cbiAgICAgICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy54aHIub250aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54aHIub250aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhYm9ydCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmxvYWRSZWYgPSB0aGlzLnhociA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgQWJzdHJhY3RYSFJPYmplY3QucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2Nsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEFic3RyYWN0WEhST2JqZWN0LmVuYWJsZWQgPSAhIVhIUjtcbiAgICAgICAgQWJzdHJhY3RYSFJPYmplY3Quc3VwcG9ydHNDT1JTID0gY29ycztcbiAgICAgICAgcmV0dXJuIEFic3RyYWN0WEhST2JqZWN0O1xuICAgIH0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG4gICAgLy8gb3ZlcnJpZGUgWE1MSHR0cFJlcXVlc3QgZm9yIElFNi83XG4gICAgLy8gb2JmdXNjYXRlIHRvIGF2b2lkIGZpcmV3YWxsc1xuICAgIHZhciBheG8gPSBbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpO1xuICAgIGlmICghQWJzdHJhY3RYSFJPYmplY3QuZW5hYmxlZCAmJiAoYXhvIGluIGdsb2JhbCkpIHtcbiAgICAgICAgZGVidWcoJ292ZXJyaWRpbmcgeG1saHR0cHJlcXVlc3QnKTtcbiAgICAgICAgWEhSID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGdsb2JhbFtheG9dKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQWJzdHJhY3RYSFJPYmplY3QuZW5hYmxlZCA9ICEhbmV3IFhIUigpO1xuICAgIH1cbiAgICByZXR1cm4gQWJzdHJhY3RYSFJPYmplY3Q7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFic3RyYWN0LXhoci5qcy5tYXAiXX0=
},{"../../utils/event":46,"../../utils/url":52,"debug":54,"events":3}],18:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return global.EventSource;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvYnJvd3Nlci9ldmVudHNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gZ2xvYmFsLkV2ZW50U291cmNlO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHNvdXJjZS5qcy5tYXAiXX0=
},{}],19:[function(require,module,exports){
(function (global){
'use strict';
var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
    module.exports = function WebSocketBrowserDriver(url) {
        return new Driver(url);
    };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvYnJvd3Nlci93ZWJzb2NrZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciBEcml2ZXIgPSBnbG9iYWwuV2ViU29ja2V0IHx8IGdsb2JhbC5Nb3pXZWJTb2NrZXQ7XG5pZiAoRHJpdmVyKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBXZWJTb2NrZXRCcm93c2VyRHJpdmVyKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IERyaXZlcih1cmwpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJzb2NrZXQuanMubWFwIl19
},{}],20:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lib/ajax-based', './receiver/eventsource', './sender/xhr-cors'], factory);
    }
})(function (require, exports) {
    "use strict";
    var AjaxBasedTransport = require('./lib/ajax-based');
    var EventSourceReceiver = require('./receiver/eventsource');
    var XHRCorsObject = require('./sender/xhr-cors');
    var EventSourceDriver = require('eventsource');
    return (function (_super) {
        __extends(EventSourceTransport, _super);
        function EventSourceTransport(transUrl) {
            if (!EventSourceTransport.enabled()) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
        }
        EventSourceTransport.enabled = function () {
            return !!EventSourceDriver;
        };
        EventSourceTransport.transportName = 'eventsource';
        EventSourceTransport.roundTrips = 2;
        return EventSourceTransport;
    }(AjaxBasedTransport));
});
//# sourceMappingURL=eventsource.js.map
},{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18}],21:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './receiver/htmlfile', './sender/xhr-local', './lib/ajax-based'], factory);
    }
})(function (require, exports) {
    "use strict";
    var HtmlfileReceiver = require('./receiver/htmlfile');
    var XHRLocalObject = require('./sender/xhr-local');
    var AjaxBasedTransport = require('./lib/ajax-based');
    return (function (_super) {
        __extends(HtmlFileTransport, _super);
        function HtmlFileTransport(transUrl) {
            if (!HtmlfileReceiver.enabled) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
        }
        HtmlFileTransport.enabled = function (info) {
            return HtmlfileReceiver.enabled && info.sameOrigin;
        };
        ;
        HtmlFileTransport.transportName = 'htmlfile';
        HtmlFileTransport.roundTrips = 2;
        return HtmlFileTransport;
    }(AjaxBasedTransport));
});
//# sourceMappingURL=htmlfile.js.map
},{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37}],22:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', '../version', '../utils/url', '../utils/iframe', '../utils/event', '../utils/random'], factory);
    }
})(function (require, exports) {
    'use strict';
    // Few cool transports do work only for same-origin. In order to make
    // them work cross-domain we shall use iframe, served from the
    // remote domain. New browsers have capabilities to communicate with
    // cross domain iframe using postMessage(). In IE it was implemented
    // from IE 8+, but of course, IE got some details wrong:
    //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
    //    http://stevesouders.com/misc/test-postmessage.php
    var JSON3 = require('json3');
    var events_1 = require('events');
    var version = require('../version');
    var urlUtils = require('../utils/url');
    var iframeUtils = require('../utils/iframe');
    var eventUtils = require('../utils/event');
    var random = require('../utils/random');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:transport:iframe');
    }
    return (function (_super) {
        __extends(IframeTransport, _super);
        function IframeTransport(transport, transUrl, baseUrl) {
            _super.call(this);
            if (!IframeTransport.enabled()) {
                throw new Error('Transport created when disabled');
            }
            var self = this;
            this.origin = urlUtils.getOrigin(baseUrl);
            this.baseUrl = baseUrl;
            this.transUrl = transUrl;
            this.transport = transport;
            this.windowId = random.string(8);
            var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
            debug(transport, transUrl, iframeUrl);
            this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
                debug('err callback');
                self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
                self.close();
            });
            this.onmessageCallback = this._message.bind(this);
            eventUtils.attachEvent('message', this.onmessageCallback);
        }
        IframeTransport.prototype.close = function () {
            debug('close');
            this.removeAllListeners();
            if (this.iframeObj) {
                eventUtils.detachEvent('message', this.onmessageCallback);
                try {
                    // When the iframe is not loaded, IE raises an exception
                    // on 'contentWindow'.
                    this.postMessage('c');
                }
                catch (x) {
                }
                this.iframeObj.cleanup();
                this.iframeObj = null;
                this.onmessageCallback = this.iframeObj = null;
            }
        };
        ;
        IframeTransport.prototype._message = function (e) {
            debug('message', e.data);
            if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
                debug('not same origin', e.origin, this.origin);
                return;
            }
            var iframeMessage;
            try {
                iframeMessage = JSON3.parse(e.data);
            }
            catch (ignored) {
                debug('bad json', e.data);
                return;
            }
            if (iframeMessage.windowId !== this.windowId) {
                debug('mismatched window id', iframeMessage.windowId, this.windowId);
                return;
            }
            switch (iframeMessage.type) {
                case 's':
                    this.iframeObj.loaded();
                    // window global dependency
                    this.postMessage('s', JSON3.stringify([
                        version,
                        this.transport,
                        this.transUrl,
                        this.baseUrl
                    ]));
                    break;
                case 't':
                    this.emit('message', iframeMessage.data);
                    break;
                case 'c':
                    var cdata;
                    try {
                        cdata = JSON3.parse(iframeMessage.data);
                    }
                    catch (ignored) {
                        debug('bad json', iframeMessage.data);
                        return;
                    }
                    this.emit('close', cdata[0], cdata[1]);
                    this.close();
                    break;
            }
        };
        ;
        IframeTransport.prototype.postMessage = function (type, data) {
            debug('postMessage', type, data);
            this.iframeObj.post(JSON3.stringify({
                windowId: this.windowId,
                type: type,
                data: data || ''
            }), this.origin);
        };
        ;
        IframeTransport.prototype.send = function (message) {
            debug('send', message);
            this.postMessage('m', message);
        };
        ;
        IframeTransport.enabled = function () {
            return iframeUtils.iframeEnabled;
        };
        ;
        IframeTransport.transportName = 'iframe';
        IframeTransport.roundTrips = 2;
        return IframeTransport;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvaWZyYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICdldmVudHMnLCAnLi4vdmVyc2lvbicsICcuLi91dGlscy91cmwnLCAnLi4vdXRpbHMvaWZyYW1lJywgJy4uL3V0aWxzL2V2ZW50JywgJy4uL3V0aWxzL3JhbmRvbSddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAvLyBGZXcgY29vbCB0cmFuc3BvcnRzIGRvIHdvcmsgb25seSBmb3Igc2FtZS1vcmlnaW4uIEluIG9yZGVyIHRvIG1ha2VcbiAgICAvLyB0aGVtIHdvcmsgY3Jvc3MtZG9tYWluIHdlIHNoYWxsIHVzZSBpZnJhbWUsIHNlcnZlZCBmcm9tIHRoZVxuICAgIC8vIHJlbW90ZSBkb21haW4uIE5ldyBicm93c2VycyBoYXZlIGNhcGFiaWxpdGllcyB0byBjb21tdW5pY2F0ZSB3aXRoXG4gICAgLy8gY3Jvc3MgZG9tYWluIGlmcmFtZSB1c2luZyBwb3N0TWVzc2FnZSgpLiBJbiBJRSBpdCB3YXMgaW1wbGVtZW50ZWRcbiAgICAvLyBmcm9tIElFIDgrLCBidXQgb2YgY291cnNlLCBJRSBnb3Qgc29tZSBkZXRhaWxzIHdyb25nOlxuICAgIC8vICAgIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9jYzE5NzAxNSh2PVZTLjg1KS5hc3B4XG4gICAgLy8gICAgaHR0cDovL3N0ZXZlc291ZGVycy5jb20vbWlzYy90ZXN0LXBvc3RtZXNzYWdlLnBocFxuICAgIHZhciBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJyk7XG4gICAgdmFyIGV2ZW50c18xID0gcmVxdWlyZSgnZXZlbnRzJyk7XG4gICAgdmFyIHZlcnNpb24gPSByZXF1aXJlKCcuLi92ZXJzaW9uJyk7XG4gICAgdmFyIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvdXJsJyk7XG4gICAgdmFyIGlmcmFtZVV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvaWZyYW1lJyk7XG4gICAgdmFyIGV2ZW50VXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9ldmVudCcpO1xuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuLi91dGlscy9yYW5kb20nKTtcbiAgICB2YXIgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBfW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6dHJhbnNwb3J0OmlmcmFtZScpO1xuICAgIH1cbiAgICByZXR1cm4gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKElmcmFtZVRyYW5zcG9ydCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSWZyYW1lVHJhbnNwb3J0KHRyYW5zcG9ydCwgdHJhbnNVcmwsIGJhc2VVcmwpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFJZnJhbWVUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbiA9IHVybFV0aWxzLmdldE9yaWdpbihiYXNlVXJsKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgICAgICAgICB0aGlzLnRyYW5zVXJsID0gdHJhbnNVcmw7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMud2luZG93SWQgPSByYW5kb20uc3RyaW5nKDgpO1xuICAgICAgICAgICAgdmFyIGlmcmFtZVVybCA9IHVybFV0aWxzLmFkZFBhdGgoYmFzZVVybCwgJy9pZnJhbWUuaHRtbCcpICsgJyMnICsgdGhpcy53aW5kb3dJZDtcbiAgICAgICAgICAgIGRlYnVnKHRyYW5zcG9ydCwgdHJhbnNVcmwsIGlmcmFtZVVybCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZU9iaiA9IGlmcmFtZVV0aWxzLmNyZWF0ZUlmcmFtZShpZnJhbWVVcmwsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2VyciBjYWxsYmFjaycpO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnY2xvc2UnLCAxMDA2LCAnVW5hYmxlIHRvIGxvYWQgYW4gaWZyYW1lICgnICsgciArICcpJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9ubWVzc2FnZUNhbGxiYWNrID0gdGhpcy5fbWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgZXZlbnRVdGlscy5hdHRhY2hFdmVudCgnbWVzc2FnZScsIHRoaXMub25tZXNzYWdlQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIElmcmFtZVRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1ZygnY2xvc2UnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pZnJhbWVPYmopIHtcbiAgICAgICAgICAgICAgICBldmVudFV0aWxzLmRldGFjaEV2ZW50KCdtZXNzYWdlJywgdGhpcy5vbm1lc3NhZ2VDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIG5vdCBsb2FkZWQsIElFIHJhaXNlcyBhbiBleGNlcHRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gb24gJ2NvbnRlbnRXaW5kb3cnLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKCdjJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lT2JqLmNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlmcmFtZU9iaiA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1lc3NhZ2VDYWxsYmFjayA9IHRoaXMuaWZyYW1lT2JqID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBJZnJhbWVUcmFuc3BvcnQucHJvdG90eXBlLl9tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGRlYnVnKCdtZXNzYWdlJywgZS5kYXRhKTtcbiAgICAgICAgICAgIGlmICghdXJsVXRpbHMuaXNPcmlnaW5FcXVhbChlLm9yaWdpbiwgdGhpcy5vcmlnaW4pKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ25vdCBzYW1lIG9yaWdpbicsIGUub3JpZ2luLCB0aGlzLm9yaWdpbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGlmcmFtZU1lc3NhZ2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmcmFtZU1lc3NhZ2UgPSBKU09OMy5wYXJzZShlLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnYmFkIGpzb24nLCBlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZnJhbWVNZXNzYWdlLndpbmRvd0lkICE9PSB0aGlzLndpbmRvd0lkKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ21pc21hdGNoZWQgd2luZG93IGlkJywgaWZyYW1lTWVzc2FnZS53aW5kb3dJZCwgdGhpcy53aW5kb3dJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChpZnJhbWVNZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZnJhbWVPYmoubG9hZGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdyBnbG9iYWwgZGVwZW5kZW5jeVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKCdzJywgSlNPTjMuc3RyaW5naWZ5KFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VVcmxcbiAgICAgICAgICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgaWZyYW1lTWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBjZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNkYXRhID0gSlNPTjMucGFyc2UoaWZyYW1lTWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoaWdub3JlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoJ2JhZCBqc29uJywgaWZyYW1lTWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgY2RhdGFbMF0sIGNkYXRhWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBJZnJhbWVUcmFuc3BvcnQucHJvdG90eXBlLnBvc3RNZXNzYWdlID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGRlYnVnKCdwb3N0TWVzc2FnZScsIHR5cGUsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVPYmoucG9zdChKU09OMy5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHdpbmRvd0lkOiB0aGlzLndpbmRvd0lkLFxuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSB8fCAnJ1xuICAgICAgICAgICAgfSksIHRoaXMub3JpZ2luKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBJZnJhbWVUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgICAgZGVidWcoJ3NlbmQnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UoJ20nLCBtZXNzYWdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBJZnJhbWVUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBpZnJhbWVVdGlscy5pZnJhbWVFbmFibGVkO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIElmcmFtZVRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2lmcmFtZSc7XG4gICAgICAgIElmcmFtZVRyYW5zcG9ydC5yb3VuZFRyaXBzID0gMjtcbiAgICAgICAgcmV0dXJuIElmcmFtZVRyYW5zcG9ydDtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZnJhbWUuanMubWFwIl19
},{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":54,"events":3,"json3":57}],23:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lib/sender-receiver', './receiver/jsonp', './sender/jsonp'], factory);
    }
})(function (require, exports) {
    'use strict';
    // The simplest and most robust transport, using the well-know cross
    // domain hack - JSONP. This transport is quite inefficient - one
    // message could use up to one http request. But at least it works almost
    // everywhere.
    // Known limitations:
    //   o you will get a spinning cursor
    //   o for Konqueror a dumb timer is needed to detect errors
    var SenderReceiver = require('./lib/sender-receiver');
    var JsonpReceiver = require('./receiver/jsonp');
    var jsonpSender = require('./sender/jsonp');
    return (function (_super) {
        __extends(JsonPTransport, _super);
        function JsonPTransport(transUrl) {
            if (!JsonPTransport.enabled()) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
        }
        JsonPTransport.enabled = function () {
            return !!global.document;
        };
        JsonPTransport.transportName = 'jsonp-polling';
        JsonPTransport.roundTrips = 1;
        JsonPTransport.needBody = true;
        return JsonPTransport;
    }(SenderReceiver));
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvanNvbnAtcG9sbGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL2xpYi9zZW5kZXItcmVjZWl2ZXInLCAnLi9yZWNlaXZlci9qc29ucCcsICcuL3NlbmRlci9qc29ucCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAvLyBUaGUgc2ltcGxlc3QgYW5kIG1vc3Qgcm9idXN0IHRyYW5zcG9ydCwgdXNpbmcgdGhlIHdlbGwta25vdyBjcm9zc1xuICAgIC8vIGRvbWFpbiBoYWNrIC0gSlNPTlAuIFRoaXMgdHJhbnNwb3J0IGlzIHF1aXRlIGluZWZmaWNpZW50IC0gb25lXG4gICAgLy8gbWVzc2FnZSBjb3VsZCB1c2UgdXAgdG8gb25lIGh0dHAgcmVxdWVzdC4gQnV0IGF0IGxlYXN0IGl0IHdvcmtzIGFsbW9zdFxuICAgIC8vIGV2ZXJ5d2hlcmUuXG4gICAgLy8gS25vd24gbGltaXRhdGlvbnM6XG4gICAgLy8gICBvIHlvdSB3aWxsIGdldCBhIHNwaW5uaW5nIGN1cnNvclxuICAgIC8vICAgbyBmb3IgS29ucXVlcm9yIGEgZHVtYiB0aW1lciBpcyBuZWVkZWQgdG8gZGV0ZWN0IGVycm9yc1xuICAgIHZhciBTZW5kZXJSZWNlaXZlciA9IHJlcXVpcmUoJy4vbGliL3NlbmRlci1yZWNlaXZlcicpO1xuICAgIHZhciBKc29ucFJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlci9qc29ucCcpO1xuICAgIHZhciBqc29ucFNlbmRlciA9IHJlcXVpcmUoJy4vc2VuZGVyL2pzb25wJyk7XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhKc29uUFRyYW5zcG9ydCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gSnNvblBUcmFuc3BvcnQodHJhbnNVcmwpIHtcbiAgICAgICAgICAgIGlmICghSnNvblBUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy9qc29ucCcsIGpzb25wU2VuZGVyLCBKc29ucFJlY2VpdmVyKTtcbiAgICAgICAgfVxuICAgICAgICBKc29uUFRyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhZ2xvYmFsLmRvY3VtZW50O1xuICAgICAgICB9O1xuICAgICAgICBKc29uUFRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2pzb25wLXBvbGxpbmcnO1xuICAgICAgICBKc29uUFRyYW5zcG9ydC5yb3VuZFRyaXBzID0gMTtcbiAgICAgICAgSnNvblBUcmFuc3BvcnQubmVlZEJvZHkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gSnNvblBUcmFuc3BvcnQ7XG4gICAgfShTZW5kZXJSZWNlaXZlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc29ucC1wb2xsaW5nLmpzLm1hcCJdfQ==
},{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33}],24:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../utils/url', './sender-receiver'], factory);
    }
})(function (require, exports) {
    "use strict";
    var urlUtils = require('../../utils/url');
    var SenderReceiver = require('./sender-receiver');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:ajax-based');
    }
    function createAjaxSender(AjaxObject) {
        return function (url, payload, callback) {
            debug('create ajax sender', url, payload);
            var opt = {};
            if (typeof payload === 'string') {
                opt.headers = { 'Content-type': 'text/plain' };
            }
            var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
            var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
            xo.once('finish', function (status) {
                debug('finish', status);
                xo = null;
                if (status !== 200 && status !== 204) {
                    return callback(new Error('http status ' + status));
                }
                callback();
            });
            return function () {
                debug('abort');
                xo.close();
                xo = null;
                var err = new Error('Aborted');
                err.code = 1000;
                callback(err);
            };
        };
    }
    return (function (_super) {
        __extends(AjaxBasedTransport, _super);
        function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
            _super.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
        }
        return AjaxBasedTransport;
    }(SenderReceiver));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvbGliL2FqYXgtYmFzZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi8uLi91dGlscy91cmwnLCAnLi9zZW5kZXItcmVjZWl2ZXInXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKTtcbiAgICB2YXIgU2VuZGVyUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3NlbmRlci1yZWNlaXZlcicpO1xuICAgIHZhciBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIF9bX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDphamF4LWJhc2VkJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFqYXhTZW5kZXIoQWpheE9iamVjdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHVybCwgcGF5bG9hZCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRlYnVnKCdjcmVhdGUgYWpheCBzZW5kZXInLCB1cmwsIHBheWxvYWQpO1xuICAgICAgICAgICAgdmFyIG9wdCA9IHt9O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG9wdC5oZWFkZXJzID0geyAnQ29udGVudC10eXBlJzogJ3RleHQvcGxhaW4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYWpheFVybCA9IHVybFV0aWxzLmFkZFBhdGgodXJsLCAnL3hocl9zZW5kJyk7XG4gICAgICAgICAgICB2YXIgeG8gPSBuZXcgQWpheE9iamVjdCgnUE9TVCcsIGFqYXhVcmwsIHBheWxvYWQsIG9wdCk7XG4gICAgICAgICAgICB4by5vbmNlKCdmaW5pc2gnLCBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2ZpbmlzaCcsIHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgeG8gPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IDIwMCAmJiBzdGF0dXMgIT09IDIwNCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKCdodHRwIHN0YXR1cyAnICsgc3RhdHVzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2Fib3J0Jyk7XG4gICAgICAgICAgICAgICAgeG8uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB4byA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignQWJvcnRlZCcpO1xuICAgICAgICAgICAgICAgIGVyci5jb2RlID0gMTAwMDtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhBamF4QmFzZWRUcmFuc3BvcnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEFqYXhCYXNlZFRyYW5zcG9ydCh0cmFuc1VybCwgdXJsU3VmZml4LCBSZWNlaXZlciwgQWpheE9iamVjdCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdHJhbnNVcmwsIHVybFN1ZmZpeCwgY3JlYXRlQWpheFNlbmRlcihBamF4T2JqZWN0KSwgUmVjZWl2ZXIsIEFqYXhPYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBamF4QmFzZWRUcmFuc3BvcnQ7XG4gICAgfShTZW5kZXJSZWNlaXZlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hamF4LWJhc2VkLmpzLm1hcCJdfQ==
},{"../../utils/url":52,"./sender-receiver":28,"debug":54}],25:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events'], factory);
    }
})(function (require, exports) {
    'use strict';
    var events_1 = require('events');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:buffered-sender');
    }
    return (function (_super) {
        __extends(BufferedSender, _super);
        function BufferedSender(url, sender) {
            _super.call(this);
            debug(url);
            this.sendBuffer = [];
            this.sender = sender;
            this.url = url;
        }
        BufferedSender.prototype.send = function (message) {
            debug('send', message);
            this.sendBuffer.push(message);
            if (!this.sendStop) {
                this.sendSchedule();
            }
        };
        ;
        // For polling transports in a situation when in the message callback,
        // new message is being send. If the sending connection was started
        // before receiving one, it is possible to saturate the network and
        // timeout due to the lack of receiving socket. To avoid that we delay
        // sending messages by some small time, in order to let receiving
        // connection be started beforehand. This is only a halfmeasure and
        // does not fix the big problem, but it does make the tests go more
        // stable on slow networks.
        BufferedSender.prototype.sendScheduleWait = function () {
            debug('sendScheduleWait');
            var self = this;
            var tref;
            this.sendStop = function () {
                debug('sendStop');
                self.sendStop = null;
                clearTimeout(tref);
            };
            tref = setTimeout(function () {
                debug('timeout');
                self.sendStop = null;
                self.sendSchedule();
            }, 25);
        };
        ;
        BufferedSender.prototype.sendSchedule = function () {
            debug('sendSchedule', this.sendBuffer.length);
            var self = this;
            if (this.sendBuffer.length > 0) {
                var payload = '[' + this.sendBuffer.join(',') + ']';
                this.sendStop = this.sender(this.url, payload, function (err) {
                    self.sendStop = null;
                    if (err) {
                        debug('error', err);
                        self.emit('close', err.code || 1006, 'Sending error: ' + err);
                        self._cleanup();
                    }
                    else {
                        self.sendScheduleWait();
                    }
                });
                this.sendBuffer = [];
            }
        };
        ;
        BufferedSender.prototype._cleanup = function () {
            debug('_cleanup');
            this.removeAllListeners();
        };
        ;
        BufferedSender.prototype.stop = function () {
            debug('stop');
            this._cleanup();
            if (this.sendStop) {
                this.sendStop();
                this.sendStop = null;
            }
        };
        ;
        return BufferedSender;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvbGliL2J1ZmZlcmVkLXNlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2V2ZW50cyddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgZXZlbnRzXzEgPSByZXF1aXJlKCdldmVudHMnKTtcbiAgICB2YXIgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBfW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6YnVmZmVyZWQtc2VuZGVyJyk7XG4gICAgfVxuICAgIHJldHVybiAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQnVmZmVyZWRTZW5kZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEJ1ZmZlcmVkU2VuZGVyKHVybCwgc2VuZGVyKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGRlYnVnKHVybCk7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgQnVmZmVyZWRTZW5kZXIucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgICAgZGVidWcoJ3NlbmQnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbmRTdG9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU2NoZWR1bGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICAvLyBGb3IgcG9sbGluZyB0cmFuc3BvcnRzIGluIGEgc2l0dWF0aW9uIHdoZW4gaW4gdGhlIG1lc3NhZ2UgY2FsbGJhY2ssXG4gICAgICAgIC8vIG5ldyBtZXNzYWdlIGlzIGJlaW5nIHNlbmQuIElmIHRoZSBzZW5kaW5nIGNvbm5lY3Rpb24gd2FzIHN0YXJ0ZWRcbiAgICAgICAgLy8gYmVmb3JlIHJlY2VpdmluZyBvbmUsIGl0IGlzIHBvc3NpYmxlIHRvIHNhdHVyYXRlIHRoZSBuZXR3b3JrIGFuZFxuICAgICAgICAvLyB0aW1lb3V0IGR1ZSB0byB0aGUgbGFjayBvZiByZWNlaXZpbmcgc29ja2V0LiBUbyBhdm9pZCB0aGF0IHdlIGRlbGF5XG4gICAgICAgIC8vIHNlbmRpbmcgbWVzc2FnZXMgYnkgc29tZSBzbWFsbCB0aW1lLCBpbiBvcmRlciB0byBsZXQgcmVjZWl2aW5nXG4gICAgICAgIC8vIGNvbm5lY3Rpb24gYmUgc3RhcnRlZCBiZWZvcmVoYW5kLiBUaGlzIGlzIG9ubHkgYSBoYWxmbWVhc3VyZSBhbmRcbiAgICAgICAgLy8gZG9lcyBub3QgZml4IHRoZSBiaWcgcHJvYmxlbSwgYnV0IGl0IGRvZXMgbWFrZSB0aGUgdGVzdHMgZ28gbW9yZVxuICAgICAgICAvLyBzdGFibGUgb24gc2xvdyBuZXR3b3Jrcy5cbiAgICAgICAgQnVmZmVyZWRTZW5kZXIucHJvdG90eXBlLnNlbmRTY2hlZHVsZVdhaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1Zygnc2VuZFNjaGVkdWxlV2FpdCcpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHRyZWY7XG4gICAgICAgICAgICB0aGlzLnNlbmRTdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdzZW5kU3RvcCcpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VuZFN0b3AgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0cmVmKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmVmID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ3RpbWVvdXQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmRTdG9wID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmRTY2hlZHVsZSgpO1xuICAgICAgICAgICAgfSwgMjUpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5zZW5kU2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1Zygnc2VuZFNjaGVkdWxlJywgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGhpcy5zZW5kQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9ICdbJyArIHRoaXMuc2VuZEJ1ZmZlci5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU3RvcCA9IHRoaXMuc2VuZGVyKHRoaXMudXJsLCBwYXlsb2FkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VuZFN0b3AgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIGVyci5jb2RlIHx8IDEwMDYsICdTZW5kaW5nIGVycm9yOiAnICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VuZFNjaGVkdWxlV2FpdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgQnVmZmVyZWRTZW5kZXIucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ19jbGVhbnVwJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ3N0b3AnKTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbmRTdG9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFN0b3AgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIHJldHVybiBCdWZmZXJlZFNlbmRlcjtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWZmZXJlZC1zZW5kZXIuanMubWFwIl19
},{"debug":54,"events":3}],26:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../iframe', '../../utils/object'], factory);
    }
})(function (require, exports) {
    "use strict";
    var IframeTransport = require('../iframe');
    var objectUtils = require('../../utils/object');
    return function (transport) {
        var IframeWrapTransport = (function (_super) {
            __extends(IframeWrapTransport, _super);
            function IframeWrapTransport(transUrl, baseUrl) {
                _super.call(this, transport.transportName, transUrl, baseUrl);
            }
            IframeWrapTransport.enabled = function (url, info) {
                if (!global.document) {
                    return false;
                }
                var iframeInfo = objectUtils.extend({}, info);
                iframeInfo.sameOrigin = true;
                return transport.enabled(iframeInfo) && IframeTransport.enabled();
            };
            ;
            IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
            IframeWrapTransport.needBody = true;
            IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)
            IframeWrapTransport.facadeTransport = transport;
            return IframeWrapTransport;
        }(IframeTransport));
        return IframeWrapTransport;
    };
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvbGliL2lmcmFtZS13cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9pZnJhbWUnLCAnLi4vLi4vdXRpbHMvb2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIElmcmFtZVRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL2lmcmFtZScpO1xuICAgIHZhciBvYmplY3RVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL29iamVjdCcpO1xuICAgIHJldHVybiBmdW5jdGlvbiAodHJhbnNwb3J0KSB7XG4gICAgICAgIHZhciBJZnJhbWVXcmFwVHJhbnNwb3J0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgIF9fZXh0ZW5kcyhJZnJhbWVXcmFwVHJhbnNwb3J0LCBfc3VwZXIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gSWZyYW1lV3JhcFRyYW5zcG9ydCh0cmFuc1VybCwgYmFzZVVybCkge1xuICAgICAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRyYW5zcG9ydC50cmFuc3BvcnROYW1lLCB0cmFuc1VybCwgYmFzZVVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBJZnJhbWVXcmFwVHJhbnNwb3J0LmVuYWJsZWQgPSBmdW5jdGlvbiAodXJsLCBpbmZvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaWZyYW1lSW5mbyA9IG9iamVjdFV0aWxzLmV4dGVuZCh7fSwgaW5mbyk7XG4gICAgICAgICAgICAgICAgaWZyYW1lSW5mby5zYW1lT3JpZ2luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwb3J0LmVuYWJsZWQoaWZyYW1lSW5mbykgJiYgSWZyYW1lVHJhbnNwb3J0LmVuYWJsZWQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBJZnJhbWVXcmFwVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAnaWZyYW1lLScgKyB0cmFuc3BvcnQudHJhbnNwb3J0TmFtZTtcbiAgICAgICAgICAgIElmcmFtZVdyYXBUcmFuc3BvcnQubmVlZEJvZHkgPSB0cnVlO1xuICAgICAgICAgICAgSWZyYW1lV3JhcFRyYW5zcG9ydC5yb3VuZFRyaXBzID0gSWZyYW1lVHJhbnNwb3J0LnJvdW5kVHJpcHMgKyB0cmFuc3BvcnQucm91bmRUcmlwcyAtIDE7IC8vIGh0bWwsIGphdmFzY3JpcHQgKDIpICsgdHJhbnNwb3J0IC0gbm8gQ09SUyAoMSlcbiAgICAgICAgICAgIElmcmFtZVdyYXBUcmFuc3BvcnQuZmFjYWRlVHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAgICAgcmV0dXJuIElmcmFtZVdyYXBUcmFuc3BvcnQ7XG4gICAgICAgIH0oSWZyYW1lVHJhbnNwb3J0KSk7XG4gICAgICAgIHJldHVybiBJZnJhbWVXcmFwVHJhbnNwb3J0O1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlmcmFtZS13cmFwLmpzLm1hcCJdfQ==
},{"../../utils/object":49,"../iframe":22}],27:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:polling');
    }
    return (function (_super) {
        __extends(Polling, _super);
        function Polling(Receiver, receiveUrl, AjaxObject) {
            _super.call(this);
            debug(receiveUrl);
            this.Receiver = Receiver;
            this.receiveUrl = receiveUrl;
            this.AjaxObject = AjaxObject;
            this._scheduleReceiver();
        }
        Polling.prototype._scheduleReceiver = function () {
            debug('_scheduleReceiver');
            var self = this;
            var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
            poll.on('message', function (msg) {
                debug('message', msg);
                self.emit('message', msg);
            });
            poll.once('close', function (code, reason) {
                debug('close', code, reason, self.pollIsClosing);
                self.poll = poll = null;
                if (!self.pollIsClosing) {
                    if (reason === 'network') {
                        self._scheduleReceiver();
                    }
                    else {
                        self.emit('close', code || 1006, reason);
                        self.removeAllListeners();
                    }
                }
            });
        };
        ;
        Polling.prototype.abort = function () {
            debug('abort');
            this.removeAllListeners();
            this.pollIsClosing = true;
            if (this.poll) {
                this.poll.abort();
            }
        };
        ;
        return Polling;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvbGliL3BvbGxpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICdldmVudHMnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgZXZlbnRzXzEgPSByZXF1aXJlKCdldmVudHMnKTtcbiAgICB2YXIgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBfW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6cG9sbGluZycpO1xuICAgIH1cbiAgICByZXR1cm4gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFBvbGxpbmcsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFBvbGxpbmcoUmVjZWl2ZXIsIHJlY2VpdmVVcmwsIEFqYXhPYmplY3QpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgZGVidWcocmVjZWl2ZVVybCk7XG4gICAgICAgICAgICB0aGlzLlJlY2VpdmVyID0gUmVjZWl2ZXI7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVVcmwgPSByZWNlaXZlVXJsO1xuICAgICAgICAgICAgdGhpcy5BamF4T2JqZWN0ID0gQWpheE9iamVjdDtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlUmVjZWl2ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS5fc2NoZWR1bGVSZWNlaXZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfc2NoZWR1bGVSZWNlaXZlcicpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHBvbGwgPSB0aGlzLnBvbGwgPSBuZXcgdGhpcy5SZWNlaXZlcih0aGlzLnJlY2VpdmVVcmwsIHRoaXMuQWpheE9iamVjdCk7XG4gICAgICAgICAgICBwb2xsLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdtZXNzYWdlJywgbXNnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwb2xsLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gKGNvZGUsIHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdjbG9zZScsIGNvZGUsIHJlYXNvbiwgc2VsZi5wb2xsSXNDbG9zaW5nKTtcbiAgICAgICAgICAgICAgICBzZWxmLnBvbGwgPSBwb2xsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYucG9sbElzQ2xvc2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uID09PSAnbmV0d29yaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3NjaGVkdWxlUmVjZWl2ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnY2xvc2UnLCBjb2RlIHx8IDEwMDYsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1ZygnYWJvcnQnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnBvbGxJc0Nsb3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9sbC5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIHJldHVybiBQb2xsaW5nO1xuICAgIH0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbGxpbmcuanMubWFwIl19
},{"debug":54,"events":3}],28:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../utils/url', './buffered-sender', './polling'], factory);
    }
})(function (require, exports) {
    "use strict";
    var urlUtils = require('../../utils/url');
    var BufferedSender = require('./buffered-sender');
    var Polling = require('./polling');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:sender-receiver');
    }
    return (function (_super) {
        __extends(SenderReceiver, _super);
        function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
            var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
            debug(pollUrl);
            _super.call(this, transUrl, senderFunc);
            var self = this;
            this.poll = new Polling(Receiver, pollUrl, AjaxObject);
            this.poll.on('message', function (msg) {
                debug('poll message', msg);
                self.emit('message', msg);
            });
            this.poll.once('close', function (code, reason) {
                debug('poll close', code, reason);
                self.poll = null;
                self.emit('close', code, reason);
                self.close();
            });
        }
        SenderReceiver.prototype.close = function () {
            debug('close');
            this.removeAllListeners();
            if (this.poll) {
                this.poll.abort();
                this.poll = null;
            }
            this.stop();
        };
        ;
        return SenderReceiver;
    }(BufferedSender));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvbGliL3NlbmRlci1yZWNlaXZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vLi4vdXRpbHMvdXJsJywgJy4vYnVmZmVyZWQtc2VuZGVyJywgJy4vcG9sbGluZyddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB1cmxVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VybCcpO1xuICAgIHZhciBCdWZmZXJlZFNlbmRlciA9IHJlcXVpcmUoJy4vYnVmZmVyZWQtc2VuZGVyJyk7XG4gICAgdmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbiAgICB2YXIgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBfW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6c2VuZGVyLXJlY2VpdmVyJyk7XG4gICAgfVxuICAgIHJldHVybiAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoU2VuZGVyUmVjZWl2ZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFNlbmRlclJlY2VpdmVyKHRyYW5zVXJsLCB1cmxTdWZmaXgsIHNlbmRlckZ1bmMsIFJlY2VpdmVyLCBBamF4T2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcG9sbFVybCA9IHVybFV0aWxzLmFkZFBhdGgodHJhbnNVcmwsIHVybFN1ZmZpeCk7XG4gICAgICAgICAgICBkZWJ1Zyhwb2xsVXJsKTtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRyYW5zVXJsLCBzZW5kZXJGdW5jKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMucG9sbCA9IG5ldyBQb2xsaW5nKFJlY2VpdmVyLCBwb2xsVXJsLCBBamF4T2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMucG9sbC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygncG9sbCBtZXNzYWdlJywgbXNnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBvbGwub25jZSgnY2xvc2UnLCBmdW5jdGlvbiAoY29kZSwgcmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ3BvbGwgY2xvc2UnLCBjb2RlLCByZWFzb24pO1xuICAgICAgICAgICAgICAgIHNlbGYucG9sbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIGNvZGUsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgU2VuZGVyUmVjZWl2ZXIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2Nsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9sbC5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9sbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gU2VuZGVyUmVjZWl2ZXI7XG4gICAgfShCdWZmZXJlZFNlbmRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZW5kZXItcmVjZWl2ZXIuanMubWFwIl19
},{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":54}],29:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    var EventSourceDriver = require('eventsource');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:receiver:eventsource');
    }
    return (function (_super) {
        __extends(EventSourceReceiver, _super);
        function EventSourceReceiver(url) {
            _super.call(this);
            debug(url);
            var self = this;
            var es = this.es = new EventSourceDriver(url);
            es.onmessage = function (e) {
                debug('message', e.data);
                self.emit('message', decodeURI(e.data));
            };
            es.onerror = function (e) {
                debug('error', es.readyState, e);
                // ES on reconnection has readyState = 0 or 1.
                // on network error it's CLOSED = 2
                var reason = (es.readyState !== 2 ? 'network' : 'permanent');
                self._cleanup();
                self._close(reason);
            };
        }
        EventSourceReceiver.prototype.abort = function () {
            debug('abort');
            this._cleanup();
            this._close('user');
        };
        ;
        EventSourceReceiver.prototype._cleanup = function () {
            debug('cleanup');
            var es = this.es;
            if (es) {
                es.onmessage = es.onerror = null;
                es.close();
                this.es = null;
            }
        };
        ;
        EventSourceReceiver.prototype._close = function (reason) {
            debug('close', reason);
            var self = this;
            // Safari and chrome < 15 crash if we close window before
            // waiting for ES cleanup. See:
            // https://code.google.com/p/chromium/issues/detail?id=89155
            setTimeout(function () {
                self.emit('close', null, reason);
                self.removeAllListeners();
            }, 200);
        };
        ;
        return EventSourceReceiver;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvcmVjZWl2ZXIvZXZlbnRzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2V2ZW50cyddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBldmVudHNfMSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuICAgIHZhciBFdmVudFNvdXJjZURyaXZlciA9IHJlcXVpcmUoJ2V2ZW50c291cmNlJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnJlY2VpdmVyOmV2ZW50c291cmNlJyk7XG4gICAgfVxuICAgIHJldHVybiAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRXZlbnRTb3VyY2VSZWNlaXZlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRTb3VyY2VSZWNlaXZlcih1cmwpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgZGVidWcodXJsKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBlcyA9IHRoaXMuZXMgPSBuZXcgRXZlbnRTb3VyY2VEcml2ZXIodXJsKTtcbiAgICAgICAgICAgIGVzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnbWVzc2FnZScsIGRlY29kZVVSSShlLmRhdGEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlcy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnZXJyb3InLCBlcy5yZWFkeVN0YXRlLCBlKTtcbiAgICAgICAgICAgICAgICAvLyBFUyBvbiByZWNvbm5lY3Rpb24gaGFzIHJlYWR5U3RhdGUgPSAwIG9yIDEuXG4gICAgICAgICAgICAgICAgLy8gb24gbmV0d29yayBlcnJvciBpdCdzIENMT1NFRCA9IDJcbiAgICAgICAgICAgICAgICB2YXIgcmVhc29uID0gKGVzLnJlYWR5U3RhdGUgIT09IDIgPyAnbmV0d29yaycgOiAncGVybWFuZW50Jyk7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2Nsb3NlKHJlYXNvbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50U291cmNlUmVjZWl2ZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2Fib3J0Jyk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLl9jbG9zZSgndXNlcicpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEV2ZW50U291cmNlUmVjZWl2ZXIucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2NsZWFudXAnKTtcbiAgICAgICAgICAgIHZhciBlcyA9IHRoaXMuZXM7XG4gICAgICAgICAgICBpZiAoZXMpIHtcbiAgICAgICAgICAgICAgICBlcy5vbm1lc3NhZ2UgPSBlcy5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICBlcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIEV2ZW50U291cmNlUmVjZWl2ZXIucHJvdG90eXBlLl9jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgIGRlYnVnKCdjbG9zZScsIHJlYXNvbik7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyBTYWZhcmkgYW5kIGNocm9tZSA8IDE1IGNyYXNoIGlmIHdlIGNsb3NlIHdpbmRvdyBiZWZvcmVcbiAgICAgICAgICAgIC8vIHdhaXRpbmcgZm9yIEVTIGNsZWFudXAuIFNlZTpcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04OTE1NVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIG51bGwsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIEV2ZW50U291cmNlUmVjZWl2ZXI7XG4gICAgfShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRzb3VyY2UuanMubWFwIl19
},{"debug":54,"events":3,"eventsource":18}],30:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../utils/iframe', '../../utils/url', 'events', '../../utils/random'], factory);
    }
})(function (require, exports) {
    "use strict";
    var iframeUtils = require('../../utils/iframe');
    var urlUtils = require('../../utils/url');
    var events_1 = require('events');
    var random = require('../../utils/random');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:receiver:htmlfile');
    }
    var HtmlfileReceiver = (function (_super) {
        __extends(HtmlfileReceiver, _super);
        function HtmlfileReceiver(url) {
            _super.call(this);
            debug(url);
            var self = this;
            iframeUtils.polluteGlobalNamespace();
            this.id = 'a' + random.string(6);
            url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
            debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
            var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
                iframeUtils.createHtmlfile : iframeUtils.createIframe;
            global[iframeUtils.WPrefix][this.id] = {
                start: function () {
                    debug('start');
                    self.iframeObj.loaded();
                },
                message: function (data) {
                    debug('message', data);
                    self.emit('message', data);
                },
                stop: function () {
                    debug('stop');
                    self._cleanup();
                    self._close('network');
                }
            };
            this.iframeObj = constructFunc(url, function () {
                debug('callback');
                self._cleanup();
                self._close('permanent');
            });
        }
        HtmlfileReceiver.prototype.abort = function () {
            debug('abort');
            this._cleanup();
            this._close('user');
        };
        ;
        HtmlfileReceiver.prototype._cleanup = function () {
            debug('_cleanup');
            if (this.iframeObj) {
                this.iframeObj.cleanup();
                this.iframeObj = null;
            }
            delete global[iframeUtils.WPrefix][this.id];
        };
        ;
        HtmlfileReceiver.prototype._close = function (reason) {
            debug('_close', reason);
            this.emit('close', null, reason);
            this.removeAllListeners();
        };
        ;
        HtmlfileReceiver.htmlfileEnabled = false;
        HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
        return HtmlfileReceiver;
    }(events_1.EventEmitter));
    // obfuscate to avoid firewalls
    var axo = ['Active'].concat('Object').join('X');
    if (axo in global) {
        try {
            HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
        }
        catch (x) {
        }
    }
    return HtmlfileReceiver;
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvcmVjZWl2ZXIvaHRtbGZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi8uLi91dGlscy9pZnJhbWUnLCAnLi4vLi4vdXRpbHMvdXJsJywgJ2V2ZW50cycsICcuLi8uLi91dGlscy9yYW5kb20nXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgaWZyYW1lVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9pZnJhbWUnKTtcbiAgICB2YXIgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKTtcbiAgICB2YXIgZXZlbnRzXzEgPSByZXF1aXJlKCdldmVudHMnKTtcbiAgICB2YXIgcmFuZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmFuZG9tJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnJlY2VpdmVyOmh0bWxmaWxlJyk7XG4gICAgfVxuICAgIHZhciBIdG1sZmlsZVJlY2VpdmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEh0bWxmaWxlUmVjZWl2ZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEh0bWxmaWxlUmVjZWl2ZXIodXJsKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGRlYnVnKHVybCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBpZnJhbWVVdGlscy5wb2xsdXRlR2xvYmFsTmFtZXNwYWNlKCk7XG4gICAgICAgICAgICB0aGlzLmlkID0gJ2EnICsgcmFuZG9tLnN0cmluZyg2KTtcbiAgICAgICAgICAgIHVybCA9IHVybFV0aWxzLmFkZFF1ZXJ5KHVybCwgJ2M9JyArIGRlY29kZVVSSUNvbXBvbmVudChpZnJhbWVVdGlscy5XUHJlZml4ICsgJy4nICsgdGhpcy5pZCkpO1xuICAgICAgICAgICAgZGVidWcoJ3VzaW5nIGh0bWxmaWxlJywgSHRtbGZpbGVSZWNlaXZlci5odG1sZmlsZUVuYWJsZWQpO1xuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdEZ1bmMgPSBIdG1sZmlsZVJlY2VpdmVyLmh0bWxmaWxlRW5hYmxlZCA/XG4gICAgICAgICAgICAgICAgaWZyYW1lVXRpbHMuY3JlYXRlSHRtbGZpbGUgOiBpZnJhbWVVdGlscy5jcmVhdGVJZnJhbWU7XG4gICAgICAgICAgICBnbG9iYWxbaWZyYW1lVXRpbHMuV1ByZWZpeF1bdGhpcy5pZF0gPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaWZyYW1lT2JqLmxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCdzdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2xvc2UoJ25ldHdvcmsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVPYmogPSBjb25zdHJ1Y3RGdW5jKHVybCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdjYWxsYmFjaycpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jbG9zZSgncGVybWFuZW50Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBIdG1sZmlsZVJlY2VpdmVyLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdhYm9ydCcpO1xuICAgICAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICAgICAgdGhpcy5fY2xvc2UoJ3VzZXInKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBIdG1sZmlsZVJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfY2xlYW51cCcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWZyYW1lT2JqKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWVPYmouY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lT2JqID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBnbG9iYWxbaWZyYW1lVXRpbHMuV1ByZWZpeF1bdGhpcy5pZF07XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgSHRtbGZpbGVSZWNlaXZlci5wcm90b3R5cGUuX2Nsb3NlID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAgICAgZGVidWcoJ19jbG9zZScsIHJlYXNvbik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgcmVhc29uKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgSHRtbGZpbGVSZWNlaXZlci5odG1sZmlsZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgSHRtbGZpbGVSZWNlaXZlci5lbmFibGVkID0gSHRtbGZpbGVSZWNlaXZlci5odG1sZmlsZUVuYWJsZWQgfHwgaWZyYW1lVXRpbHMuaWZyYW1lRW5hYmxlZDtcbiAgICAgICAgcmV0dXJuIEh0bWxmaWxlUmVjZWl2ZXI7XG4gICAgfShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbiAgICAvLyBvYmZ1c2NhdGUgdG8gYXZvaWQgZmlyZXdhbGxzXG4gICAgdmFyIGF4byA9IFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJyk7XG4gICAgaWYgKGF4byBpbiBnbG9iYWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEh0bWxmaWxlUmVjZWl2ZXIuaHRtbGZpbGVFbmFibGVkID0gISFuZXcgZ2xvYmFsW2F4b10oJ2h0bWxmaWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSHRtbGZpbGVSZWNlaXZlcjtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGZpbGUuanMubWFwIl19
},{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":54,"events":3}],31:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../utils/iframe', '../../utils/random', '../../utils/browser', '../../utils/url', 'events'], factory);
    }
})(function (require, exports) {
    "use strict";
    var utils = require('../../utils/iframe');
    var random = require('../../utils/random');
    var browser = require('../../utils/browser');
    var urlUtils = require('../../utils/url');
    var events_1 = require('events');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:receiver:jsonp');
    }
    return (function (_super) {
        __extends(JsonpReceiver, _super);
        function JsonpReceiver(url) {
            _super.call(this);
            debug(url);
            var self = this;
            utils.polluteGlobalNamespace();
            this.id = 'a' + random.string(6);
            var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
            global[utils.WPrefix][this.id] = this._callback.bind(this);
            this._createScript(urlWithId);
            // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
            this.timeoutId = setTimeout(function () {
                debug('timeout');
                self._abort(new Error('JSONP script loaded abnormally (timeout)'));
            }, JsonpReceiver.timeout);
        }
        JsonpReceiver.prototype.abort = function () {
            debug('abort');
            if (global[utils.WPrefix][this.id]) {
                var err = new Error('JSONP user aborted read');
                err.code = 1000;
                this._abort(err);
            }
        };
        ;
        JsonpReceiver.prototype._callback = function (data) {
            debug('_callback', data);
            this._cleanup();
            if (this.aborting) {
                return;
            }
            if (data) {
                debug('message', data);
                this.emit('message', data);
            }
            this.emit('close', null, 'network');
            this.removeAllListeners();
        };
        ;
        JsonpReceiver.prototype._abort = function (err) {
            debug('_abort', err);
            this._cleanup();
            this.aborting = true;
            this.emit('close', err.code, err.message);
            this.removeAllListeners();
        };
        ;
        JsonpReceiver.prototype._cleanup = function () {
            debug('_cleanup');
            clearTimeout(this.timeoutId);
            if (this.script2) {
                this.script2.parentNode.removeChild(this.script2);
                this.script2 = null;
            }
            if (this.script) {
                var script = this.script;
                // Unfortunately, you can't really abort script loading of
                // the script.
                script.parentNode.removeChild(script);
                script.onreadystatechange = script.onerror =
                    script.onload = script.onclick = null;
                this.script = null;
            }
            delete global[utils.WPrefix][this.id];
        };
        ;
        JsonpReceiver.prototype._scriptError = function () {
            debug('_scriptError');
            var self = this;
            if (this.errorTimer) {
                return;
            }
            this.errorTimer = setTimeout(function () {
                if (!self.loadedOkay) {
                    self._abort(new Error('JSONP script loaded abnormally (onerror)'));
                }
            }, JsonpReceiver.scriptErrorTimeout);
        };
        ;
        JsonpReceiver.prototype._createScript = function (url) {
            debug('_createScript', url);
            var self = this;
            var script = this.script = global.document.createElement('script');
            var script2; // Opera synchronous load trick.
            script.id = 'a' + random.string(8);
            script.src = url;
            script.type = 'text/javascript';
            script.charset = 'UTF-8';
            script.onerror = this._scriptError.bind(this);
            script.onload = function () {
                debug('onload');
                self._abort(new Error('JSONP script loaded abnormally (onload)'));
            };
            // IE9 fires 'error' event after onreadystatechange or before, in random order.
            // Use loadedOkay to determine if actually errored
            script.onreadystatechange = function () {
                debug('onreadystatechange', script.readyState);
                if (/loaded|closed/.test(script.readyState)) {
                    if (script && script.htmlFor && script.onclick) {
                        self.loadedOkay = true;
                        try {
                            // In IE, actually execute the script.
                            script.onclick();
                        }
                        catch (x) {
                        }
                    }
                    if (script) {
                        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
                    }
                }
            };
            // IE: event/htmlFor/onclick trick.
            // One can't rely on proper order for onreadystatechange. In order to
            // make sure, set a 'htmlFor' and 'event' properties, so that
            // script code will be installed as 'onclick' handler for the
            // script object. Later, onreadystatechange, manually execute this
            // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
            // set. For reference see:
            //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
            // Also, read on that about script ordering:
            //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            if (typeof script.async === 'undefined' && global.document.attachEvent) {
                // According to mozilla docs, in recent browsers script.async defaults
                // to 'true', so we may use it to detect a good browser:
                // https://developer.mozilla.org/en/HTML/Element/script
                if (!browser.isOpera()) {
                    // Naively assume we're in IE
                    try {
                        script.htmlFor = script.id;
                        script.event = 'onclick';
                    }
                    catch (x) {
                    }
                    script.async = true;
                }
                else {
                    // Opera, second sync script hack
                    script2 = this.script2 = global.document.createElement('script');
                    script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
                    script.async = script2.async = false;
                }
            }
            if (typeof script.async !== 'undefined') {
                script.async = true;
            }
            var head = global.document.getElementsByTagName('head')[0];
            head.insertBefore(script, head.firstChild);
            if (script2) {
                head.insertBefore(script2, head.firstChild);
            }
        };
        ;
        JsonpReceiver.timeout = 35000;
        JsonpReceiver.scriptErrorTimeout = 1000;
        return JsonpReceiver;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvcmVjZWl2ZXIvanNvbnAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uLy4uL3V0aWxzL2lmcmFtZScsICcuLi8uLi91dGlscy9yYW5kb20nLCAnLi4vLi4vdXRpbHMvYnJvd3NlcicsICcuLi8uLi91dGlscy91cmwnLCAnZXZlbnRzJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaWZyYW1lJyk7XG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3JhbmRvbScpO1xuICAgIHZhciBicm93c2VyID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYnJvd3NlcicpO1xuICAgIHZhciB1cmxVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3VybCcpO1xuICAgIHZhciBldmVudHNfMSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuICAgIHZhciBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIF9bX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpyZWNlaXZlcjpqc29ucCcpO1xuICAgIH1cbiAgICByZXR1cm4gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEpzb25wUmVjZWl2ZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEpzb25wUmVjZWl2ZXIodXJsKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGRlYnVnKHVybCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB1dGlscy5wb2xsdXRlR2xvYmFsTmFtZXNwYWNlKCk7XG4gICAgICAgICAgICB0aGlzLmlkID0gJ2EnICsgcmFuZG9tLnN0cmluZyg2KTtcbiAgICAgICAgICAgIHZhciB1cmxXaXRoSWQgPSB1cmxVdGlscy5hZGRRdWVyeSh1cmwsICdjPScgKyBlbmNvZGVVUklDb21wb25lbnQodXRpbHMuV1ByZWZpeCArICcuJyArIHRoaXMuaWQpKTtcbiAgICAgICAgICAgIGdsb2JhbFt1dGlscy5XUHJlZml4XVt0aGlzLmlkXSA9IHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVTY3JpcHQodXJsV2l0aElkKTtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrIG1vc3RseSBmb3IgS29ucXVlcm9yIC0gc3R1cGlkIHRpbWVyLCAzNSBzZWNvbmRzIHNoYWxsIGJlIHBsZW50eS5cbiAgICAgICAgICAgIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ3RpbWVvdXQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9hYm9ydChuZXcgRXJyb3IoJ0pTT05QIHNjcmlwdCBsb2FkZWQgYWJub3JtYWxseSAodGltZW91dCknKSk7XG4gICAgICAgICAgICB9LCBKc29ucFJlY2VpdmVyLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIEpzb25wUmVjZWl2ZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2Fib3J0Jyk7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsW3V0aWxzLldQcmVmaXhdW3RoaXMuaWRdKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignSlNPTlAgdXNlciBhYm9ydGVkIHJlYWQnKTtcbiAgICAgICAgICAgICAgICBlcnIuY29kZSA9IDEwMDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWJvcnQoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBKc29ucFJlY2VpdmVyLnByb3RvdHlwZS5fY2FsbGJhY2sgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgZGVidWcoJ19jYWxsYmFjaycsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWJvcnRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdtZXNzYWdlJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgJ25ldHdvcmsnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX2Fib3J0ID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZGVidWcoJ19hYm9ydCcsIGVycik7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLmFib3J0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCBlcnIuY29kZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBKc29ucFJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfY2xlYW51cCcpO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcmlwdDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmlwdDIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0MiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0ID0gdGhpcy5zY3JpcHQ7XG4gICAgICAgICAgICAgICAgLy8gVW5mb3J0dW5hdGVseSwgeW91IGNhbid0IHJlYWxseSBhYm9ydCBzY3JpcHQgbG9hZGluZyBvZlxuICAgICAgICAgICAgICAgIC8vIHRoZSBzY3JpcHQuXG4gICAgICAgICAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gc2NyaXB0Lm9uZXJyb3IgPVxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9uY2xpY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBnbG9iYWxbdXRpbHMuV1ByZWZpeF1bdGhpcy5pZF07XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX3NjcmlwdEVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ19zY3JpcHRFcnJvcicpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JUaW1lcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXJyb3JUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5sb2FkZWRPa2F5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2Fib3J0KG5ldyBFcnJvcignSlNPTlAgc2NyaXB0IGxvYWRlZCBhYm5vcm1hbGx5IChvbmVycm9yKScpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBKc29ucFJlY2VpdmVyLnNjcmlwdEVycm9yVGltZW91dCk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX2NyZWF0ZVNjcmlwdCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfY3JlYXRlU2NyaXB0JywgdXJsKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSB0aGlzLnNjcmlwdCA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHZhciBzY3JpcHQyOyAvLyBPcGVyYSBzeW5jaHJvbm91cyBsb2FkIHRyaWNrLlxuICAgICAgICAgICAgc2NyaXB0LmlkID0gJ2EnICsgcmFuZG9tLnN0cmluZyg4KTtcbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgc2NyaXB0LmNoYXJzZXQgPSAnVVRGLTgnO1xuICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSB0aGlzLl9zY3JpcHRFcnJvci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Zygnb25sb2FkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5fYWJvcnQobmV3IEVycm9yKCdKU09OUCBzY3JpcHQgbG9hZGVkIGFibm9ybWFsbHkgKG9ubG9hZCknKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gSUU5IGZpcmVzICdlcnJvcicgZXZlbnQgYWZ0ZXIgb25yZWFkeXN0YXRlY2hhbmdlIG9yIGJlZm9yZSwgaW4gcmFuZG9tIG9yZGVyLlxuICAgICAgICAgICAgLy8gVXNlIGxvYWRlZE9rYXkgdG8gZGV0ZXJtaW5lIGlmIGFjdHVhbGx5IGVycm9yZWRcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIHNjcmlwdC5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoL2xvYWRlZHxjbG9zZWQvLnRlc3Qoc2NyaXB0LnJlYWR5U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JpcHQgJiYgc2NyaXB0Lmh0bWxGb3IgJiYgc2NyaXB0Lm9uY2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZGVkT2theSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIElFLCBhY3R1YWxseSBleGVjdXRlIHRoZSBzY3JpcHQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fYWJvcnQobmV3IEVycm9yKCdKU09OUCBzY3JpcHQgbG9hZGVkIGFibm9ybWFsbHkgKG9ucmVhZHlzdGF0ZWNoYW5nZSknKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gSUU6IGV2ZW50L2h0bWxGb3Ivb25jbGljayB0cmljay5cbiAgICAgICAgICAgIC8vIE9uZSBjYW4ndCByZWx5IG9uIHByb3BlciBvcmRlciBmb3Igb25yZWFkeXN0YXRlY2hhbmdlLiBJbiBvcmRlciB0b1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlLCBzZXQgYSAnaHRtbEZvcicgYW5kICdldmVudCcgcHJvcGVydGllcywgc28gdGhhdFxuICAgICAgICAgICAgLy8gc2NyaXB0IGNvZGUgd2lsbCBiZSBpbnN0YWxsZWQgYXMgJ29uY2xpY2snIGhhbmRsZXIgZm9yIHRoZVxuICAgICAgICAgICAgLy8gc2NyaXB0IG9iamVjdC4gTGF0ZXIsIG9ucmVhZHlzdGF0ZWNoYW5nZSwgbWFudWFsbHkgZXhlY3V0ZSB0aGlzXG4gICAgICAgICAgICAvLyBjb2RlLiBGRiBhbmQgQ2hyb21lIGRvZXNuJ3Qgd29yayB3aXRoICdldmVudCcgYW5kICdodG1sRm9yJ1xuICAgICAgICAgICAgLy8gc2V0LiBGb3IgcmVmZXJlbmNlIHNlZTpcbiAgICAgICAgICAgIC8vICAgaHR0cDovL2phdWJvdXJnLm5ldC8yMDEwLzA3L2xvYWRpbmctc2NyaXB0LWFzLW9uY2xpY2staGFuZGxlci1vZi5odG1sXG4gICAgICAgICAgICAvLyBBbHNvLCByZWFkIG9uIHRoYXQgYWJvdXQgc2NyaXB0IG9yZGVyaW5nOlxuICAgICAgICAgICAgLy8gICBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvRHluYW1pY19TY3JpcHRfRXhlY3V0aW9uX09yZGVyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjcmlwdC5hc3luYyA9PT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gQWNjb3JkaW5nIHRvIG1vemlsbGEgZG9jcywgaW4gcmVjZW50IGJyb3dzZXJzIHNjcmlwdC5hc3luYyBkZWZhdWx0c1xuICAgICAgICAgICAgICAgIC8vIHRvICd0cnVlJywgc28gd2UgbWF5IHVzZSBpdCB0byBkZXRlY3QgYSBnb29kIGJyb3dzZXI6XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSFRNTC9FbGVtZW50L3NjcmlwdFxuICAgICAgICAgICAgICAgIGlmICghYnJvd3Nlci5pc09wZXJhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFpdmVseSBhc3N1bWUgd2UncmUgaW4gSUVcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5odG1sRm9yID0gc2NyaXB0LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmV2ZW50ID0gJ29uY2xpY2snO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhLCBzZWNvbmQgc3luYyBzY3JpcHQgaGFja1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQyID0gdGhpcy5zY3JpcHQyID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQyLnRleHQgPSBcInRyeXt2YXIgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdcIiArIHNjcmlwdC5pZCArIFwiJyk7IGlmKGEpYS5vbmVycm9yKCk7fWNhdGNoKHgpe307XCI7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5hc3luYyA9IHNjcmlwdDIuYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjcmlwdC5hc3luYyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhlYWQgPSBnbG9iYWwuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaGVhZC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIGlmIChzY3JpcHQyKSB7XG4gICAgICAgICAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc2NyaXB0MiwgaGVhZC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBKc29ucFJlY2VpdmVyLnRpbWVvdXQgPSAzNTAwMDtcbiAgICAgICAgSnNvbnBSZWNlaXZlci5zY3JpcHRFcnJvclRpbWVvdXQgPSAxMDAwO1xuICAgICAgICByZXR1cm4gSnNvbnBSZWNlaXZlcjtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc29ucC5qcy5tYXAiXX0=
},{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":54,"events":3}],32:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:receiver:xhr');
    }
    return (function (_super) {
        __extends(XhrReceiver, _super);
        function XhrReceiver(url, AjaxObject) {
            _super.call(this);
            debug(url);
            var self = this;
            this.bufferPosition = 0;
            this.xo = new AjaxObject('POST', url, null);
            this.xo.on('chunk', this._chunkHandler.bind(this));
            this.xo.once('finish', function (status, text) {
                debug('finish', status, text);
                self._chunkHandler(status, text);
                self.xo = null;
                var reason = status === 200 ? 'network' : 'permanent';
                debug('close', reason);
                self.emit('close', null, reason);
                self._cleanup();
            });
        }
        XhrReceiver.prototype._chunkHandler = function (status, text) {
            debug('_chunkHandler', status);
            if (status !== 200 || !text) {
                return;
            }
            for (var idx = -1;; this.bufferPosition += idx + 1) {
                var buf = text.slice(this.bufferPosition);
                idx = buf.indexOf('\n');
                if (idx === -1) {
                    break;
                }
                var msg = buf.slice(0, idx);
                if (msg) {
                    debug('message', msg);
                    this.emit('message', msg);
                }
            }
        };
        ;
        XhrReceiver.prototype._cleanup = function () {
            debug('_cleanup');
            this.removeAllListeners();
        };
        ;
        XhrReceiver.prototype.abort = function () {
            debug('abort');
            if (this.xo) {
                this.xo.close();
                debug('close');
                this.emit('close', null, 'user');
                this.xo = null;
            }
            this._cleanup();
        };
        ;
        return XhrReceiver;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvcmVjZWl2ZXIveGhyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnZXZlbnRzJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGV2ZW50c18xID0gcmVxdWlyZSgnZXZlbnRzJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnJlY2VpdmVyOnhocicpO1xuICAgIH1cbiAgICByZXR1cm4gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFhoclJlY2VpdmVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBYaHJSZWNlaXZlcih1cmwsIEFqYXhPYmplY3QpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgZGVidWcodXJsKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgdGhpcy54byA9IG5ldyBBamF4T2JqZWN0KCdQT1NUJywgdXJsLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMueG8ub24oJ2NodW5rJywgdGhpcy5fY2h1bmtIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy54by5vbmNlKCdmaW5pc2gnLCBmdW5jdGlvbiAoc3RhdHVzLCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2ZpbmlzaCcsIHN0YXR1cywgdGV4dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2h1bmtIYW5kbGVyKHN0YXR1cywgdGV4dCk7XG4gICAgICAgICAgICAgICAgc2VsZi54byA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHJlYXNvbiA9IHN0YXR1cyA9PT0gMjAwID8gJ25ldHdvcmsnIDogJ3Blcm1hbmVudCc7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2Nsb3NlJywgcmVhc29uKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2Nsb3NlJywgbnVsbCwgcmVhc29uKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jbGVhbnVwKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBYaHJSZWNlaXZlci5wcm90b3R5cGUuX2NodW5rSGFuZGxlciA9IGZ1bmN0aW9uIChzdGF0dXMsIHRleHQpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfY2h1bmtIYW5kbGVyJywgc3RhdHVzKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IDIwMCB8fCAhdGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IC0xOzsgdGhpcy5idWZmZXJQb3NpdGlvbiArPSBpZHggKyAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZiA9IHRleHQuc2xpY2UodGhpcy5idWZmZXJQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWR4ID0gYnVmLmluZGV4T2YoJ1xcbicpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gYnVmLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICAgICAgaWYgKG1zZykge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnbWVzc2FnZScsIG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIG1zZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIFhoclJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdfY2xlYW51cCcpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBYaHJSZWNlaXZlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1ZygnYWJvcnQnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnhvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54by5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGRlYnVnKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCBudWxsLCAndXNlcicpO1xuICAgICAgICAgICAgICAgIHRoaXMueG8gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIHJldHVybiBYaHJSZWNlaXZlcjtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD14aHIuanMubWFwIl19
},{"debug":54,"events":3}],33:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../utils/random', '../../utils/url'], factory);
    }
})(function (require, exports) {
    "use strict";
    var random = require('../../utils/random');
    var urlUtils = require('../../utils/url');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:sender:jsonp');
    }
    var form, area;
    function createIframe(id) {
        debug('createIframe', id);
        try {
            // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
            return global.document.createElement('<iframe name="' + id + '">');
        }
        catch (x) {
            var iframe = global.document.createElement('iframe');
            iframe.name = id;
            return iframe;
        }
    }
    function createForm() {
        debug('createForm');
        form = global.document.createElement('form');
        form.style.display = 'none';
        form.style.position = 'absolute';
        form.method = 'POST';
        form.enctype = 'application/x-www-form-urlencoded';
        form.acceptCharset = 'UTF-8';
        area = global.document.createElement('textarea');
        area.name = 'd';
        form.appendChild(area);
        global.document.body.appendChild(form);
    }
    return function (url, payload, callback) {
        debug(url, payload);
        if (!form) {
            createForm();
        }
        var id = 'a' + random.string(8);
        form.target = id;
        form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
        var iframe = createIframe(id);
        iframe.id = id;
        iframe.style.display = 'none';
        form.appendChild(iframe);
        try {
            area.value = payload;
        }
        catch (e) {
        }
        form.submit();
        var completed = function (err) {
            debug('completed', id, err);
            if (!iframe.onerror) {
                return;
            }
            iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
            // Opera mini doesn't like if we GC iframe
            // immediately, thus this timeout.
            setTimeout(function () {
                debug('cleaning up', id);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }, 500);
            area.value = '';
            // It is not possible to detect if the iframe succeeded or
            // failed to submit our form.
            callback(err);
        };
        iframe.onerror = function () {
            debug('onerror', id);
            completed();
        };
        iframe.onload = function () {
            debug('onload', id);
            completed();
        };
        iframe.onreadystatechange = function (e) {
            debug('onreadystatechange', id, iframe.readyState, e);
            if (iframe.readyState === 'complete') {
                completed();
            }
        };
        return function () {
            debug('aborted', id);
            completed(new Error('Aborted'));
        };
    };
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvc2VuZGVyL2pzb25wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uLy4uL3V0aWxzL3JhbmRvbScsICcuLi8uLi91dGlscy91cmwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgcmFuZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmFuZG9tJyk7XG4gICAgdmFyIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXJsJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnNlbmRlcjpqc29ucCcpO1xuICAgIH1cbiAgICB2YXIgZm9ybSwgYXJlYTtcbiAgICBmdW5jdGlvbiBjcmVhdGVJZnJhbWUoaWQpIHtcbiAgICAgICAgZGVidWcoJ2NyZWF0ZUlmcmFtZScsIGlkKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInICsgaWQgKyAnXCI+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgIHZhciBpZnJhbWUgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZnJhbWUubmFtZSA9IGlkO1xuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xuICAgICAgICBkZWJ1ZygnY3JlYXRlRm9ybScpO1xuICAgICAgICBmb3JtID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgICAgIGZvcm0uZW5jdHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgICAgICBmb3JtLmFjY2VwdENoYXJzZXQgPSAnVVRGLTgnO1xuICAgICAgICBhcmVhID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgIGFyZWEubmFtZSA9ICdkJztcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICAgICAgZ2xvYmFsLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAodXJsLCBwYXlsb2FkLCBjYWxsYmFjaykge1xuICAgICAgICBkZWJ1Zyh1cmwsIHBheWxvYWQpO1xuICAgICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgICAgIGNyZWF0ZUZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWQgPSAnYScgKyByYW5kb20uc3RyaW5nKDgpO1xuICAgICAgICBmb3JtLnRhcmdldCA9IGlkO1xuICAgICAgICBmb3JtLmFjdGlvbiA9IHVybFV0aWxzLmFkZFF1ZXJ5KHVybFV0aWxzLmFkZFBhdGgodXJsLCAnL2pzb25wX3NlbmQnKSwgJ2k9JyArIGlkKTtcbiAgICAgICAgdmFyIGlmcmFtZSA9IGNyZWF0ZUlmcmFtZShpZCk7XG4gICAgICAgIGlmcmFtZS5pZCA9IGlkO1xuICAgICAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXJlYS52YWx1ZSA9IHBheWxvYWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgICB2YXIgY29tcGxldGVkID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZGVidWcoJ2NvbXBsZXRlZCcsIGlkLCBlcnIpO1xuICAgICAgICAgICAgaWYgKCFpZnJhbWUub25lcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBpZnJhbWUub25lcnJvciA9IGlmcmFtZS5vbmxvYWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gT3BlcmEgbWluaSBkb2Vzbid0IGxpa2UgaWYgd2UgR0MgaWZyYW1lXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSwgdGh1cyB0aGlzIHRpbWVvdXQuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnY2xlYW5pbmcgdXAnLCBpZCk7XG4gICAgICAgICAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgICAgICAgICBpZnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIGFyZWEudmFsdWUgPSAnJztcbiAgICAgICAgICAgIC8vIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBkZXRlY3QgaWYgdGhlIGlmcmFtZSBzdWNjZWVkZWQgb3JcbiAgICAgICAgICAgIC8vIGZhaWxlZCB0byBzdWJtaXQgb3VyIGZvcm0uXG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICB9O1xuICAgICAgICBpZnJhbWUub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdvbmVycm9yJywgaWQpO1xuICAgICAgICAgICAgY29tcGxldGVkKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1Zygnb25sb2FkJywgaWQpO1xuICAgICAgICAgICAgY29tcGxldGVkKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZGVidWcoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIGlkLCBpZnJhbWUucmVhZHlTdGF0ZSwgZSk7XG4gICAgICAgICAgICBpZiAoaWZyYW1lLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdhYm9ydGVkJywgaWQpO1xuICAgICAgICAgICAgY29tcGxldGVkKG5ldyBFcnJvcignQWJvcnRlZCcpKTtcbiAgICAgICAgfTtcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc29ucC5qcy5tYXAiXX0=
},{"../../utils/random":50,"../../utils/url":52,"debug":54}],34:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events', '../../utils/event', '../../utils/browser', '../../utils/url'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    var eventUtils = require('../../utils/event');
    var browser = require('../../utils/browser');
    var urlUtils = require('../../utils/url');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:sender:xdr');
    }
    return (function (_super) {
        __extends(XDRObject, _super);
        function XDRObject(method, url, payload) {
            _super.call(this);
            debug(method, url);
            var self = this;
            setTimeout(function () {
                self._start(method, url, payload);
            }, 0);
        }
        XDRObject.prototype._start = function (method, url, payload) {
            debug('_start');
            var self = this;
            var xdr = new global.XDomainRequest();
            // IE caches even POSTs
            url = urlUtils.addQuery(url, 't=' + (+new Date()));
            xdr.onerror = function () {
                debug('onerror');
                self._error();
            };
            xdr.ontimeout = function () {
                debug('ontimeout');
                self._error();
            };
            xdr.onprogress = function () {
                debug('progress', xdr.responseText);
                self.emit('chunk', 200, xdr.responseText);
            };
            xdr.onload = function () {
                debug('load');
                self.emit('finish', 200, xdr.responseText);
                self._cleanup(false);
            };
            this.xdr = xdr;
            this.unloadRef = eventUtils.unloadAdd(function () {
                self._cleanup(true);
            });
            try {
                // Fails with AccessDenied if port number is bogus
                this.xdr.open(method, url);
                if (this.timeout) {
                    this.xdr.timeout = this.timeout;
                }
                this.xdr.send(payload);
            }
            catch (x) {
                this._error();
            }
        };
        ;
        XDRObject.prototype._error = function () {
            this.emit('finish', 0, '');
            this._cleanup(false);
        };
        ;
        XDRObject.prototype._cleanup = function (abort) {
            debug('cleanup', abort);
            if (!this.xdr) {
                return;
            }
            this.removeAllListeners();
            eventUtils.unloadDel(this.unloadRef);
            this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
            if (abort) {
                try {
                    this.xdr.abort();
                }
                catch (x) {
                }
            }
            this.unloadRef = this.xdr = null;
        };
        ;
        XDRObject.prototype.close = function () {
            debug('close');
            this._cleanup(true);
        };
        ;
        // IE 8/9 if the request target uses the same scheme - #79
        XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
        return XDRObject;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvc2VuZGVyL3hkci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICdldmVudHMnLCAnLi4vLi4vdXRpbHMvZXZlbnQnLCAnLi4vLi4vdXRpbHMvYnJvd3NlcicsICcuLi8uLi91dGlscy91cmwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgZXZlbnRzXzEgPSByZXF1aXJlKCdldmVudHMnKTtcbiAgICB2YXIgZXZlbnRVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2V2ZW50Jyk7XG4gICAgdmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuLi8uLi91dGlscy9icm93c2VyJyk7XG4gICAgdmFyIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXJsJyk7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnNlbmRlcjp4ZHInKTtcbiAgICB9XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhYRFJPYmplY3QsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFhEUk9iamVjdChtZXRob2QsIHVybCwgcGF5bG9hZCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBkZWJ1ZyhtZXRob2QsIHVybCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGFydChtZXRob2QsIHVybCwgcGF5bG9hZCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBYRFJPYmplY3QucHJvdG90eXBlLl9zdGFydCA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCwgcGF5bG9hZCkge1xuICAgICAgICAgICAgZGVidWcoJ19zdGFydCcpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHhkciA9IG5ldyBnbG9iYWwuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgICAgIC8vIElFIGNhY2hlcyBldmVuIFBPU1RzXG4gICAgICAgICAgICB1cmwgPSB1cmxVdGlscy5hZGRRdWVyeSh1cmwsICd0PScgKyAoK25ldyBEYXRlKCkpKTtcbiAgICAgICAgICAgIHhkci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdvbmVycm9yJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5fZXJyb3IoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4ZHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdvbnRpbWVvdXQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9lcnJvcigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhkci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdwcm9ncmVzcycsIHhkci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnY2h1bmsnLCAyMDAsIHhkci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhkci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2xvYWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIDIwMCwgeGRyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2xlYW51cChmYWxzZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy54ZHIgPSB4ZHI7XG4gICAgICAgICAgICB0aGlzLnVubG9hZFJlZiA9IGV2ZW50VXRpbHMudW5sb2FkQWRkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9jbGVhbnVwKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIEZhaWxzIHdpdGggQWNjZXNzRGVuaWVkIGlmIHBvcnQgbnVtYmVyIGlzIGJvZ3VzXG4gICAgICAgICAgICAgICAgdGhpcy54ZHIub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnhkci50aW1lb3V0ID0gdGhpcy50aW1lb3V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnhkci5zZW5kKHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIFhEUk9iamVjdC5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdmaW5pc2gnLCAwLCAnJyk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBYRFJPYmplY3QucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24gKGFib3J0KSB7XG4gICAgICAgICAgICBkZWJ1ZygnY2xlYW51cCcsIGFib3J0KTtcbiAgICAgICAgICAgIGlmICghdGhpcy54ZHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgZXZlbnRVdGlscy51bmxvYWREZWwodGhpcy51bmxvYWRSZWYpO1xuICAgICAgICAgICAgdGhpcy54ZHIub250aW1lb3V0ID0gdGhpcy54ZHIub25lcnJvciA9IHRoaXMueGRyLm9ucHJvZ3Jlc3MgPSB0aGlzLnhkci5vbmxvYWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGFib3J0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ZHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVubG9hZFJlZiA9IHRoaXMueGRyID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBYRFJPYmplY3QucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2Nsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIC8vIElFIDgvOSBpZiB0aGUgcmVxdWVzdCB0YXJnZXQgdXNlcyB0aGUgc2FtZSBzY2hlbWUgLSAjNzlcbiAgICAgICAgWERST2JqZWN0LmVuYWJsZWQgPSAhIShnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgYnJvd3Nlci5oYXNEb21haW4oKSk7XG4gICAgICAgIHJldHVybiBYRFJPYmplY3Q7XG4gICAgfShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9eGRyLmpzLm1hcCJdfQ==
},{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":54,"events":3}],35:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../driver/xhr'], factory);
    }
})(function (require, exports) {
    "use strict";
    var XhrDriver = require('../driver/xhr');
    return (function (_super) {
        __extends(XHRCorsObject, _super);
        function XHRCorsObject(method, url, payload, opts) {
            _super.call(this, method, url, payload, opts);
        }
        XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
        return XHRCorsObject;
    }(XhrDriver));
});
//# sourceMappingURL=xhr-cors.js.map
},{"../driver/xhr":17}],36:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'events'], factory);
    }
})(function (require, exports) {
    "use strict";
    var events_1 = require('events');
    return (function (_super) {
        __extends(XHRFake, _super);
        function XHRFake() {
            _super.call(this);
            var self = this;
            this.to = setTimeout(function () {
                self.emit('finish', 200, '{}');
            }, XHRFake.timeout);
        }
        XHRFake.prototype.close = function () {
            clearTimeout(this.to);
        };
        XHRFake.timeout = 2000;
        return XHRFake;
    }(events_1.EventEmitter));
});
//# sourceMappingURL=xhr-fake.js.map
},{"events":3}],37:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../driver/xhr'], factory);
    }
})(function (require, exports) {
    "use strict";
    var XhrDriver = require('../driver/xhr');
    return (function (_super) {
        __extends(XHRLocalObject, _super);
        function XHRLocalObject(method, url, payload /*, opts */) {
            _super.call(this, method, url, payload, {
                noCredentials: true
            });
        }
        XHRLocalObject.enabled = XhrDriver.enabled;
        return XHRLocalObject;
    }(XhrDriver));
});
//# sourceMappingURL=xhr-local.js.map
},{"../driver/xhr":17}],38:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../utils/event', '../utils/url', 'events', './driver/websocket'], factory);
    }
})(function (require, exports) {
    "use strict";
    var utils = require('../utils/event');
    var urlUtils = require('../utils/url');
    var events_1 = require('events');
    var WebsocketDriver = require('./driver/websocket');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:websocket');
    }
    return (function (_super) {
        __extends(WebSocketTransport, _super);
        function WebSocketTransport(transUrl, ignore, options) {
            _super.call(this);
            if (!WebSocketTransport.enabled()) {
                throw new Error('Transport created when disabled');
            }
            debug('constructor', transUrl);
            var self = this;
            var url = urlUtils.addPath(transUrl, '/websocket');
            if (url.slice(0, 5) === 'https') {
                url = 'wss' + url.slice(5);
            }
            else {
                url = 'ws' + url.slice(4);
            }
            this.url = url;
            this.ws = new WebsocketDriver(this.url, [], options);
            this.ws.onmessage = function (e) {
                debug('message event', e.data);
                self.emit('message', e.data);
            };
            // Firefox has an interesting bug. If a websocket connection is
            // created after onunload, it stays alive even when user
            // navigates away from the page. In such situation let's lie -
            // let's not open the ws connection at all. See:
            // https://github.com/sockjs/sockjs-client/issues/28
            // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
            this.unloadRef = utils.unloadAdd(function () {
                debug('unload');
                self.ws.close();
            });
            this.ws.onclose = function (e) {
                debug('close event', e.code, e.reason);
                self.emit('close', e.code, e.reason);
                self._cleanup();
            };
            this.ws.onerror = function (e) {
                debug('error event', e);
                self.emit('close', 1006, 'WebSocket connection broken');
                self._cleanup();
            };
        }
        WebSocketTransport.prototype.send = function (data) {
            var msg = '[' + data + ']';
            debug('send', msg);
            this.ws.send(msg);
        };
        ;
        WebSocketTransport.prototype.close = function () {
            debug('close');
            if (this.ws) {
                this.ws.close();
            }
            this._cleanup();
        };
        ;
        WebSocketTransport.prototype._cleanup = function () {
            debug('_cleanup');
            var ws = this.ws;
            if (ws) {
                ws.onmessage = ws.onclose = ws.onerror = null;
            }
            utils.unloadDel(this.unloadRef);
            this.unloadRef = this.ws = null;
            this.removeAllListeners();
        };
        ;
        WebSocketTransport.enabled = function () {
            debug('enabled');
            return !!WebsocketDriver;
        };
        ;
        WebSocketTransport.transportName = 'websocket';
        // In theory, ws should require 1 round trip. But in chrome, this is
        // not very stable over SSL. Most likely a ws connection requires a
        // separate SSL connection, in which case 2 round trips are an
        // absolute minumum.
        WebSocketTransport.roundTrips = 2;
        return WebSocketTransport;
    }(events_1.EventEmitter));
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQvd2Vic29ja2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi91dGlscy9ldmVudCcsICcuLi91dGlscy91cmwnLCAnZXZlbnRzJywgJy4vZHJpdmVyL3dlYnNvY2tldCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL2V2ZW50Jyk7XG4gICAgdmFyIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvdXJsJyk7XG4gICAgdmFyIGV2ZW50c18xID0gcmVxdWlyZSgnZXZlbnRzJyk7XG4gICAgdmFyIFdlYnNvY2tldERyaXZlciA9IHJlcXVpcmUoJy4vZHJpdmVyL3dlYnNvY2tldCcpO1xuICAgIHZhciBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIF9bX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp3ZWJzb2NrZXQnKTtcbiAgICB9XG4gICAgcmV0dXJuIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhXZWJTb2NrZXRUcmFuc3BvcnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFdlYlNvY2tldFRyYW5zcG9ydCh0cmFuc1VybCwgaWdub3JlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGlmICghV2ViU29ja2V0VHJhbnNwb3J0LmVuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVidWcoJ2NvbnN0cnVjdG9yJywgdHJhbnNVcmwpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHVybCA9IHVybFV0aWxzLmFkZFBhdGgodHJhbnNVcmwsICcvd2Vic29ja2V0Jyk7XG4gICAgICAgICAgICBpZiAodXJsLnNsaWNlKDAsIDUpID09PSAnaHR0cHMnKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gJ3dzcycgKyB1cmwuc2xpY2UoNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgPSAnd3MnICsgdXJsLnNsaWNlKDQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgICAgICB0aGlzLndzID0gbmV3IFdlYnNvY2tldERyaXZlcih0aGlzLnVybCwgW10sIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdtZXNzYWdlIGV2ZW50JywgZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIEZpcmVmb3ggaGFzIGFuIGludGVyZXN0aW5nIGJ1Zy4gSWYgYSB3ZWJzb2NrZXQgY29ubmVjdGlvbiBpc1xuICAgICAgICAgICAgLy8gY3JlYXRlZCBhZnRlciBvbnVubG9hZCwgaXQgc3RheXMgYWxpdmUgZXZlbiB3aGVuIHVzZXJcbiAgICAgICAgICAgIC8vIG5hdmlnYXRlcyBhd2F5IGZyb20gdGhlIHBhZ2UuIEluIHN1Y2ggc2l0dWF0aW9uIGxldCdzIGxpZSAtXG4gICAgICAgICAgICAvLyBsZXQncyBub3Qgb3BlbiB0aGUgd3MgY29ubmVjdGlvbiBhdCBhbGwuIFNlZTpcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NranMvc29ja2pzLWNsaWVudC9pc3N1ZXMvMjhcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NjA4NVxuICAgICAgICAgICAgdGhpcy51bmxvYWRSZWYgPSB1dGlscy51bmxvYWRBZGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCd1bmxvYWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ2Nsb3NlIGV2ZW50JywgZS5jb2RlLCBlLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIGUuY29kZSwgZS5yZWFzb24pO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdlcnJvciBldmVudCcsIGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnY2xvc2UnLCAxMDA2LCAnV2ViU29ja2V0IGNvbm5lY3Rpb24gYnJva2VuJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2xlYW51cCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIG1zZyA9ICdbJyArIGRhdGEgKyAnXSc7XG4gICAgICAgICAgICBkZWJ1Zygnc2VuZCcsIG1zZyk7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQobXNnKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2Nsb3NlJyk7XG4gICAgICAgICAgICBpZiAodGhpcy53cykge1xuICAgICAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ19jbGVhbnVwJyk7XG4gICAgICAgICAgICB2YXIgd3MgPSB0aGlzLndzO1xuICAgICAgICAgICAgaWYgKHdzKSB7XG4gICAgICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gd3Mub25jbG9zZSA9IHdzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbHMudW5sb2FkRGVsKHRoaXMudW5sb2FkUmVmKTtcbiAgICAgICAgICAgIHRoaXMudW5sb2FkUmVmID0gdGhpcy53cyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICB9O1xuICAgICAgICA7XG4gICAgICAgIFdlYlNvY2tldFRyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgIHJldHVybiAhIVdlYnNvY2tldERyaXZlcjtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBXZWJTb2NrZXRUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSA9ICd3ZWJzb2NrZXQnO1xuICAgICAgICAvLyBJbiB0aGVvcnksIHdzIHNob3VsZCByZXF1aXJlIDEgcm91bmQgdHJpcC4gQnV0IGluIGNocm9tZSwgdGhpcyBpc1xuICAgICAgICAvLyBub3QgdmVyeSBzdGFibGUgb3ZlciBTU0wuIE1vc3QgbGlrZWx5IGEgd3MgY29ubmVjdGlvbiByZXF1aXJlcyBhXG4gICAgICAgIC8vIHNlcGFyYXRlIFNTTCBjb25uZWN0aW9uLCBpbiB3aGljaCBjYXNlIDIgcm91bmQgdHJpcHMgYXJlIGFuXG4gICAgICAgIC8vIGFic29sdXRlIG1pbnVtdW0uXG4gICAgICAgIFdlYlNvY2tldFRyYW5zcG9ydC5yb3VuZFRyaXBzID0gMjtcbiAgICAgICAgcmV0dXJuIFdlYlNvY2tldFRyYW5zcG9ydDtcbiAgICB9KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJzb2NrZXQuanMubWFwIl19
},{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":54,"events":3}],39:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lib/ajax-based', './xdr-streaming', './receiver/xhr', './sender/xdr'], factory);
    }
})(function (require, exports) {
    "use strict";
    var AjaxBasedTransport = require('./lib/ajax-based');
    var XdrStreamingTransport = require('./xdr-streaming');
    var XhrReceiver = require('./receiver/xhr');
    var XDRObject = require('./sender/xdr');
    return (function (_super) {
        __extends(XdrPollingTransport, _super);
        function XdrPollingTransport(transUrl) {
            if (!XDRObject.enabled) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
        }
        XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
        XdrPollingTransport.transportName = 'xdr-polling';
        XdrPollingTransport.roundTrips = 2; // preflight, ajax
        return XdrPollingTransport;
    }(AjaxBasedTransport));
});
//# sourceMappingURL=xdr-polling.js.map
},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40}],40:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lib/ajax-based', './receiver/xhr', './sender/xdr'], factory);
    }
})(function (require, exports) {
    "use strict";
    var AjaxBasedTransport = require('./lib/ajax-based');
    var XhrReceiver = require('./receiver/xhr');
    var XDRObject = require('./sender/xdr');
    return (function (_super) {
        __extends(XdrStreamingTransport, _super);
        function XdrStreamingTransport(transUrl) {
            if (!XDRObject.enabled) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
        }
        XdrStreamingTransport.enabled = function (info) {
            if (info.cookie_needed || info.nullOrigin) {
                return false;
            }
            return XDRObject.enabled && info.sameScheme;
        };
        ;
        XdrStreamingTransport.transportName = 'xdr-streaming';
        XdrStreamingTransport.roundTrips = 2; // preflight, ajax
        return XdrStreamingTransport;
    }(AjaxBasedTransport));
});
//# sourceMappingURL=xdr-streaming.js.map
},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34}],41:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lib/ajax-based', './receiver/xhr', './sender/xhr-cors', './sender/xhr-local'], factory);
    }
})(function (require, exports) {
    "use strict";
    var AjaxBasedTransport = require('./lib/ajax-based');
    var XhrReceiver = require('./receiver/xhr');
    var XHRCorsObject = require('./sender/xhr-cors');
    var XHRLocalObject = require('./sender/xhr-local');
    return (function (_super) {
        __extends(XhrPollingTransport, _super);
        function XhrPollingTransport(transUrl) {
            if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
        }
        XhrPollingTransport.enabled = function (info) {
            if (info.nullOrigin) {
                return false;
            }
            if (XHRLocalObject.enabled && info.sameOrigin) {
                return true;
            }
            return XHRCorsObject.enabled;
        };
        ;
        XhrPollingTransport.transportName = 'xhr-polling';
        XhrPollingTransport.roundTrips = 2; // preflight, ajax
        return XhrPollingTransport;
    }(AjaxBasedTransport));
});
//# sourceMappingURL=xhr-polling.js.map
},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37}],42:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lib/ajax-based', './receiver/xhr', './sender/xhr-cors', './sender/xhr-local', '../utils/browser'], factory);
    }
})(function (require, exports) {
    "use strict";
    var AjaxBasedTransport = require('./lib/ajax-based');
    var XhrReceiver = require('./receiver/xhr');
    var XHRCorsObject = require('./sender/xhr-cors');
    var XHRLocalObject = require('./sender/xhr-local');
    var browser = require('../utils/browser');
    return (function (_super) {
        __extends(XhrStreamingTransport, _super);
        function XhrStreamingTransport(transUrl) {
            if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
                throw new Error('Transport created when disabled');
            }
            _super.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
        }
        XhrStreamingTransport.enabled = function (info) {
            if (info.nullOrigin) {
                return false;
            }
            // Opera doesn't support xhr-streaming #60
            // But it might be able to #92
            if (browser.isOpera()) {
                return false;
            }
            return XHRCorsObject.enabled;
        };
        ;
        XhrStreamingTransport.transportName = 'xhr-streaming';
        XhrStreamingTransport.roundTrips = 2; // preflight, ajax
        // Safari gets confused when a streaming ajax request is started
        // before onload. This causes the load indicator to spin indefinetely.
        // Only require body when used in a browser
        XhrStreamingTransport.needBody = !!global.document;
        return XhrStreamingTransport;
    }(AjaxBasedTransport));
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc3BvcnQveGhyLXN0cmVhbWluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vbGliL2FqYXgtYmFzZWQnLCAnLi9yZWNlaXZlci94aHInLCAnLi9zZW5kZXIveGhyLWNvcnMnLCAnLi9zZW5kZXIveGhyLWxvY2FsJywgJy4uL3V0aWxzL2Jyb3dzZXInXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgQWpheEJhc2VkVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi9saWIvYWpheC1iYXNlZCcpO1xuICAgIHZhciBYaHJSZWNlaXZlciA9IHJlcXVpcmUoJy4vcmVjZWl2ZXIveGhyJyk7XG4gICAgdmFyIFhIUkNvcnNPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94aHItY29ycycpO1xuICAgIHZhciBYSFJMb2NhbE9iamVjdCA9IHJlcXVpcmUoJy4vc2VuZGVyL3hoci1sb2NhbCcpO1xuICAgIHZhciBicm93c2VyID0gcmVxdWlyZSgnLi4vdXRpbHMvYnJvd3NlcicpO1xuICAgIHJldHVybiAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoWGhyU3RyZWFtaW5nVHJhbnNwb3J0LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBYaHJTdHJlYW1pbmdUcmFuc3BvcnQodHJhbnNVcmwpIHtcbiAgICAgICAgICAgIGlmICghWEhSTG9jYWxPYmplY3QuZW5hYmxlZCAmJiAhWEhSQ29yc09iamVjdC5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy94aHJfc3RyZWFtaW5nJywgWGhyUmVjZWl2ZXIsIFhIUkNvcnNPYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIFhoclN0cmVhbWluZ1RyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIGlmIChpbmZvLm51bGxPcmlnaW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPcGVyYSBkb2Vzbid0IHN1cHBvcnQgeGhyLXN0cmVhbWluZyAjNjBcbiAgICAgICAgICAgIC8vIEJ1dCBpdCBtaWdodCBiZSBhYmxlIHRvICM5MlxuICAgICAgICAgICAgaWYgKGJyb3dzZXIuaXNPcGVyYSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFhIUkNvcnNPYmplY3QuZW5hYmxlZDtcbiAgICAgICAgfTtcbiAgICAgICAgO1xuICAgICAgICBYaHJTdHJlYW1pbmdUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSA9ICd4aHItc3RyZWFtaW5nJztcbiAgICAgICAgWGhyU3RyZWFtaW5nVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSAyOyAvLyBwcmVmbGlnaHQsIGFqYXhcbiAgICAgICAgLy8gU2FmYXJpIGdldHMgY29uZnVzZWQgd2hlbiBhIHN0cmVhbWluZyBhamF4IHJlcXVlc3QgaXMgc3RhcnRlZFxuICAgICAgICAvLyBiZWZvcmUgb25sb2FkLiBUaGlzIGNhdXNlcyB0aGUgbG9hZCBpbmRpY2F0b3IgdG8gc3BpbiBpbmRlZmluZXRlbHkuXG4gICAgICAgIC8vIE9ubHkgcmVxdWlyZSBib2R5IHdoZW4gdXNlZCBpbiBhIGJyb3dzZXJcbiAgICAgICAgWGhyU3RyZWFtaW5nVHJhbnNwb3J0Lm5lZWRCb2R5ID0gISFnbG9iYWwuZG9jdW1lbnQ7XG4gICAgICAgIHJldHVybiBYaHJTdHJlYW1pbmdUcmFuc3BvcnQ7XG4gICAgfShBamF4QmFzZWRUcmFuc3BvcnQpKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9eGhyLXN0cmVhbWluZy5qcy5tYXAiXX0=
},{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37}],43:[function(require,module,exports){
(function (global){
if (global.crypto && global.crypto.getRandomValues) {
    module.exports.randomBytes = function (length) {
        var bytes = new Uint8Array(length);
        global.crypto.getRandomValues(bytes);
        return bytes;
    };
}
else {
    module.exports.randomBytes = function (length) {
        var bytes = new Array(length);
        for (var i = 0; i < length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
        return bytes;
    };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy9icm93c2VyLWNyeXB0by5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKGdsb2JhbC5jcnlwdG8gJiYgZ2xvYmFsLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICAgICAgZ2xvYmFsLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfTtcbn1cbmVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzLnJhbmRvbUJ5dGVzID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgICAgICB2YXIgYnl0ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYnl0ZXNbaV0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1jcnlwdG8uanMubWFwIl19
},{}],44:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function isOpera() {
        return global.navigator &&
            /opera/i.test(global.navigator.userAgent);
    }
    exports.isOpera = isOpera;
    function isKonqueror() {
        return global.navigator &&
            /konqueror/i.test(global.navigator.userAgent);
    }
    exports.isKonqueror = isKonqueror;
    // #187 wrap document.domain in try/catch because of WP8 from file:///
    function hasDomain() {
        // non-browser client always has a domain
        if (!global.document) {
            return true;
        }
        try {
            return !!global.document.domain;
        }
        catch (e) {
            return false;
        }
    }
    exports.hasDomain = hasDomain;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBpc09wZXJhKCkge1xuICAgICAgICByZXR1cm4gZ2xvYmFsLm5hdmlnYXRvciAmJlxuICAgICAgICAgICAgL29wZXJhL2kudGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgfVxuICAgIGV4cG9ydHMuaXNPcGVyYSA9IGlzT3BlcmE7XG4gICAgZnVuY3Rpb24gaXNLb25xdWVyb3IoKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWwubmF2aWdhdG9yICYmXG4gICAgICAgICAgICAva29ucXVlcm9yL2kudGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgfVxuICAgIGV4cG9ydHMuaXNLb25xdWVyb3IgPSBpc0tvbnF1ZXJvcjtcbiAgICAvLyAjMTg3IHdyYXAgZG9jdW1lbnQuZG9tYWluIGluIHRyeS9jYXRjaCBiZWNhdXNlIG9mIFdQOCBmcm9tIGZpbGU6Ly8vXG4gICAgZnVuY3Rpb24gaGFzRG9tYWluKCkge1xuICAgICAgICAvLyBub24tYnJvd3NlciBjbGllbnQgYWx3YXlzIGhhcyBhIGRvbWFpblxuICAgICAgICBpZiAoIWdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhIWdsb2JhbC5kb2N1bWVudC5kb21haW47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnRzLmhhc0RvbWFpbiA9IGhhc0RvbWFpbjtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci5qcy5tYXAiXX0=
},{}],45:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    var JSON3 = require('json3');
    // Some extra characters that Chrome gets wrong, and substitutes with
    // something else on the wire.
    var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, extraLookup;
    // This may be quite slow, so let's delay until user actually uses bad
    // characters.
    var unrollLookup = function (escapable) {
        var i;
        var unrolled = {};
        var c = [];
        for (i = 0; i < 65536; i++) {
            c.push(String.fromCharCode(i));
        }
        escapable.lastIndex = 0;
        c.join('').replace(escapable, function (a) {
            unrolled[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            return '';
        });
        escapable.lastIndex = 0;
        return unrolled;
    };
    // Quote string, also taking care of unicode characters that browsers
    // often break. Especially, take care of unicode surrogates:
    // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
    function quote(string) {
        var quoted = JSON3.stringify(string);
        // In most cases this should be very fast and good enough.
        extraEscapable.lastIndex = 0;
        if (!extraEscapable.test(quoted)) {
            return quoted;
        }
        if (!extraLookup) {
            extraLookup = unrollLookup(extraEscapable);
        }
        return quoted.replace(extraEscapable, function (a) {
            return extraLookup[a];
        });
    }
    exports.quote = quote;
});
//# sourceMappingURL=escape.js.map
},{"json3":57}],46:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './random'], factory);
    }
})(function (require, exports) {
    'use strict';
    var random = require('./random');
    var onUnload = {}, afterUnload = false, isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;
    function attachEvent(event, listener) {
        if (typeof global.addEventListener !== 'undefined') {
            global.addEventListener(event, listener, false);
        }
        else if (global.document && global.attachEvent) {
            // IE quirks.
            // According to: http://stevesouders.com/misc/test-postmessage.php
            // the message gets delivered only to 'document', not 'window'.
            global.document.attachEvent('on' + event, listener);
            // I get 'window' for ie8.
            global.attachEvent('on' + event, listener);
        }
    }
    exports.attachEvent = attachEvent;
    function detachEvent(event, listener) {
        if (typeof global.addEventListener !== 'undefined') {
            global.removeEventListener(event, listener, false);
        }
        else if (global.document && global.detachEvent) {
            global.document.detachEvent('on' + event, listener);
            global.detachEvent('on' + event, listener);
        }
    }
    exports.detachEvent = detachEvent;
    function unloadAdd(listener) {
        if (isChromePackagedApp) {
            return null;
        }
        var ref = random.string(8);
        onUnload[ref] = listener;
        if (afterUnload) {
            setTimeout(triggerUnloadCallbacks, 0);
        }
        return ref;
    }
    exports.unloadAdd = unloadAdd;
    function unloadDel(ref) {
        if (ref in onUnload) {
            delete onUnload[ref];
        }
    }
    exports.unloadDel = unloadDel;
    function triggerUnloadCallbacks() {
        for (var ref in onUnload) {
            onUnload[ref]();
            delete onUnload[ref];
        }
    }
    exports.triggerUnloadCallbacks = triggerUnloadCallbacks;
    var unloadTriggered = function () {
        if (afterUnload) {
            return;
        }
        afterUnload = true;
        module.exports.triggerUnloadCallbacks();
    };
    // 'unload' alone is not reliable in opera within an iframe, but we
    // can't use `beforeunload` as IE fires it on javascript: links.
    if (!isChromePackagedApp) {
        module.exports.attachEvent('unload', unloadTriggered);
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy9ldmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vcmFuZG9tJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbScpO1xuICAgIHZhciBvblVubG9hZCA9IHt9LCBhZnRlclVubG9hZCA9IGZhbHNlLCBpc0Nocm9tZVBhY2thZ2VkQXBwID0gZ2xvYmFsLmNocm9tZSAmJiBnbG9iYWwuY2hyb21lLmFwcCAmJiBnbG9iYWwuY2hyb21lLmFwcC5ydW50aW1lO1xuICAgIGZ1bmN0aW9uIGF0dGFjaEV2ZW50KGV2ZW50LCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAodHlwZW9mIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2xvYmFsLmRvY3VtZW50ICYmIGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgLy8gSUUgcXVpcmtzLlxuICAgICAgICAgICAgLy8gQWNjb3JkaW5nIHRvOiBodHRwOi8vc3RldmVzb3VkZXJzLmNvbS9taXNjL3Rlc3QtcG9zdG1lc3NhZ2UucGhwXG4gICAgICAgICAgICAvLyB0aGUgbWVzc2FnZSBnZXRzIGRlbGl2ZXJlZCBvbmx5IHRvICdkb2N1bWVudCcsIG5vdCAnd2luZG93Jy5cbiAgICAgICAgICAgIGdsb2JhbC5kb2N1bWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIC8vIEkgZ2V0ICd3aW5kb3cnIGZvciBpZTguXG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0cy5hdHRhY2hFdmVudCA9IGF0dGFjaEV2ZW50O1xuICAgIGZ1bmN0aW9uIGRldGFjaEV2ZW50KGV2ZW50LCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAodHlwZW9mIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ2xvYmFsLmRvY3VtZW50ICYmIGdsb2JhbC5kZXRhY2hFdmVudCkge1xuICAgICAgICAgICAgZ2xvYmFsLmRvY3VtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgZ2xvYmFsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydHMuZGV0YWNoRXZlbnQgPSBkZXRhY2hFdmVudDtcbiAgICBmdW5jdGlvbiB1bmxvYWRBZGQobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGlzQ2hyb21lUGFja2FnZWRBcHApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWYgPSByYW5kb20uc3RyaW5nKDgpO1xuICAgICAgICBvblVubG9hZFtyZWZdID0gbGlzdGVuZXI7XG4gICAgICAgIGlmIChhZnRlclVubG9hZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0cmlnZ2VyVW5sb2FkQ2FsbGJhY2tzLCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVmO1xuICAgIH1cbiAgICBleHBvcnRzLnVubG9hZEFkZCA9IHVubG9hZEFkZDtcbiAgICBmdW5jdGlvbiB1bmxvYWREZWwocmVmKSB7XG4gICAgICAgIGlmIChyZWYgaW4gb25VbmxvYWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvblVubG9hZFtyZWZdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydHMudW5sb2FkRGVsID0gdW5sb2FkRGVsO1xuICAgIGZ1bmN0aW9uIHRyaWdnZXJVbmxvYWRDYWxsYmFja3MoKSB7XG4gICAgICAgIGZvciAodmFyIHJlZiBpbiBvblVubG9hZCkge1xuICAgICAgICAgICAgb25VbmxvYWRbcmVmXSgpO1xuICAgICAgICAgICAgZGVsZXRlIG9uVW5sb2FkW3JlZl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0cy50cmlnZ2VyVW5sb2FkQ2FsbGJhY2tzID0gdHJpZ2dlclVubG9hZENhbGxiYWNrcztcbiAgICB2YXIgdW5sb2FkVHJpZ2dlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYWZ0ZXJVbmxvYWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhZnRlclVubG9hZCA9IHRydWU7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzLnRyaWdnZXJVbmxvYWRDYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIC8vICd1bmxvYWQnIGFsb25lIGlzIG5vdCByZWxpYWJsZSBpbiBvcGVyYSB3aXRoaW4gYW4gaWZyYW1lLCBidXQgd2VcbiAgICAvLyBjYW4ndCB1c2UgYGJlZm9yZXVubG9hZGAgYXMgSUUgZmlyZXMgaXQgb24gamF2YXNjcmlwdDogbGlua3MuXG4gICAgaWYgKCFpc0Nocm9tZVBhY2thZ2VkQXBwKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzLmF0dGFjaEV2ZW50KCd1bmxvYWQnLCB1bmxvYWRUcmlnZ2VyZWQpO1xuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnQuanMubWFwIl19
},{"./random":50}],47:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './event', './browser'], factory);
    }
})(function (require, exports) {
    'use strict';
    var eventUtils = require('./event');
    var JSON3 = require('json3');
    var browser = require('./browser');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:utils:iframe');
    }
    exports.WPrefix = '_jp';
    exports.currentWindowId = null;
    function polluteGlobalNamespace() {
        if (!(module.exports.WPrefix in global)) {
            global[module.exports.WPrefix] = {};
        }
    }
    exports.polluteGlobalNamespace = polluteGlobalNamespace;
    function postMessage(type, data) {
        if (global.parent !== global) {
            global.parent.postMessage(JSON3.stringify({
                windowId: module.exports.currentWindowId,
                type: type,
                data: data || ''
            }), '*');
        }
        else {
            debug('Cannot postMessage, no parent window.', type, data);
        }
    }
    exports.postMessage = postMessage;
    function createIframe(iframeUrl, errorCallback) {
        var iframe = global.document.createElement('iframe');
        var tref, unloadRef;
        var unattach = function () {
            debug('unattach');
            clearTimeout(tref);
            // Explorer had problems with that.
            try {
                iframe.onload = null;
            }
            catch (x) {
            }
            iframe.onerror = null;
        };
        var cleanup = function () {
            debug('cleanup');
            if (iframe) {
                unattach();
                // This timeout makes chrome fire onbeforeunload event
                // within iframe. Without the timeout it goes straight to
                // onunload.
                setTimeout(function () {
                    if (iframe) {
                        iframe.parentNode.removeChild(iframe);
                    }
                    iframe = null;
                }, 0);
                eventUtils.unloadDel(unloadRef);
            }
        };
        var onerror = function (err) {
            debug('onerror', err);
            if (iframe) {
                cleanup();
                errorCallback(err);
            }
        };
        var post = function (msg, origin) {
            debug('post', msg, origin);
            try {
                // When the iframe is not loaded, IE raises an exception
                // on 'contentWindow'.
                setTimeout(function () {
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage(msg, origin);
                    }
                }, 0);
            }
            catch (x) {
            }
        };
        iframe.src = iframeUrl;
        iframe.style.display = 'none';
        iframe.style.position = 'absolute';
        iframe.onerror = function () {
            onerror('onerror');
        };
        iframe.onload = function () {
            debug('onload');
            // `onload` is triggered before scripts on the iframe are
            // executed. Give it few seconds to actually load stuff.
            clearTimeout(tref);
            tref = setTimeout(function () {
                onerror('onload timeout');
            }, 2000);
        };
        global.document.body.appendChild(iframe);
        tref = setTimeout(function () {
            onerror('timeout');
        }, 15000);
        unloadRef = eventUtils.unloadAdd(cleanup);
        return {
            post: post,
            cleanup: cleanup,
            loaded: unattach
        };
    }
    exports.createIframe = createIframe;
    /* jshint undef: false, newcap: false */
    /* eslint no-undef: 0, new-cap: 0 */
    function createHtmlfile(iframeUrl, errorCallback) {
        var axo = ['Active'].concat('Object').join('X');
        var doc = new global[axo]('htmlfile');
        var tref, unloadRef;
        var iframe;
        var unattach = function () {
            clearTimeout(tref);
            iframe.onerror = null;
        };
        var cleanup = function () {
            if (doc) {
                unattach();
                eventUtils.unloadDel(unloadRef);
                iframe.parentNode.removeChild(iframe);
                iframe = doc = null;
                CollectGarbage();
            }
        };
        var onerror = function (r) {
            debug('onerror', r);
            if (doc) {
                cleanup();
                errorCallback(r);
            }
        };
        var post = function (msg, origin) {
            try {
                // When the iframe is not loaded, IE raises an exception
                // on 'contentWindow'.
                setTimeout(function () {
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage(msg, origin);
                    }
                }, 0);
            }
            catch (x) {
            }
        };
        doc.open();
        doc.write("<html><script>document.domain=\"" + global.document.domain + "\";</script></html>");
        doc.close();
        doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
        var c = doc.createElement('div');
        doc.body.appendChild(c);
        iframe = doc.createElement('iframe');
        c.appendChild(iframe);
        iframe.src = iframeUrl;
        iframe.onerror = function () {
            onerror('onerror');
        };
        tref = setTimeout(function () {
            onerror('timeout');
        }, 15000);
        unloadRef = eventUtils.unloadAdd(cleanup);
        return {
            post: post,
            cleanup: cleanup,
            loaded: unattach
        };
    }
    exports.createHtmlfile = createHtmlfile;
    exports.iframeEnabled = false;
    if (global.document) {
        // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
        // huge delay, or not at all.
        module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
            typeof global.postMessage === 'object') && (!browser.isKonqueror());
    }
});

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy9pZnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vZXZlbnQnLCAnLi9icm93c2VyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBldmVudFV0aWxzID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuICAgIHZhciBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJyk7XG4gICAgdmFyIGJyb3dzZXIgPSByZXF1aXJlKCcuL2Jyb3dzZXInKTtcbiAgICB2YXIgZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBfW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6dXRpbHM6aWZyYW1lJyk7XG4gICAgfVxuICAgIGV4cG9ydHMuV1ByZWZpeCA9ICdfanAnO1xuICAgIGV4cG9ydHMuY3VycmVudFdpbmRvd0lkID0gbnVsbDtcbiAgICBmdW5jdGlvbiBwb2xsdXRlR2xvYmFsTmFtZXNwYWNlKCkge1xuICAgICAgICBpZiAoIShtb2R1bGUuZXhwb3J0cy5XUHJlZml4IGluIGdsb2JhbCkpIHtcbiAgICAgICAgICAgIGdsb2JhbFttb2R1bGUuZXhwb3J0cy5XUHJlZml4XSA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydHMucG9sbHV0ZUdsb2JhbE5hbWVzcGFjZSA9IHBvbGx1dGVHbG9iYWxOYW1lc3BhY2U7XG4gICAgZnVuY3Rpb24gcG9zdE1lc3NhZ2UodHlwZSwgZGF0YSkge1xuICAgICAgICBpZiAoZ2xvYmFsLnBhcmVudCAhPT0gZ2xvYmFsKSB7XG4gICAgICAgICAgICBnbG9iYWwucGFyZW50LnBvc3RNZXNzYWdlKEpTT04zLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgd2luZG93SWQ6IG1vZHVsZS5leHBvcnRzLmN1cnJlbnRXaW5kb3dJZCxcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEgfHwgJydcbiAgICAgICAgICAgIH0pLCAnKicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVidWcoJ0Nhbm5vdCBwb3N0TWVzc2FnZSwgbm8gcGFyZW50IHdpbmRvdy4nLCB0eXBlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnRzLnBvc3RNZXNzYWdlID0gcG9zdE1lc3NhZ2U7XG4gICAgZnVuY3Rpb24gY3JlYXRlSWZyYW1lKGlmcmFtZVVybCwgZXJyb3JDYWxsYmFjaykge1xuICAgICAgICB2YXIgaWZyYW1lID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICB2YXIgdHJlZiwgdW5sb2FkUmVmO1xuICAgICAgICB2YXIgdW5hdHRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1ZygndW5hdHRhY2gnKTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0cmVmKTtcbiAgICAgICAgICAgIC8vIEV4cGxvcmVyIGhhZCBwcm9ibGVtcyB3aXRoIHRoYXQuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmcmFtZS5vbmxvYWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmcmFtZS5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1ZygnY2xlYW51cCcpO1xuICAgICAgICAgICAgaWYgKGlmcmFtZSkge1xuICAgICAgICAgICAgICAgIHVuYXR0YWNoKCk7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyB0aW1lb3V0IG1ha2VzIGNocm9tZSBmaXJlIG9uYmVmb3JldW5sb2FkIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gd2l0aGluIGlmcmFtZS4gV2l0aG91dCB0aGUgdGltZW91dCBpdCBnb2VzIHN0cmFpZ2h0IHRvXG4gICAgICAgICAgICAgICAgLy8gb251bmxvYWQuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICBldmVudFV0aWxzLnVubG9hZERlbCh1bmxvYWRSZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgb25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRlYnVnKCdvbmVycm9yJywgZXJyKTtcbiAgICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcG9zdCA9IGZ1bmN0aW9uIChtc2csIG9yaWdpbikge1xuICAgICAgICAgICAgZGVidWcoJ3Bvc3QnLCBtc2csIG9yaWdpbik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyBub3QgbG9hZGVkLCBJRSByYWlzZXMgYW4gZXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgLy8gb24gJ2NvbnRlbnRXaW5kb3cnLlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWZyYW1lICYmIGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtc2csIG9yaWdpbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoICh4KSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVVcmw7XG4gICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZnJhbWUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBpZnJhbWUub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoJ29uZXJyb3InKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdvbmxvYWQnKTtcbiAgICAgICAgICAgIC8vIGBvbmxvYWRgIGlzIHRyaWdnZXJlZCBiZWZvcmUgc2NyaXB0cyBvbiB0aGUgaWZyYW1lIGFyZVxuICAgICAgICAgICAgLy8gZXhlY3V0ZWQuIEdpdmUgaXQgZmV3IHNlY29uZHMgdG8gYWN0dWFsbHkgbG9hZCBzdHVmZi5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0cmVmKTtcbiAgICAgICAgICAgIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvbmVycm9yKCdvbmxvYWQgdGltZW91dCcpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH07XG4gICAgICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoJ3RpbWVvdXQnKTtcbiAgICAgICAgfSwgMTUwMDApO1xuICAgICAgICB1bmxvYWRSZWYgPSBldmVudFV0aWxzLnVubG9hZEFkZChjbGVhbnVwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHBvc3QsXG4gICAgICAgICAgICBjbGVhbnVwOiBjbGVhbnVwLFxuICAgICAgICAgICAgbG9hZGVkOiB1bmF0dGFjaFxuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzLmNyZWF0ZUlmcmFtZSA9IGNyZWF0ZUlmcmFtZTtcbiAgICAvKiBqc2hpbnQgdW5kZWY6IGZhbHNlLCBuZXdjYXA6IGZhbHNlICovXG4gICAgLyogZXNsaW50IG5vLXVuZGVmOiAwLCBuZXctY2FwOiAwICovXG4gICAgZnVuY3Rpb24gY3JlYXRlSHRtbGZpbGUoaWZyYW1lVXJsLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBheG8gPSBbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpO1xuICAgICAgICB2YXIgZG9jID0gbmV3IGdsb2JhbFtheG9dKCdodG1sZmlsZScpO1xuICAgICAgICB2YXIgdHJlZiwgdW5sb2FkUmVmO1xuICAgICAgICB2YXIgaWZyYW1lO1xuICAgICAgICB2YXIgdW5hdHRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodHJlZik7XG4gICAgICAgICAgICBpZnJhbWUub25lcnJvciA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGRvYykge1xuICAgICAgICAgICAgICAgIHVuYXR0YWNoKCk7XG4gICAgICAgICAgICAgICAgZXZlbnRVdGlscy51bmxvYWREZWwodW5sb2FkUmVmKTtcbiAgICAgICAgICAgICAgICBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICAgICAgICAgIGlmcmFtZSA9IGRvYyA9IG51bGw7XG4gICAgICAgICAgICAgICAgQ29sbGVjdEdhcmJhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9uZXJyb3IgPSBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgZGVidWcoJ29uZXJyb3InLCByKTtcbiAgICAgICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBvc3QgPSBmdW5jdGlvbiAobXNnLCBvcmlnaW4pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIG5vdCBsb2FkZWQsIElFIHJhaXNlcyBhbiBleGNlcHRpb25cbiAgICAgICAgICAgICAgICAvLyBvbiAnY29udGVudFdpbmRvdycuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZnJhbWUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1zZywgb3JpZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jLm9wZW4oKTtcbiAgICAgICAgZG9jLndyaXRlKFwiPGh0bWw+PHNjcmlwdD5kb2N1bWVudC5kb21haW49XFxcIlwiICsgZ2xvYmFsLmRvY3VtZW50LmRvbWFpbiArIFwiXFxcIjs8L3NjcmlwdD48L2h0bWw+XCIpO1xuICAgICAgICBkb2MuY2xvc2UoKTtcbiAgICAgICAgZG9jLnBhcmVudFdpbmRvd1ttb2R1bGUuZXhwb3J0cy5XUHJlZml4XSA9IGdsb2JhbFttb2R1bGUuZXhwb3J0cy5XUHJlZml4XTtcbiAgICAgICAgdmFyIGMgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICBpZnJhbWUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGMuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgaWZyYW1lLnNyYyA9IGlmcmFtZVVybDtcbiAgICAgICAgaWZyYW1lLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvbmVycm9yKCdvbmVycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoJ3RpbWVvdXQnKTtcbiAgICAgICAgfSwgMTUwMDApO1xuICAgICAgICB1bmxvYWRSZWYgPSBldmVudFV0aWxzLnVubG9hZEFkZChjbGVhbnVwKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvc3Q6IHBvc3QsXG4gICAgICAgICAgICBjbGVhbnVwOiBjbGVhbnVwLFxuICAgICAgICAgICAgbG9hZGVkOiB1bmF0dGFjaFxuICAgICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzLmNyZWF0ZUh0bWxmaWxlID0gY3JlYXRlSHRtbGZpbGU7XG4gICAgZXhwb3J0cy5pZnJhbWVFbmFibGVkID0gZmFsc2U7XG4gICAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgICAvLyBwb3N0TWVzc2FnZSBtaXNiZWhhdmVzIGluIGtvbnF1ZXJvciA0LjYuNSAtIHRoZSBtZXNzYWdlcyBhcmUgZGVsaXZlcmVkIHdpdGhcbiAgICAgICAgLy8gaHVnZSBkZWxheSwgb3Igbm90IGF0IGFsbC5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMuaWZyYW1lRW5hYmxlZCA9ICh0eXBlb2YgZ2xvYmFsLnBvc3RNZXNzYWdlID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgICB0eXBlb2YgZ2xvYmFsLnBvc3RNZXNzYWdlID09PSAnb2JqZWN0JykgJiYgKCFicm93c2VyLmlzS29ucXVlcm9yKCkpO1xuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWZyYW1lLmpzLm1hcCJdfQ==
},{"./browser":44,"./event":46,"debug":54,"json3":57}],48:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var logObject = {};
    ['log', 'debug', 'warn'].forEach(function (level) {
        var levelExists;
        try {
            levelExists = global.console && global.console[level] && global.console[level].apply;
        }
        catch (e) {
        }
        logObject[level] = levelExists ? function () {
            return global.console[level].apply(global.console, arguments);
        } : (level === 'log' ? function () {
        } : logObject.log);
    });
    return logObject;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgbG9nT2JqZWN0ID0ge307XG4gICAgWydsb2cnLCAnZGVidWcnLCAnd2FybiddLmZvckVhY2goZnVuY3Rpb24gKGxldmVsKSB7XG4gICAgICAgIHZhciBsZXZlbEV4aXN0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldmVsRXhpc3RzID0gZ2xvYmFsLmNvbnNvbGUgJiYgZ2xvYmFsLmNvbnNvbGVbbGV2ZWxdICYmIGdsb2JhbC5jb25zb2xlW2xldmVsXS5hcHBseTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICB9XG4gICAgICAgIGxvZ09iamVjdFtsZXZlbF0gPSBsZXZlbEV4aXN0cyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuY29uc29sZVtsZXZlbF0uYXBwbHkoZ2xvYmFsLmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gOiAobGV2ZWwgPT09ICdsb2cnID8gZnVuY3Rpb24gKCkge1xuICAgICAgICB9IDogbG9nT2JqZWN0LmxvZyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGxvZ09iamVjdDtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9nLmpzLm1hcCJdfQ==
},{}],49:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
    exports.isObject = isObject;
    function extend(obj, info) {
        if (!this.isObject(obj)) {
            return obj;
        }
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (Object.prototype.hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    }
    exports.extend = extend;
});
//# sourceMappingURL=object.js.map
},{}],50:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'crypto'], factory);
    }
})(function (require, exports) {
    "use strict";
    /* global crypto:true */
    var crypto = require('crypto');
    // This string has length 32, a power of 2, so the modulus doesn't introduce a
    // bias.
    var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
    function string(length) {
        var max = _randomStringChars.length;
        var bytes = crypto.randomBytes(length);
        var ret = [];
        for (var i = 0; i < length; i++) {
            ret.push(_randomStringChars.substr(bytes[i] % max, 1));
        }
        return ret.join('');
    }
    exports.string = string;
    function number(max) {
        return Math.floor(Math.random() * max);
    }
    exports.number = number;
    function numberString(max) {
        var t = ('' + (max - 1)).length;
        var p = new Array(t + 1).join('0');
        return (p + this.number(max)).slice(-t);
    }
    exports.numberString = numberString;
});
//# sourceMappingURL=random.js.map
},{"crypto":43}],51:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:utils:transport');
    }
    return function (availableTransports) {
        return {
            filterToEnabled: function (transportsWhitelist, info) {
                var transports = {
                    main: [],
                    facade: []
                };
                if (!transportsWhitelist) {
                    transportsWhitelist = [];
                }
                else if (typeof transportsWhitelist === 'string') {
                    transportsWhitelist = [transportsWhitelist];
                }
                availableTransports.forEach(function (trans) {
                    if (!trans) {
                        return;
                    }
                    if (trans.transportName === 'websocket' && info.websocket === false) {
                        debug('disabled from server', 'websocket');
                        return;
                    }
                    if (transportsWhitelist.length &&
                        transportsWhitelist.indexOf(trans.transportName) === -1) {
                        debug('not in whitelist', trans.transportName);
                        return;
                    }
                    if (trans.enabled(info)) {
                        debug('enabled', trans.transportName);
                        transports.main.push(trans);
                        if (trans.facadeTransport) {
                            transports.facade.push(trans.facadeTransport);
                        }
                    }
                    else {
                        debug('disabled', trans.transportName);
                    }
                });
                return transports;
            }
        };
    };
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy90cmFuc3BvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgXyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgX1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnV0aWxzOnRyYW5zcG9ydCcpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGF2YWlsYWJsZVRyYW5zcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbHRlclRvRW5hYmxlZDogZnVuY3Rpb24gKHRyYW5zcG9ydHNXaGl0ZWxpc3QsIGluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbjogW10sXG4gICAgICAgICAgICAgICAgICAgIGZhY2FkZTogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0c1doaXRlbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzV2hpdGVsaXN0ID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0cmFuc3BvcnRzV2hpdGVsaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzV2hpdGVsaXN0ID0gW3RyYW5zcG9ydHNXaGl0ZWxpc3RdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhdmFpbGFibGVUcmFuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnMudHJhbnNwb3J0TmFtZSA9PT0gJ3dlYnNvY2tldCcgJiYgaW5mby53ZWJzb2NrZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnZGlzYWJsZWQgZnJvbSBzZXJ2ZXInLCAnd2Vic29ja2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydHNXaGl0ZWxpc3QubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzV2hpdGVsaXN0LmluZGV4T2YodHJhbnMudHJhbnNwb3J0TmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zygnbm90IGluIHdoaXRlbGlzdCcsIHRyYW5zLnRyYW5zcG9ydE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFucy5lbmFibGVkKGluZm8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnZW5hYmxlZCcsIHRyYW5zLnRyYW5zcG9ydE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0cy5tYWluLnB1c2godHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zLmZhY2FkZVRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHMuZmFjYWRlLnB1c2godHJhbnMuZmFjYWRlVHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKCdkaXNhYmxlZCcsIHRyYW5zLnRyYW5zcG9ydE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zcG9ydHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNwb3J0LmpzLm1hcCJdfQ==
},{"debug":54}],52:[function(require,module,exports){
(function (process){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    var URL = require('url-parse');
    var debug = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i - 0] = arguments[_i];
        }
    };
    if (process.env.NODE_ENV !== 'production') {
        debug = require('debug')('sockjs-client:utils:url');
    }
    function getOrigin(url) {
        if (!url) {
            return null;
        }
        var p = new URL(url);
        if (p.protocol === 'file:') {
            return null;
        }
        var port = p.port;
        if (!port) {
            port = (p.protocol === 'https:') ? '443' : '80';
        }
        return p.protocol + '//' + p.hostname + ':' + port;
    }
    exports.getOrigin = getOrigin;
    function isOriginEqual(a, b) {
        var res = this.getOrigin(a) === this.getOrigin(b);
        debug('same', a, b, res);
        return res;
    }
    exports.isOriginEqual = isOriginEqual;
    function isSchemeEqual(a, b) {
        return (a.split(':')[0] === b.split(':')[0]);
    }
    exports.isSchemeEqual = isSchemeEqual;
    function addPath(url, path) {
        var qs = url.split('?');
        return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
    }
    exports.addPath = addPath;
    function addQuery(url, q) {
        return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
    }
    exports.addQuery = addQuery;
});

}).call(this,{ env: {} })
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy91cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIFVSTCA9IHJlcXVpcmUoJ3VybC1wYXJzZScpO1xuICAgIHZhciBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIF9bX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp1dGlsczp1cmwnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0T3JpZ2luKHVybCkge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSBuZXcgVVJMKHVybCk7XG4gICAgICAgIGlmIChwLnByb3RvY29sID09PSAnZmlsZTonKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9ydCA9IHAucG9ydDtcbiAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICBwb3J0ID0gKHAucHJvdG9jb2wgPT09ICdodHRwczonKSA/ICc0NDMnIDogJzgwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcC5wcm90b2NvbCArICcvLycgKyBwLmhvc3RuYW1lICsgJzonICsgcG9ydDtcbiAgICB9XG4gICAgZXhwb3J0cy5nZXRPcmlnaW4gPSBnZXRPcmlnaW47XG4gICAgZnVuY3Rpb24gaXNPcmlnaW5FcXVhbChhLCBiKSB7XG4gICAgICAgIHZhciByZXMgPSB0aGlzLmdldE9yaWdpbihhKSA9PT0gdGhpcy5nZXRPcmlnaW4oYik7XG4gICAgICAgIGRlYnVnKCdzYW1lJywgYSwgYiwgcmVzKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZXhwb3J0cy5pc09yaWdpbkVxdWFsID0gaXNPcmlnaW5FcXVhbDtcbiAgICBmdW5jdGlvbiBpc1NjaGVtZUVxdWFsKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLnNwbGl0KCc6JylbMF0gPT09IGIuc3BsaXQoJzonKVswXSk7XG4gICAgfVxuICAgIGV4cG9ydHMuaXNTY2hlbWVFcXVhbCA9IGlzU2NoZW1lRXF1YWw7XG4gICAgZnVuY3Rpb24gYWRkUGF0aCh1cmwsIHBhdGgpIHtcbiAgICAgICAgdmFyIHFzID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgIHJldHVybiBxc1swXSArIHBhdGggKyAocXNbMV0gPyAnPycgKyBxc1sxXSA6ICcnKTtcbiAgICB9XG4gICAgZXhwb3J0cy5hZGRQYXRoID0gYWRkUGF0aDtcbiAgICBmdW5jdGlvbiBhZGRRdWVyeSh1cmwsIHEpIHtcbiAgICAgICAgcmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICgnPycgKyBxKSA6ICgnJicgKyBxKSk7XG4gICAgfVxuICAgIGV4cG9ydHMuYWRkUXVlcnkgPSBhZGRRdWVyeTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXJsLmpzLm1hcCJdfQ==
},{"debug":54,"url-parse":62}],53:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return '1.1.1';
});
//# sourceMappingURL=version.js.map
},{}],54:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":55}],55:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":58}],56:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],57:[function(require,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9qc29uMy9saWIvanNvbjMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyohIEpTT04gdjMuMy4yIHwgaHR0cDovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTQsIEtpdCBDYW1icmlkZ2UgfCBodHRwOi8va2l0Lm1pdC1saWNlbnNlLm9yZyAqL1xuOyhmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCB0aGUgYGRlZmluZWAgZnVuY3Rpb24gZXhwb3NlZCBieSBhc3luY2hyb25vdXMgbW9kdWxlIGxvYWRlcnMuIFRoZVxuICAvLyBzdHJpY3QgYGRlZmluZWAgY2hlY2sgaXMgbmVjZXNzYXJ5IGZvciBjb21wYXRpYmlsaXR5IHdpdGggYHIuanNgLlxuICB2YXIgaXNMb2FkZXIgPSB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZDtcblxuICAvLyBBIHNldCBvZiB0eXBlcyB1c2VkIHRvIGRpc3Rpbmd1aXNoIG9iamVjdHMgZnJvbSBwcmltaXRpdmVzLlxuICB2YXIgb2JqZWN0VHlwZXMgPSB7XG4gICAgXCJmdW5jdGlvblwiOiB0cnVlLFxuICAgIFwib2JqZWN0XCI6IHRydWVcbiAgfTtcblxuICAvLyBEZXRlY3QgdGhlIGBleHBvcnRzYCBvYmplY3QgZXhwb3NlZCBieSBDb21tb25KUyBpbXBsZW1lbnRhdGlvbnMuXG4gIHZhciBmcmVlRXhwb3J0cyA9IG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbiAgLy8gVXNlIHRoZSBgZ2xvYmFsYCBvYmplY3QgZXhwb3NlZCBieSBOb2RlIChpbmNsdWRpbmcgQnJvd3NlcmlmeSB2aWFcbiAgLy8gYGluc2VydC1tb2R1bGUtZ2xvYmFsc2ApLCBOYXJ3aGFsLCBhbmQgUmluZ28gYXMgdGhlIGRlZmF1bHQgY29udGV4dCxcbiAgLy8gYW5kIHRoZSBgd2luZG93YCBvYmplY3QgaW4gYnJvd3NlcnMuIFJoaW5vIGV4cG9ydHMgYSBgZ2xvYmFsYCBmdW5jdGlvblxuICAvLyBpbnN0ZWFkLlxuICB2YXIgcm9vdCA9IG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdyB8fCB0aGlzLFxuICAgICAgZnJlZUdsb2JhbCA9IGZyZWVFeHBvcnRzICYmIG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIHR5cGVvZiBnbG9iYWwgPT0gXCJvYmplY3RcIiAmJiBnbG9iYWw7XG5cbiAgaWYgKGZyZWVHbG9iYWwgJiYgKGZyZWVHbG9iYWxbXCJnbG9iYWxcIl0gPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbFtcIndpbmRvd1wiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wic2VsZlwiXSA9PT0gZnJlZUdsb2JhbCkpIHtcbiAgICByb290ID0gZnJlZUdsb2JhbDtcbiAgfVxuXG4gIC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgSlNPTiAzIHVzaW5nIHRoZSBnaXZlbiBgY29udGV4dGAgb2JqZWN0LCBhdHRhY2hpbmcgdGhlXG4gIC8vIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGZ1bmN0aW9ucyB0byB0aGUgc3BlY2lmaWVkIGBleHBvcnRzYCBvYmplY3QuXG4gIGZ1bmN0aW9uIHJ1bkluQ29udGV4dChjb250ZXh0LCBleHBvcnRzKSB7XG4gICAgY29udGV4dCB8fCAoY29udGV4dCA9IHJvb3RbXCJPYmplY3RcIl0oKSk7XG4gICAgZXhwb3J0cyB8fCAoZXhwb3J0cyA9IHJvb3RbXCJPYmplY3RcIl0oKSk7XG5cbiAgICAvLyBOYXRpdmUgY29uc3RydWN0b3IgYWxpYXNlcy5cbiAgICB2YXIgTnVtYmVyID0gY29udGV4dFtcIk51bWJlclwiXSB8fCByb290W1wiTnVtYmVyXCJdLFxuICAgICAgICBTdHJpbmcgPSBjb250ZXh0W1wiU3RyaW5nXCJdIHx8IHJvb3RbXCJTdHJpbmdcIl0sXG4gICAgICAgIE9iamVjdCA9IGNvbnRleHRbXCJPYmplY3RcIl0gfHwgcm9vdFtcIk9iamVjdFwiXSxcbiAgICAgICAgRGF0ZSA9IGNvbnRleHRbXCJEYXRlXCJdIHx8IHJvb3RbXCJEYXRlXCJdLFxuICAgICAgICBTeW50YXhFcnJvciA9IGNvbnRleHRbXCJTeW50YXhFcnJvclwiXSB8fCByb290W1wiU3ludGF4RXJyb3JcIl0sXG4gICAgICAgIFR5cGVFcnJvciA9IGNvbnRleHRbXCJUeXBlRXJyb3JcIl0gfHwgcm9vdFtcIlR5cGVFcnJvclwiXSxcbiAgICAgICAgTWF0aCA9IGNvbnRleHRbXCJNYXRoXCJdIHx8IHJvb3RbXCJNYXRoXCJdLFxuICAgICAgICBuYXRpdmVKU09OID0gY29udGV4dFtcIkpTT05cIl0gfHwgcm9vdFtcIkpTT05cIl07XG5cbiAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgbmF0aXZlIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGltcGxlbWVudGF0aW9ucy5cbiAgICBpZiAodHlwZW9mIG5hdGl2ZUpTT04gPT0gXCJvYmplY3RcIiAmJiBuYXRpdmVKU09OKSB7XG4gICAgICBleHBvcnRzLnN0cmluZ2lmeSA9IG5hdGl2ZUpTT04uc3RyaW5naWZ5O1xuICAgICAgZXhwb3J0cy5wYXJzZSA9IG5hdGl2ZUpTT04ucGFyc2U7XG4gICAgfVxuXG4gICAgLy8gQ29udmVuaWVuY2UgYWxpYXNlcy5cbiAgICB2YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlLFxuICAgICAgICBnZXRDbGFzcyA9IG9iamVjdFByb3RvLnRvU3RyaW5nLFxuICAgICAgICBpc1Byb3BlcnR5LCBmb3JFYWNoLCB1bmRlZjtcblxuICAgIC8vIFRlc3QgdGhlIGBEYXRlI2dldFVUQypgIG1ldGhvZHMuIEJhc2VkIG9uIHdvcmsgYnkgQFlhZmZsZS5cbiAgICB2YXIgaXNFeHRlbmRlZCA9IG5ldyBEYXRlKC0zNTA5ODI3MzM0NTczMjkyKTtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIGBnZXRVVENGdWxsWWVhcmAsIGBNb250aGAsIGFuZCBgRGF0ZWAgbWV0aG9kcyByZXR1cm4gbm9uc2Vuc2ljYWxcbiAgICAgIC8vIHJlc3VsdHMgZm9yIGNlcnRhaW4gZGF0ZXMgaW4gT3BlcmEgPj0gMTAuNTMuXG4gICAgICBpc0V4dGVuZGVkID0gaXNFeHRlbmRlZC5nZXRVVENGdWxsWWVhcigpID09IC0xMDkyNTIgJiYgaXNFeHRlbmRlZC5nZXRVVENNb250aCgpID09PSAwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDRGF0ZSgpID09PSAxICYmXG4gICAgICAgIC8vIFNhZmFyaSA8IDIuMC4yIHN0b3JlcyB0aGUgaW50ZXJuYWwgbWlsbGlzZWNvbmQgdGltZSB2YWx1ZSBjb3JyZWN0bHksXG4gICAgICAgIC8vIGJ1dCBjbGlwcyB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBkYXRlIG1ldGhvZHMgdG8gdGhlIHJhbmdlIG9mXG4gICAgICAgIC8vIHNpZ25lZCAzMi1iaXQgaW50ZWdlcnMgKFstMiAqKiAzMSwgMiAqKiAzMSAtIDFdKS5cbiAgICAgICAgaXNFeHRlbmRlZC5nZXRVVENIb3VycygpID09IDEwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWludXRlcygpID09IDM3ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDU2Vjb25kcygpID09IDYgJiYgaXNFeHRlbmRlZC5nZXRVVENNaWxsaXNlY29uZHMoKSA9PSA3MDg7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuXG4gICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbiAgICAvLyBpbXBsZW1lbnRhdGlvbnMgYXJlIHNwZWMtY29tcGxpYW50LiBCYXNlZCBvbiB3b3JrIGJ5IEtlbiBTbnlkZXIuXG4gICAgZnVuY3Rpb24gaGFzKG5hbWUpIHtcbiAgICAgIGlmIChoYXNbbmFtZV0gIT09IHVuZGVmKSB7XG4gICAgICAgIC8vIFJldHVybiBjYWNoZWQgZmVhdHVyZSB0ZXN0IHJlc3VsdC5cbiAgICAgICAgcmV0dXJuIGhhc1tuYW1lXTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1N1cHBvcnRlZDtcbiAgICAgIGlmIChuYW1lID09IFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpIHtcbiAgICAgICAgLy8gSUUgPD0gNyBkb2Vzbid0IHN1cHBvcnQgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIHVzaW5nIHNxdWFyZVxuICAgICAgICAvLyBicmFja2V0IG5vdGF0aW9uLiBJRSA4IG9ubHkgc3VwcG9ydHMgdGhpcyBmb3IgcHJpbWl0aXZlcy5cbiAgICAgICAgaXNTdXBwb3J0ZWQgPSBcImFcIlswXSAhPSBcImFcIjtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PSBcImpzb25cIikge1xuICAgICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciBib3RoIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBKU09OLnBhcnNlYCBhcmVcbiAgICAgICAgLy8gc3VwcG9ydGVkLlxuICAgICAgICBpc1N1cHBvcnRlZCA9IGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdmFsdWUsIHNlcmlhbGl6ZWQgPSAne1wiYVwiOlsxLHRydWUsZmFsc2UsbnVsbCxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcIl19JztcbiAgICAgICAgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgICBpZiAobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIpIHtcbiAgICAgICAgICB2YXIgc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJpbmdpZnksIHN0cmluZ2lmeVN1cHBvcnRlZCA9IHR5cGVvZiBzdHJpbmdpZnkgPT0gXCJmdW5jdGlvblwiICYmIGlzRXh0ZW5kZWQ7XG4gICAgICAgICAgaWYgKHN0cmluZ2lmeVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgLy8gQSB0ZXN0IGZ1bmN0aW9uIG9iamVjdCB3aXRoIGEgY3VzdG9tIGB0b0pTT05gIG1ldGhvZC5cbiAgICAgICAgICAgICh2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9KS50b0pTT04gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCAzLjFiMSBhbmQgYjIgc2VyaWFsaXplIHN0cmluZywgbnVtYmVyLCBhbmQgYm9vbGVhblxuICAgICAgICAgICAgICAgIC8vIHByaW1pdGl2ZXMgYXMgb2JqZWN0IGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSgwKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIsIGFuZCBKU09OIDIgc2VyaWFsaXplIHdyYXBwZWQgcHJpbWl0aXZlcyBhcyBvYmplY3RcbiAgICAgICAgICAgICAgICAvLyBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IE51bWJlcigpKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IFN0cmluZygpKSA9PSAnXCJcIicgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdmFsdWUgaXMgYG51bGxgLCBgdW5kZWZpbmVkYCwgb3JcbiAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0cyB3aXRoIGB0b0pTT05gIHByb3BlcnRpZXMgYXMgd2VsbCwgKnVubGVzcyogdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgLy8gd2l0aGluIGFuIG9iamVjdCBvciBhcnJheSkuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAvLyBJRSA4IHNlcmlhbGl6ZXMgYHVuZGVmaW5lZGAgYXMgYFwidW5kZWZpbmVkXCJgLiBTYWZhcmkgPD0gNS4xLjcgYW5kXG4gICAgICAgICAgICAgICAgLy8gRkYgMy4xYjMgcGFzcyB0aGlzIHRlc3QuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjcgYW5kIEZGIDMuMWIzIHRocm93IGBFcnJvcmBzIGFuZCBgVHlwZUVycm9yYHMsXG4gICAgICAgICAgICAgICAgLy8gcmVzcGVjdGl2ZWx5LCBpZiB0aGUgdmFsdWUgaXMgb21pdHRlZCBlbnRpcmVseS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgbnVtYmVyLFxuICAgICAgICAgICAgICAgIC8vIHN0cmluZywgYXJyYXksIG9iamVjdCwgQm9vbGVhbiwgb3IgYG51bGxgIGxpdGVyYWwuIFRoaXMgYXBwbGllcyB0b1xuICAgICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgLy8gaW5zaWRlIG9iamVjdCBvciBhcnJheSBsaXRlcmFscy4gWVVJIDMuMC4wYjEgaWdub3JlcyBjdXN0b20gYHRvSlNPTmBcbiAgICAgICAgICAgICAgICAvLyBtZXRob2RzIGVudGlyZWx5LlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt2YWx1ZV0pID09IFwiWzFdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2ZcbiAgICAgICAgICAgICAgICAvLyBgXCJbbnVsbF1cImAuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt1bmRlZl0pID09IFwiW251bGxdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBZVUkgMy4wLjBiMSBmYWlscyB0byBzZXJpYWxpemUgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsKSA9PSBcIm51bGxcIiAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIGhhbHRzIHNlcmlhbGl6YXRpb24gaWYgYW4gYXJyYXkgY29udGFpbnMgYSBmdW5jdGlvbjpcbiAgICAgICAgICAgICAgICAvLyBgWzEsIHRydWUsIGdldENsYXNzLCAxXWAgc2VyaWFsaXplcyBhcyBcIlsxLHRydWUsXSxcIi4gRkYgMy4xYjNcbiAgICAgICAgICAgICAgICAvLyBlbGlkZXMgbm9uLUpTT04gdmFsdWVzIGZyb20gb2JqZWN0cyBhbmQgYXJyYXlzLCB1bmxlc3MgdGhleVxuICAgICAgICAgICAgICAgIC8vIGRlZmluZSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcy5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmLCBnZXRDbGFzcywgbnVsbF0pID09IFwiW251bGwsbnVsbCxudWxsXVwiICYmXG4gICAgICAgICAgICAgICAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyB3aGVyZSBjaGFyYWN0ZXIgZXNjYXBlIGNvZGVzIGFyZSBleHBlY3RlZCAoZS5nLiwgYFxcYmAgPT4gYFxcdTAwMDhgKS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoeyBcImFcIjogW3ZhbHVlLCB0cnVlLCBmYWxzZSwgbnVsbCwgXCJcXHgwMFxcYlxcblxcZlxcclxcdFwiXSB9KSA9PSBzZXJpYWxpemVkICYmXG4gICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEgYW5kIGIyIGlnbm9yZSB0aGUgYGZpbHRlcmAgYW5kIGB3aWR0aGAgYXJndW1lbnRzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsLCB2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFsxLCAyXSwgbnVsbCwgMSkgPT0gXCJbXFxuIDEsXFxuIDJcXG5dXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBKU09OIDIsIFByb3RvdHlwZSA8PSAxLjcsIGFuZCBvbGRlciBXZWJLaXQgYnVpbGRzIGluY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gc2VyaWFsaXplIGV4dGVuZGVkIHllYXJzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtOC42NGUxNSkpID09ICdcIi0yNzE4MjEtMDQtMjBUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAgIC8vIFRoZSBtaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKDguNjRlMTUpKSA9PSAnXCIrMjc1NzYwLTA5LTEzVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IDw9IDExLjAgaW5jb3JyZWN0bHkgc2VyaWFsaXplcyB5ZWFycyBwcmlvciB0byAwIGFzIG5lZ2F0aXZlXG4gICAgICAgICAgICAgICAgLy8gZm91ci1kaWdpdCB5ZWFycyBpbnN0ZWFkIG9mIHNpeC1kaWdpdCB5ZWFycy4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTYyMTk4NzU1MmU1KSkgPT0gJ1wiLTAwMDAwMS0wMS0wMVQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS41IGFuZCBPcGVyYSA+PSAxMC41MyBpbmNvcnJlY3RseSBzZXJpYWxpemUgbWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAvLyB2YWx1ZXMgbGVzcyB0aGFuIDEwMDAuIENyZWRpdHM6IEBZYWZmbGUuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC0xKSkgPT0gJ1wiMTk2OS0xMi0zMVQyMzo1OTo1OS45OTlaXCInO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpc1N1cHBvcnRlZCA9IHN0cmluZ2lmeVN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBUZXN0IGBKU09OLnBhcnNlYC5cbiAgICAgICAgaWYgKG5hbWUgPT0gXCJqc29uLXBhcnNlXCIpIHtcbiAgICAgICAgICB2YXIgcGFyc2UgPSBleHBvcnRzLnBhcnNlO1xuICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2UgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBiYXJlIGxpdGVyYWwgaXMgcHJvdmlkZWQuXG4gICAgICAgICAgICAgIC8vIENvbmZvcm1pbmcgaW1wbGVtZW50YXRpb25zIHNob3VsZCBhbHNvIGNvZXJjZSB0aGUgaW5pdGlhbCBhcmd1bWVudCB0b1xuICAgICAgICAgICAgICAvLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuICAgICAgICAgICAgICBpZiAocGFyc2UoXCIwXCIpID09PSAwICYmICFwYXJzZShmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGUgcGFyc2luZyB0ZXN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlU3VwcG9ydGVkID0gdmFsdWVbXCJhXCJdLmxlbmd0aCA9PSA1ICYmIHZhbHVlW1wiYVwiXVswXSA9PT0gMTtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuMiBhbmQgRkYgMy4xYjEgYWxsb3cgdW5lc2NhcGVkIHRhYnMgaW4gc3RyaW5ncy5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSAhcGFyc2UoJ1wiXFx0XCInKTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMgYW5kIGxlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAvLyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzbyBhbGxvd1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGNlcnRhaW4gb2N0YWwgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjAxXCIpICE9PSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBGRiA0LjAsIDQuMC4xLCBhbmQgUmhpbm8gMS43UjMtUjQgYWxsb3cgdHJhaWxpbmcgZGVjaW1hbFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaW50cy4gVGhlc2UgZW52aXJvbm1lbnRzLCBhbG9uZyB3aXRoIEZGIDMuMWIxIGFuZCAyLFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gcGFyc2UoXCIxLlwiKSAhPT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzU3VwcG9ydGVkID0gcGFyc2VTdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNbbmFtZV0gPSAhIWlzU3VwcG9ydGVkO1xuICAgIH1cblxuICAgIGlmICghaGFzKFwianNvblwiKSkge1xuICAgICAgLy8gQ29tbW9uIGBbW0NsYXNzXV1gIG5hbWUgYWxpYXNlcy5cbiAgICAgIHZhciBmdW5jdGlvbkNsYXNzID0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiLFxuICAgICAgICAgIGRhdGVDbGFzcyA9IFwiW29iamVjdCBEYXRlXVwiLFxuICAgICAgICAgIG51bWJlckNsYXNzID0gXCJbb2JqZWN0IE51bWJlcl1cIixcbiAgICAgICAgICBzdHJpbmdDbGFzcyA9IFwiW29iamVjdCBTdHJpbmddXCIsXG4gICAgICAgICAgYXJyYXlDbGFzcyA9IFwiW29iamVjdCBBcnJheV1cIixcbiAgICAgICAgICBib29sZWFuQ2xhc3MgPSBcIltvYmplY3QgQm9vbGVhbl1cIjtcblxuICAgICAgLy8gRGV0ZWN0IGluY29tcGxldGUgc3VwcG9ydCBmb3IgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIGJ5IGluZGV4LlxuICAgICAgdmFyIGNoYXJJbmRleEJ1Z2d5ID0gaGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpO1xuXG4gICAgICAvLyBEZWZpbmUgYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMgaWYgdGhlIGBEYXRlYCBtZXRob2RzIGFyZSBidWdneS5cbiAgICAgIGlmICghaXNFeHRlbmRlZCkge1xuICAgICAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgICAgICAvLyBBIG1hcHBpbmcgYmV0d2VlbiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyIGFuZCB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlblxuICAgICAgICAvLyBKYW51YXJ5IDFzdCBhbmQgdGhlIGZpcnN0IG9mIHRoZSByZXNwZWN0aXZlIG1vbnRoLlxuICAgICAgICB2YXIgTW9udGhzID0gWzAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0XTtcbiAgICAgICAgLy8gSW50ZXJuYWw6IENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW4gdGhlIFVuaXggZXBvY2ggYW5kIHRoZVxuICAgICAgICAvLyBmaXJzdCBkYXkgb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAgICB2YXIgZ2V0RGF5ID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoKSB7XG4gICAgICAgICAgcmV0dXJuIE1vbnRoc1ttb250aF0gKyAzNjUgKiAoeWVhciAtIDE5NzApICsgZmxvb3IoKHllYXIgLSAxOTY5ICsgKG1vbnRoID0gKyhtb250aCA+IDEpKSkgLyA0KSAtIGZsb29yKCh5ZWFyIC0gMTkwMSArIG1vbnRoKSAvIDEwMCkgKyBmbG9vcigoeWVhciAtIDE2MDEgKyBtb250aCkgLyA0MDApO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiBhIHByb3BlcnR5IGlzIGEgZGlyZWN0IHByb3BlcnR5IG9mIHRoZSBnaXZlblxuICAgICAgLy8gb2JqZWN0LiBEZWxlZ2F0ZXMgdG8gdGhlIG5hdGl2ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBtZXRob2QuXG4gICAgICBpZiAoIShpc1Byb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHkpKSB7XG4gICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICB2YXIgbWVtYmVycyA9IHt9LCBjb25zdHJ1Y3RvcjtcbiAgICAgICAgICBpZiAoKG1lbWJlcnMuX19wcm90b19fID0gbnVsbCwgbWVtYmVycy5fX3Byb3RvX18gPSB7XG4gICAgICAgICAgICAvLyBUaGUgKnByb3RvKiBwcm9wZXJ0eSBjYW5ub3QgYmUgc2V0IG11bHRpcGxlIHRpbWVzIGluIHJlY2VudFxuICAgICAgICAgICAgLy8gdmVyc2lvbnMgb2YgRmlyZWZveCBhbmQgU2VhTW9ua2V5LlxuICAgICAgICAgICAgXCJ0b1N0cmluZ1wiOiAxXG4gICAgICAgICAgfSwgbWVtYmVycykudG9TdHJpbmcgIT0gZ2V0Q2xhc3MpIHtcbiAgICAgICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuMyBkb2Vzbid0IGltcGxlbWVudCBgT2JqZWN0I2hhc093blByb3BlcnR5YCwgYnV0XG4gICAgICAgICAgICAvLyBzdXBwb3J0cyB0aGUgbXV0YWJsZSAqcHJvdG8qIHByb3BlcnR5LlxuICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAvLyBDYXB0dXJlIGFuZCBicmVhayB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluIChzZWUgc2VjdGlvbiA4LjYuMlxuICAgICAgICAgICAgICAvLyBvZiB0aGUgRVMgNS4xIHNwZWMpLiBUaGUgcGFyZW50aGVzaXplZCBleHByZXNzaW9uIHByZXZlbnRzIGFuXG4gICAgICAgICAgICAgIC8vIHVuc2FmZSB0cmFuc2Zvcm1hdGlvbiBieSB0aGUgQ2xvc3VyZSBDb21waWxlci5cbiAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gdGhpcy5fX3Byb3RvX18sIHJlc3VsdCA9IHByb3BlcnR5IGluICh0aGlzLl9fcHJvdG9fXyA9IG51bGwsIHRoaXMpO1xuICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICAgIHRoaXMuX19wcm90b19fID0gb3JpZ2luYWw7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDYXB0dXJlIGEgcmVmZXJlbmNlIHRvIHRoZSB0b3AtbGV2ZWwgYE9iamVjdGAgY29uc3RydWN0b3IuXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgdG8gc2ltdWxhdGUgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW5cbiAgICAgICAgICAgIC8vIG90aGVyIGVudmlyb25tZW50cy5cbiAgICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICh0aGlzLmNvbnN0cnVjdG9yIHx8IGNvbnN0cnVjdG9yKS5wcm90b3R5cGU7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eSBpbiB0aGlzICYmICEocHJvcGVydHkgaW4gcGFyZW50ICYmIHRoaXNbcHJvcGVydHldID09PSBwYXJlbnRbcHJvcGVydHldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbWJlcnMgPSBudWxsO1xuICAgICAgICAgIHJldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcywgcHJvcGVydHkpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuICAgICAgLy8gZW52aXJvbm1lbnRzLiBFYWNoIGVudW1lcmF0ZWQga2V5IGlzIHlpZWxkZWQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLlxuICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzaXplID0gMCwgUHJvcGVydGllcywgbWVtYmVycywgcHJvcGVydHk7XG5cbiAgICAgICAgLy8gVGVzdHMgZm9yIGJ1Z3MgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQncyBgZm9yLi4uaW5gIGFsZ29yaXRobS4gVGhlXG4gICAgICAgIC8vIGB2YWx1ZU9mYCBwcm9wZXJ0eSBpbmhlcml0cyB0aGUgbm9uLWVudW1lcmFibGUgZmxhZyBmcm9tXG4gICAgICAgIC8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuICAgICAgICAoUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlT2YgPSAwO1xuICAgICAgICB9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7XG5cbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBgUHJvcGVydGllc2AgY2xhc3MuXG4gICAgICAgIG1lbWJlcnMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgICAgICBmb3IgKHByb3BlcnR5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAvLyBJZ25vcmUgYWxsIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuICAgICAgICAgIGlmIChpc1Byb3BlcnR5LmNhbGwobWVtYmVycywgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICBzaXplKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDtcblxuICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGl0ZXJhdGlvbiBhbGdvcml0aG0uXG4gICAgICAgIGlmICghc2l6ZSkge1xuICAgICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgICBtZW1iZXJzID0gW1widmFsdWVPZlwiLCBcInRvU3RyaW5nXCIsIFwidG9Mb2NhbGVTdHJpbmdcIiwgXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLCBcImlzUHJvdG90eXBlT2ZcIiwgXCJoYXNPd25Qcm9wZXJ0eVwiLCBcImNvbnN0cnVjdG9yXCJdO1xuICAgICAgICAgIC8vIElFIDw9IDgsIE1vemlsbGEgMS4wLCBhbmQgTmV0c2NhcGUgNi4yIGlnbm9yZSBzaGFkb3dlZCBub24tZW51bWVyYWJsZVxuICAgICAgICAgIC8vIHByb3BlcnRpZXMuXG4gICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IGdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLCBwcm9wZXJ0eSwgbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGhhc1Byb3BlcnR5ID0gIWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSBcImZ1bmN0aW9uXCIgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG9iamVjdC5oYXNPd25Qcm9wZXJ0eV0gJiYgb2JqZWN0Lmhhc093blByb3BlcnR5IHx8IGlzUHJvcGVydHk7XG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAvLyBHZWNrbyA8PSAxLjAgZW51bWVyYXRlcyB0aGUgYHByb3RvdHlwZWAgcHJvcGVydHkgb2YgZnVuY3Rpb25zIHVuZGVyXG4gICAgICAgICAgICAgIC8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG4gICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaGFzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub24tZW51bWVyYWJsZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIGZvciAobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7IHByb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07IGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHNpemUgPT0gMikge1xuICAgICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG4gICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzZXQgb2YgaXRlcmF0ZWQgcHJvcGVydGllcy5cbiAgICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHk7XG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAvLyBTdG9yZSBlYWNoIHByb3BlcnR5IG5hbWUgdG8gcHJldmVudCBkb3VibGUgZW51bWVyYXRpb24uIFRoZVxuICAgICAgICAgICAgICAvLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuICAgICAgICAgICAgICAvLyBlbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG4gICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgIWlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkgJiYgKG1lbWJlcnNbcHJvcGVydHldID0gMSkgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBObyBidWdzIGRldGVjdGVkOyB1c2UgdGhlIHN0YW5kYXJkIGBmb3IuLi5pbmAgYWxnb3JpdGhtLlxuICAgICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHksIGlzQ29uc3RydWN0b3I7XG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgZHVlIHRvXG4gICAgICAgICAgICAvLyBjcm9zcy1lbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG4gICAgICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCAocHJvcGVydHkgPSBcImNvbnN0cnVjdG9yXCIpKSkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9yRWFjaChvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFB1YmxpYzogU2VyaWFsaXplcyBhIEphdmFTY3JpcHQgYHZhbHVlYCBhcyBhIEpTT04gc3RyaW5nLiBUaGUgb3B0aW9uYWxcbiAgICAgIC8vIGBmaWx0ZXJgIGFyZ3VtZW50IG1heSBzcGVjaWZ5IGVpdGhlciBhIGZ1bmN0aW9uIHRoYXQgYWx0ZXJzIGhvdyBvYmplY3QgYW5kXG4gICAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAgIC8vIGluZGljYXRlcyB3aGljaCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBzZXJpYWxpemVkLiBUaGUgb3B0aW9uYWwgYHdpZHRoYFxuICAgICAgLy8gYXJndW1lbnQgbWF5IGJlIGVpdGhlciBhIHN0cmluZyBvciBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGluZGVudGF0aW9uXG4gICAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgICAgaWYgKCFoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSkge1xuICAgICAgICAvLyBJbnRlcm5hbDogQSBtYXAgb2YgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciBlc2NhcGVkIGVxdWl2YWxlbnRzLlxuICAgICAgICB2YXIgRXNjYXBlcyA9IHtcbiAgICAgICAgICA5MjogXCJcXFxcXFxcXFwiLFxuICAgICAgICAgIDM0OiAnXFxcXFwiJyxcbiAgICAgICAgICA4OiBcIlxcXFxiXCIsXG4gICAgICAgICAgMTI6IFwiXFxcXGZcIixcbiAgICAgICAgICAxMDogXCJcXFxcblwiLFxuICAgICAgICAgIDEzOiBcIlxcXFxyXCIsXG4gICAgICAgICAgOTogXCJcXFxcdFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4gICAgICAgIC8vIGxlbmd0aCBpcyBhdCBsZWFzdCBlcXVhbCB0byBgd2lkdGhgLiBUaGUgYHdpZHRoYCBtdXN0IGJlIDw9IDYuXG4gICAgICAgIHZhciBsZWFkaW5nWmVyb2VzID0gXCIwMDAwMDBcIjtcbiAgICAgICAgdmFyIHRvUGFkZGVkU3RyaW5nID0gZnVuY3Rpb24gKHdpZHRoLCB2YWx1ZSkge1xuICAgICAgICAgIC8vIFRoZSBgfHwgMGAgZXhwcmVzc2lvbiBpcyBuZWNlc3NhcnkgdG8gd29yayBhcm91bmQgYSBidWcgaW5cbiAgICAgICAgICAvLyBPcGVyYSA8PSA3LjU0dTIgd2hlcmUgYDAgPT0gLTBgLCBidXQgYFN0cmluZygtMCkgIT09IFwiMFwiYC5cbiAgICAgICAgICByZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IERvdWJsZS1xdW90ZXMgYSBzdHJpbmcgYHZhbHVlYCwgcmVwbGFjaW5nIGFsbCBBU0NJSSBjb250cm9sXG4gICAgICAgIC8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbiAgICAgICAgLy8gdGhlaXIgZXNjYXBlZCBlcXVpdmFsZW50cy4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgLy8gYFF1b3RlKHZhbHVlKWAgb3BlcmF0aW9uIGRlZmluZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbiAgICAgICAgdmFyIHVuaWNvZGVQcmVmaXggPSBcIlxcXFx1MDBcIjtcbiAgICAgICAgdmFyIHF1b3RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9ICdcIicsIGluZGV4ID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoLCB1c2VDaGFySW5kZXggPSAhY2hhckluZGV4QnVnZ3kgfHwgbGVuZ3RoID4gMTA7XG4gICAgICAgICAgdmFyIHN5bWJvbHMgPSB1c2VDaGFySW5kZXggJiYgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuc3BsaXQoXCJcIikgOiB2YWx1ZSk7XG4gICAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgY2hhckNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjaGFyYWN0ZXIgaXMgYSBjb250cm9sIGNoYXJhY3RlciwgYXBwZW5kIGl0cyBVbmljb2RlIG9yXG4gICAgICAgICAgICAvLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICBjYXNlIDg6IGNhc2UgOTogY2FzZSAxMDogY2FzZSAxMjogY2FzZSAxMzogY2FzZSAzNDogY2FzZSA5MjpcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB1bmljb2RlUHJlZml4ICsgdG9QYWRkZWRTdHJpbmcoMiwgY2hhckNvZGUudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdXNlQ2hhckluZGV4ID8gc3ltYm9sc1tpbmRleF0gOiB2YWx1ZS5jaGFyQXQoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgJ1wiJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4gICAgICAgIC8vIGBTdHIoa2V5LCBob2xkZXIpYCwgYEpPKHZhbHVlKWAsIGFuZCBgSkEodmFsdWUpYCBvcGVyYXRpb25zLlxuICAgICAgICB2YXIgc2VyaWFsaXplID0gZnVuY3Rpb24gKHByb3BlcnR5LCBvYmplY3QsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBpbmRlbnRhdGlvbiwgc3RhY2spIHtcbiAgICAgICAgICB2YXIgdmFsdWUsIGNsYXNzTmFtZSwgeWVhciwgbW9udGgsIGRhdGUsIHRpbWUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMsIHJlc3VsdHMsIGVsZW1lbnQsIGluZGV4LCBsZW5ndGgsIHByZWZpeCwgcmVzdWx0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBOZWNlc3NhcnkgZm9yIGhvc3Qgb2JqZWN0IHN1cHBvcnQuXG4gICAgICAgICAgICB2YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGRhdGVDbGFzcyAmJiAhaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkge1xuICAgICAgICAgICAgICBpZiAodmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCkge1xuICAgICAgICAgICAgICAgIC8vIERhdGVzIGFyZSBzZXJpYWxpemVkIGFjY29yZGluZyB0byB0aGUgYERhdGUjdG9KU09OYCBtZXRob2RcbiAgICAgICAgICAgICAgICAvLyBzcGVjaWZpZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuOS41LjQ0LiBTZWUgc2VjdGlvbiAxNS45LjEuMTVcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGhlIElTTyA4NjAxIGRhdGUgdGltZSBzdHJpbmcgZm9ybWF0LlxuICAgICAgICAgICAgICAgIGlmIChnZXREYXkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIE1hbnVhbGx5IGNvbXB1dGUgdGhlIHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcyxcbiAgICAgICAgICAgICAgICAgIC8vIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgaWYgdGhlIGBnZXRVVEMqYCBtZXRob2RzIGFyZVxuICAgICAgICAgICAgICAgICAgLy8gYnVnZ3kuIEFkYXB0ZWQgZnJvbSBAWWFmZmxlJ3MgYGRhdGUtc2hpbWAgcHJvamVjdC5cbiAgICAgICAgICAgICAgICAgIGRhdGUgPSBmbG9vcih2YWx1ZSAvIDg2NGU1KTtcbiAgICAgICAgICAgICAgICAgIGZvciAoeWVhciA9IGZsb29yKGRhdGUgLyAzNjUuMjQyNSkgKyAxOTcwIC0gMTsgZ2V0RGF5KHllYXIgKyAxLCAwKSA8PSBkYXRlOyB5ZWFyKyspO1xuICAgICAgICAgICAgICAgICAgZm9yIChtb250aCA9IGZsb29yKChkYXRlIC0gZ2V0RGF5KHllYXIsIDApKSAvIDMwLjQyKTsgZ2V0RGF5KHllYXIsIG1vbnRoICsgMSkgPD0gZGF0ZTsgbW9udGgrKyk7XG4gICAgICAgICAgICAgICAgICBkYXRlID0gMSArIGRhdGUgLSBnZXREYXkoeWVhciwgbW9udGgpO1xuICAgICAgICAgICAgICAgICAgLy8gVGhlIGB0aW1lYCB2YWx1ZSBzcGVjaWZpZXMgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkgKHNlZSBFU1xuICAgICAgICAgICAgICAgICAgLy8gNS4xIHNlY3Rpb24gMTUuOS4xLjIpLiBUaGUgZm9ybXVsYSBgKEEgJSBCICsgQikgJSBCYCBpcyB1c2VkXG4gICAgICAgICAgICAgICAgICAvLyB0byBjb21wdXRlIGBBIG1vZHVsbyBCYCwgYXMgdGhlIGAlYCBvcGVyYXRvciBkb2VzIG5vdFxuICAgICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZCB0byB0aGUgYG1vZHVsb2Agb3BlcmF0aW9uIGZvciBuZWdhdGl2ZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgICAgdGltZSA9ICh2YWx1ZSAlIDg2NGU1ICsgODY0ZTUpICUgODY0ZTU7XG4gICAgICAgICAgICAgICAgICAvLyBUaGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgYXJlIG9idGFpbmVkIGJ5XG4gICAgICAgICAgICAgICAgICAvLyBkZWNvbXBvc2luZyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheS4gU2VlIHNlY3Rpb24gMTUuOS4xLjEwLlxuICAgICAgICAgICAgICAgICAgaG91cnMgPSBmbG9vcih0aW1lIC8gMzZlNSkgJSAyNDtcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBmbG9vcih0aW1lIC8gNmU0KSAlIDYwO1xuICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IGZsb29yKHRpbWUgLyAxZTMpICUgNjA7XG4gICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB0aW1lICUgMWUzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB5ZWFyID0gdmFsdWUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgIG1vbnRoID0gdmFsdWUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgICAgICAgIGRhdGUgPSB2YWx1ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICAgICAgICBob3VycyA9IHZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgICAgICAgICBtaW51dGVzID0gdmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IHZhbHVlLmdldFVUQ1NlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHZhbHVlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gKHllYXIgPD0gMCB8fCB5ZWFyID49IDFlNCA/ICh5ZWFyIDwgMCA/IFwiLVwiIDogXCIrXCIpICsgdG9QYWRkZWRTdHJpbmcoNiwgeWVhciA8IDAgPyAteWVhciA6IHllYXIpIDogdG9QYWRkZWRTdHJpbmcoNCwgeWVhcikpICtcbiAgICAgICAgICAgICAgICAgIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbW9udGggKyAxKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgZGF0ZSkgK1xuICAgICAgICAgICAgICAgICAgLy8gTW9udGhzLCBkYXRlcywgaG91cnMsIG1pbnV0ZXMsIGFuZCBzZWNvbmRzIHNob3VsZCBoYXZlIHR3b1xuICAgICAgICAgICAgICAgICAgLy8gZGlnaXRzOyBtaWxsaXNlY29uZHMgc2hvdWxkIGhhdmUgdGhyZWUuXG4gICAgICAgICAgICAgICAgICBcIlRcIiArIHRvUGFkZGVkU3RyaW5nKDIsIGhvdXJzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbWludXRlcykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIHNlY29uZHMpICtcbiAgICAgICAgICAgICAgICAgIC8vIE1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNS4wLCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuICAgICAgICAgICAgICAgICAgXCIuXCIgKyB0b1BhZGRlZFN0cmluZygzLCBtaWxsaXNlY29uZHMpICsgXCJaXCI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT0gXCJmdW5jdGlvblwiICYmICgoY2xhc3NOYW1lICE9IG51bWJlckNsYXNzICYmIGNsYXNzTmFtZSAhPSBzdHJpbmdDbGFzcyAmJiBjbGFzc05hbWUgIT0gYXJyYXlDbGFzcykgfHwgaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkpIHtcbiAgICAgICAgICAgICAgLy8gUHJvdG90eXBlIDw9IDEuNi4xIGFkZHMgbm9uLXN0YW5kYXJkIGB0b0pTT05gIG1ldGhvZHMgdG8gdGhlXG4gICAgICAgICAgICAgIC8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbiAgICAgICAgICAgICAgLy8gaWdub3JlcyBhbGwgYHRvSlNPTmAgbWV0aG9kcyBvbiB0aGVzZSBvYmplY3RzIHVubGVzcyB0aGV5IGFyZVxuICAgICAgICAgICAgICAvLyBkZWZpbmVkIGRpcmVjdGx5IG9uIGFuIGluc3RhbmNlLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gSWYgYSByZXBsYWNlbWVudCBmdW5jdGlvbiB3YXMgcHJvdmlkZWQsIGNhbGwgaXQgdG8gb2J0YWluIHRoZSB2YWx1ZVxuICAgICAgICAgICAgLy8gZm9yIHNlcmlhbGl6YXRpb24uXG4gICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7XG4gICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpIHtcbiAgICAgICAgICAgIC8vIEJvb2xlYW5zIGFyZSByZXByZXNlbnRlZCBsaXRlcmFsbHkuXG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIGBJbmZpbml0eWAgYW5kIGBOYU5gIGFyZSBzZXJpYWxpemVkIGFzXG4gICAgICAgICAgICAvLyBgXCJudWxsXCJgLlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDAgPyBcIlwiICsgdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcykge1xuICAgICAgICAgICAgLy8gU3RyaW5ncyBhcmUgZG91YmxlLXF1b3RlZCBhbmQgZXNjYXBlZC5cbiAgICAgICAgICAgIHJldHVybiBxdW90ZShcIlwiICsgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGlzIGlzIGEgbGluZWFyIHNlYXJjaDsgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIC8vIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZiB1bmlxdWUgbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICBmb3IgKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICAgIGlmIChzdGFja1tsZW5ndGhdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIEN5Y2xpYyBzdHJ1Y3R1cmVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGJ5IGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgICAgICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbCBhbmQgaW5kZW50IG9uZSBhZGRpdGlvbmFsIGxldmVsLlxuICAgICAgICAgICAgcHJlZml4ID0gaW5kZW50YXRpb247XG4gICAgICAgICAgICBpbmRlbnRhdGlvbiArPSB3aGl0ZXNwYWNlO1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBhcnJheSBlbGVtZW50cy5cbiAgICAgICAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc2VyaWFsaXplKGluZGV4LCB2YWx1ZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjayk7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmID8gXCJudWxsXCIgOiBlbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/ICh3aGl0ZXNwYWNlID8gXCJbXFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIl1cIiA6IChcIltcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIl1cIikpIDogXCJbXVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdCBtZW1iZXJzLiBNZW1iZXJzIGFyZSBzZWxlY3RlZCBmcm9tXG4gICAgICAgICAgICAgIC8vIGVpdGhlciBhIHVzZXItc3BlY2lmaWVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMsIG9yIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgLy8gaXRzZWxmLlxuICAgICAgICAgICAgICBmb3JFYWNoKHByb3BlcnRpZXMgfHwgdmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gc2VyaWFsaXplKHByb3BlcnR5LCB2YWx1ZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgICAvLyBBY2NvcmRpbmcgdG8gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMzogXCJJZiBgZ2FwYCB7d2hpdGVzcGFjZX1cbiAgICAgICAgICAgICAgICAgIC8vIGlzIG5vdCB0aGUgZW1wdHkgc3RyaW5nLCBsZXQgYG1lbWJlcmAge3F1b3RlKHByb3BlcnR5KSArIFwiOlwifVxuICAgICAgICAgICAgICAgICAgLy8gYmUgdGhlIGNvbmNhdGVuYXRpb24gb2YgYG1lbWJlcmAgYW5kIHRoZSBgc3BhY2VgIGNoYXJhY3Rlci5cIlxuICAgICAgICAgICAgICAgICAgLy8gVGhlIFwiYHNwYWNlYCBjaGFyYWN0ZXJcIiByZWZlcnMgdG8gdGhlIGxpdGVyYWwgc3BhY2VcbiAgICAgICAgICAgICAgICAgIC8vIGNoYXJhY3Rlciwgbm90IHRoZSBgc3BhY2VgIHt3aWR0aH0gYXJndW1lbnQgcHJvdmlkZWQgdG9cbiAgICAgICAgICAgICAgICAgIC8vIGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocXVvdGUocHJvcGVydHkpICsgXCI6XCIgKyAod2hpdGVzcGFjZSA/IFwiIFwiIDogXCJcIikgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/ICh3aGl0ZXNwYWNlID8gXCJ7XFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIn1cIiA6IChcIntcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIn1cIikpIDogXCJ7fVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBvYmplY3QgZnJvbSB0aGUgdHJhdmVyc2VkIG9iamVjdCBzdGFjay5cbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUHVibGljOiBgSlNPTi5zdHJpbmdpZnlgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbiAgICAgICAgZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoc291cmNlLCBmaWx0ZXIsIHdpZHRoKSB7XG4gICAgICAgICAgdmFyIHdoaXRlc3BhY2UsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCBjbGFzc05hbWU7XG4gICAgICAgICAgaWYgKG9iamVjdFR5cGVzW3R5cGVvZiBmaWx0ZXJdICYmIGZpbHRlcikge1xuICAgICAgICAgICAgaWYgKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKGZpbHRlcikpID09IGZ1bmN0aW9uQ2xhc3MpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmaWx0ZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHByb3BlcnR5IG5hbWVzIGFycmF5IGludG8gYSBtYWtlc2hpZnQgc2V0LlxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZmlsdGVyLmxlbmd0aCwgdmFsdWU7IGluZGV4IDwgbGVuZ3RoOyB2YWx1ZSA9IGZpbHRlcltpbmRleCsrXSwgKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKSksIGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyB8fCBjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpICYmIChwcm9wZXJ0aWVzW3ZhbHVlXSA9IDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgICAgICBpZiAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwod2lkdGgpKSA9PSBudW1iZXJDbGFzcykge1xuICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAgIC8vIGB3aWR0aGAgbnVtYmVyIG9mIHNwYWNlIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgIGlmICgod2lkdGggLT0gd2lkdGggJSAxKSA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHdoaXRlc3BhY2UgPSBcIlwiLCB3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDsgd2hpdGVzcGFjZSArPSBcIiBcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKSB7XG4gICAgICAgICAgICAgIHdoaXRlc3BhY2UgPSB3aWR0aC5sZW5ndGggPD0gMTAgPyB3aWR0aCA6IHdpZHRoLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gT3BlcmEgPD0gNy41NHUyIGRpc2NhcmRzIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGVtcHR5IHN0cmluZyBrZXlzXG4gICAgICAgICAgLy8gKGBcIlwiYCkgb25seSBpZiB0aGV5IGFyZSB1c2VkIGRpcmVjdGx5IHdpdGhpbiBhbiBvYmplY3QgbWVtYmVyIGxpc3RcbiAgICAgICAgICAvLyAoZS5nLiwgYCEoXCJcIiBpbiB7IFwiXCI6IDF9KWApLlxuICAgICAgICAgIHJldHVybiBzZXJpYWxpemUoXCJcIiwgKHZhbHVlID0ge30sIHZhbHVlW1wiXCJdID0gc291cmNlLCB2YWx1ZSksIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBcIlwiLCBbXSk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIFB1YmxpYzogUGFyc2VzIGEgSlNPTiBzb3VyY2Ugc3RyaW5nLlxuICAgICAgaWYgKCFoYXMoXCJqc29uLXBhcnNlXCIpKSB7XG4gICAgICAgIHZhciBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4gICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4gICAgICAgIC8vIGVxdWl2YWxlbnRzLlxuICAgICAgICB2YXIgVW5lc2NhcGVzID0ge1xuICAgICAgICAgIDkyOiBcIlxcXFxcIixcbiAgICAgICAgICAzNDogJ1wiJyxcbiAgICAgICAgICA0NzogXCIvXCIsXG4gICAgICAgICAgOTg6IFwiXFxiXCIsXG4gICAgICAgICAgMTE2OiBcIlxcdFwiLFxuICAgICAgICAgIDExMDogXCJcXG5cIixcbiAgICAgICAgICAxMDI6IFwiXFxmXCIsXG4gICAgICAgICAgMTE0OiBcIlxcclwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IFN0b3JlcyB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICB2YXIgSW5kZXgsIFNvdXJjZTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVzZXRzIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHRocm93cyBhIGBTeW50YXhFcnJvcmAuXG4gICAgICAgIHZhciBhYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmV0dXJucyB0aGUgbmV4dCB0b2tlbiwgb3IgYFwiJFwiYCBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkXG4gICAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuICAgICAgICAvLyBsaXRlcmFsLCBvciBCb29sZWFuIGxpdGVyYWwuXG4gICAgICAgIHZhciBsZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHNvdXJjZSA9IFNvdXJjZSwgbGVuZ3RoID0gc291cmNlLmxlbmd0aCwgdmFsdWUsIGJlZ2luLCBwb3NpdGlvbiwgaXNTaWduZWQsIGNoYXJDb2RlO1xuICAgICAgICAgIHdoaWxlIChJbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgOTogY2FzZSAxMDogY2FzZSAxMzogY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuICAgICAgICAgICAgICAgIC8vIGZlZWRzLCBhbmQgc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDEyMzogY2FzZSAxMjU6IGNhc2UgOTE6IGNhc2UgOTM6IGNhc2UgNTg6IGNhc2UgNDQ6XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgYSBwdW5jdHVhdG9yIHRva2VuIChge2AsIGB9YCwgYFtgLCBgXWAsIGA6YCwgb3IgYCxgKSBhdFxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gY2hhckluZGV4QnVnZ3kgPyBzb3VyY2UuY2hhckF0KEluZGV4KSA6IHNvdXJjZVtJbmRleF07XG4gICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgLy8gYFwiYCBkZWxpbWl0cyBhIEpTT04gc3RyaW5nOyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmRcbiAgICAgICAgICAgICAgICAvLyBiZWdpbiBwYXJzaW5nIHRoZSBzdHJpbmcuIFN0cmluZyB0b2tlbnMgYXJlIHByZWZpeGVkIHdpdGggdGhlXG4gICAgICAgICAgICAgICAgLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4gICAgICAgICAgICAgICAgLy8gZW5kLW9mLXN0cmluZyB0b2tlbnMuXG4gICAgICAgICAgICAgICAgZm9yICh2YWx1ZSA9IFwiQFwiLCBJbmRleCsrOyBJbmRleCA8IGxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5lc2NhcGVkIEFTQ0lJIGNvbnRyb2wgY2hhcmFjdGVycyAodGhvc2Ugd2l0aCBhIGNvZGUgdW5pdFxuICAgICAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJDb2RlID09IDkyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udHJvbCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBgXCJgLCBgXFxgLCBhbmQgYC9gKSBvciBVbmljb2RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTI6IGNhc2UgMzQ6IGNhc2UgNDc6IGNhc2UgOTg6IGNhc2UgMTE2OiBjYXNlIDExMDogY2FzZSAxMDI6IGNhc2UgMTE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gVW5lc2NhcGVzW2NoYXJDb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IGNvZGUgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXggKyA0OyBJbmRleCA8IHBvc2l0aW9uOyBJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5zZW5zaXRpdmUpIHRoYXQgZm9ybSBhIHNpbmdsZSBoZXhhZGVjaW1hbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcgfHwgY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTAyIHx8IGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDcwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGZyb21DaGFyQ29kZShcIjB4XCIgKyBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBBbiB1bmVzY2FwZWQgZG91YmxlLXF1b3RlIGNoYXJhY3RlciBtYXJrcyB0aGUgZW5kIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjb21tb24gY2FzZSB3aGVyZSBhIHN0cmluZyBpcyB2YWxpZC5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJDb2RlID49IDMyICYmIGNoYXJDb2RlICE9IDkyICYmIGNoYXJDb2RlICE9IDM0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHN0cmluZyBhcy1pcy5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZCByZXR1cm4gdGhlIHJldml2ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW50ZXJtaW5hdGVkIHN0cmluZy5cbiAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIG51bWJlcnMgYW5kIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIGJlZ2luID0gSW5kZXg7XG4gICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0NSkge1xuICAgICAgICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcbiAgICAgICAgICAgICAgICAgIC8vIExlYWRpbmcgemVyb2VzIGFyZSBpbnRlcnByZXRlZCBhcyBvY3RhbCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0OCAmJiAoKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGludGVnZXIgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgZm9yICg7IEluZGV4IDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCkpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IEluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4gICAgICAgICAgICAgICAgICAvLyBjYXNlIGlzIGFscmVhZHkgYWNjb3VudGVkIGZvciBieSB0aGUgcGFyc2VyLlxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nikge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBkZWNpbWFsIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbikpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIHRyYWlsaW5nIGRlY2ltYWwuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBJbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgZXhwb25lbnRzLiBUaGUgYGVgIGRlbm90aW5nIHRoZSBleHBvbmVudCBpc1xuICAgICAgICAgICAgICAgICAgLy8gY2FzZS1pbnNlbnNpdGl2ZS5cbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDEwMSB8fCBjaGFyQ29kZSA9PSA2OSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHBhc3QgdGhlIHNpZ24gZm9sbG93aW5nIHRoZSBleHBvbmVudCwgaWYgb25lIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwZWNpZmllZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQzIHx8IGNoYXJDb2RlID09IDQ1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgZXhwb25lbnRpYWwgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbikpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIGVtcHR5IGV4cG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcGFyc2VkIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBudW1iZXIuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gK3NvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBIG5lZ2F0aXZlIHNpZ24gbWF5IG9ubHkgcHJlY2VkZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgIGlmIChpc1NpZ25lZCkge1xuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gYHRydWVgLCBgZmFsc2VgLCBhbmQgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNCkgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA1KSA9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNCkgPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW5yZWNvZ25pemVkIHRva2VuLlxuICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VudGluZWwgYCRgIGNoYXJhY3RlciBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgICAvLyBvZiB0aGUgc291cmNlIHN0cmluZy5cbiAgICAgICAgICByZXR1cm4gXCIkXCI7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IFBhcnNlcyBhIEpTT04gYHZhbHVlYCB0b2tlbi5cbiAgICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHZhciByZXN1bHRzLCBoYXNNZW1iZXJzO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIiRcIikge1xuICAgICAgICAgICAgLy8gVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQuXG4gICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICgoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5jaGFyQXQoMCkgOiB2YWx1ZVswXSkgPT0gXCJAXCIpIHtcbiAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzZW50aW5lbCBgQGAgY2hhcmFjdGVyLlxuICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYXJzZSBvYmplY3QgYW5kIGFycmF5IGxpdGVyYWxzLlxuICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiW1wiKSB7XG4gICAgICAgICAgICAgIC8vIFBhcnNlcyBhIEpTT04gYXJyYXksIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IGFycmF5LlxuICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAvLyBBIGNsb3Npbmcgc3F1YXJlIGJyYWNrZXQgbWFya3MgdGhlIGVuZCBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0aW5nIHRoZSBwcmV2aW91cyBlbGVtZW50IGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gbmV4dC5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIGFycmF5IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIGFycmF5IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVsaXNpb25zIGFuZCBsZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChnZXQodmFsdWUpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gXCJ7XCIpIHtcbiAgICAgICAgICAgICAgLy8gUGFyc2VzIGEgSlNPTiBvYmplY3QsIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAgICAgICAgICAgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgICBmb3IgKDs7IGhhc01lbWJlcnMgfHwgKGhhc01lbWJlcnMgPSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvYmplY3QgbGl0ZXJhbCBjb250YWlucyBtZW1iZXJzLCB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRvci5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBvYmplY3QgbWVtYmVyLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBMZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZCwgb2JqZWN0IHByb3BlcnR5IG5hbWVzIG11c3QgYmVcbiAgICAgICAgICAgICAgICAvLyBkb3VibGUtcXVvdGVkIHN0cmluZ3MsIGFuZCBhIGA6YCBtdXN0IHNlcGFyYXRlIGVhY2ggcHJvcGVydHlcbiAgICAgICAgICAgICAgICAvLyBuYW1lIGFuZCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pICE9IFwiQFwiIHx8IGxleCgpICE9IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzW3ZhbHVlLnNsaWNlKDEpXSA9IGdldChsZXgoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRva2VuIGVuY291bnRlcmVkLlxuICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG4gICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IHdhbGsoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spO1xuICAgICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZikge1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBlbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGEgcGFyc2VkIEpTT04gb2JqZWN0LCBpbnZva2luZyB0aGVcbiAgICAgICAgLy8gYGNhbGxiYWNrYCBmdW5jdGlvbiBmb3IgZWFjaCB2YWx1ZS4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgLy8gYFdhbGsoaG9sZGVyLCBuYW1lKWAgb3BlcmF0aW9uIGRlZmluZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMi5cbiAgICAgICAgdmFyIHdhbGsgPSBmdW5jdGlvbiAoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2VbcHJvcGVydHldLCBsZW5ndGg7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBgZm9yRWFjaGAgY2FuJ3QgYmUgdXNlZCB0byB0cmF2ZXJzZSBhbiBhcnJheSBpbiBPcGVyYSA8PSA4LjU0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGl0cyBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zIGBmYWxzZWBcbiAgICAgICAgICAgIC8vIGZvciBhcnJheSBpbmRpY2VzIChlLmcuLCBgIVsxLCAyLCAzXS5oYXNPd25Qcm9wZXJ0eShcIjBcIilgKS5cbiAgICAgICAgICAgIGlmIChnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgIGZvciAobGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIGxlbmd0aCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUHVibGljOiBgSlNPTi5wYXJzZWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgICBleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgcmVzdWx0LCB2YWx1ZTtcbiAgICAgICAgICBJbmRleCA9IDA7XG4gICAgICAgICAgU291cmNlID0gXCJcIiArIHNvdXJjZTtcbiAgICAgICAgICByZXN1bHQgPSBnZXQobGV4KCkpO1xuICAgICAgICAgIC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuICAgICAgICAgIGlmIChsZXgoKSAhPSBcIiRcIikge1xuICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVzZXQgdGhlIHBhcnNlciBzdGF0ZS5cbiAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGdldENsYXNzLmNhbGwoY2FsbGJhY2spID09IGZ1bmN0aW9uQ2xhc3MgPyB3YWxrKCh2YWx1ZSA9IHt9LCB2YWx1ZVtcIlwiXSA9IHJlc3VsdCwgdmFsdWUpLCBcIlwiLCBjYWxsYmFjaykgOiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0c1tcInJ1bkluQ29udGV4dFwiXSA9IHJ1bkluQ29udGV4dDtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfVxuXG4gIGlmIChmcmVlRXhwb3J0cyAmJiAhaXNMb2FkZXIpIHtcbiAgICAvLyBFeHBvcnQgZm9yIENvbW1vbkpTIGVudmlyb25tZW50cy5cbiAgICBydW5JbkNvbnRleHQocm9vdCwgZnJlZUV4cG9ydHMpO1xuICB9IGVsc2Uge1xuICAgIC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG4gICAgdmFyIG5hdGl2ZUpTT04gPSByb290LkpTT04sXG4gICAgICAgIHByZXZpb3VzSlNPTiA9IHJvb3RbXCJKU09OM1wiXSxcbiAgICAgICAgaXNSZXN0b3JlZCA9IGZhbHNlO1xuXG4gICAgdmFyIEpTT04zID0gcnVuSW5Db250ZXh0KHJvb3QsIChyb290W1wiSlNPTjNcIl0gPSB7XG4gICAgICAvLyBQdWJsaWM6IFJlc3RvcmVzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgZ2xvYmFsIGBKU09OYCBvYmplY3QgYW5kXG4gICAgICAvLyByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBgSlNPTjNgIG9iamVjdC5cbiAgICAgIFwibm9Db25mbGljdFwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNSZXN0b3JlZCkge1xuICAgICAgICAgIGlzUmVzdG9yZWQgPSB0cnVlO1xuICAgICAgICAgIHJvb3QuSlNPTiA9IG5hdGl2ZUpTT047XG4gICAgICAgICAgcm9vdFtcIkpTT04zXCJdID0gcHJldmlvdXNKU09OO1xuICAgICAgICAgIG5hdGl2ZUpTT04gPSBwcmV2aW91c0pTT04gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OMztcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICByb290LkpTT04gPSB7XG4gICAgICBcInBhcnNlXCI6IEpTT04zLnBhcnNlLFxuICAgICAgXCJzdHJpbmdpZnlcIjogSlNPTjMuc3RyaW5naWZ5XG4gICAgfTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuICBpZiAoaXNMb2FkZXIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEpTT04zO1xuICAgIH0pO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuIl19
},{}],58:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],59:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

},{}],60:[function(require,module,exports){
'use strict';

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

},{}],61:[function(require,module,exports){
(function (global){
function __assignFn(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
}
function __extendsFn(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __decorateFn(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadataFn(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
}
function __paramFn(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function __awaiterFn(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator.throw(value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
}
// hook global helpers
(function (__global) {
    __global.__assign = (__global && __global.__assign) || Object.assign || __assignFn;
    __global.__extends = (__global && __global.__extends) || __extendsFn;
    __global.__decorate = (__global && __global.__decorate) || __decorateFn;
    __global.__metadata = (__global && __global.__metadata) || __metadataFn;
    __global.__param = (__global && __global.__param) || __paramFn;
    __global.__awaiter = (__global && __global.__awaiter) || __awaiterFn;
})(typeof window !== "undefined" ? window :
    typeof WorkerGlobalScope !== "undefined" ? self :
        typeof global !== "undefined" ? global :
            Function("return this;")());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90cy1oZWxwZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX19hc3NpZ25Gbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcylcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufVxuZnVuY3Rpb24gX19leHRlbmRzRm4oZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpXG4gICAgICAgICAgICBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5mdW5jdGlvbiBfX2RlY29yYXRlRm4oZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZVxuICAgICAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcbiAgICAgICAgICAgIGlmIChkID0gZGVjb3JhdG9yc1tpXSlcbiAgICAgICAgICAgICAgICByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuZnVuY3Rpb24gX19tZXRhZGF0YUZuKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59XG5mdW5jdGlvbiBfX3BhcmFtRm4ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9O1xufVxuZnVuY3Rpb24gX19hd2FpdGVyRm4odGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkge1xuICAgICAgICAgICAgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkge1xuICAgICAgICAgICAgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMpKS5uZXh0KCkpO1xuICAgIH0pO1xufVxuLy8gaG9vayBnbG9iYWwgaGVscGVyc1xuKGZ1bmN0aW9uIChfX2dsb2JhbCkge1xuICAgIF9fZ2xvYmFsLl9fYXNzaWduID0gKF9fZ2xvYmFsICYmIF9fZ2xvYmFsLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IF9fYXNzaWduRm47XG4gICAgX19nbG9iYWwuX19leHRlbmRzID0gKF9fZ2xvYmFsICYmIF9fZ2xvYmFsLl9fZXh0ZW5kcykgfHwgX19leHRlbmRzRm47XG4gICAgX19nbG9iYWwuX19kZWNvcmF0ZSA9IChfX2dsb2JhbCAmJiBfX2dsb2JhbC5fX2RlY29yYXRlKSB8fCBfX2RlY29yYXRlRm47XG4gICAgX19nbG9iYWwuX19tZXRhZGF0YSA9IChfX2dsb2JhbCAmJiBfX2dsb2JhbC5fX21ldGFkYXRhKSB8fCBfX21ldGFkYXRhRm47XG4gICAgX19nbG9iYWwuX19wYXJhbSA9IChfX2dsb2JhbCAmJiBfX2dsb2JhbC5fX3BhcmFtKSB8fCBfX3BhcmFtRm47XG4gICAgX19nbG9iYWwuX19hd2FpdGVyID0gKF9fZ2xvYmFsICYmIF9fZ2xvYmFsLl9fYXdhaXRlcikgfHwgX19hd2FpdGVyRm47XG59KSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDpcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICAgICAgdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICBGdW5jdGlvbihcInJldHVybiB0aGlzO1wiKSgpKTtcbiJdfQ==
},{}],62:[function(require,module,exports){
'use strict';

var required = require('requires-port')
  , lolcation = require('./lolcation')
  , qs = require('querystringify')
  , relativere = /^\/(?!\/)/
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;

/**
 * These are the parse instructions for the URL parsers, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var instructions = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port'],                  // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

 /**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase
 * @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
 * @property {String} rest     Rest of the URL that is not part of the protocol
 */

 /**
  * Extract protocol information from a URL with/without double slash ("//")
  *
  * @param  {String} address   URL we want to extract from.
  * @return {ProtocolExtract}  Extracted information
  * @api private
  */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3] ? match[3] : ''
  };
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative = relativere.test(address)
    , parse, instruction, index, key
    , type = typeof location
    , url = this
    , extracted
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) {
    parser = qs.parse;
  }

  location = lolcation(location);

  //
  // extract protocol information before running the instructions
  //
  extracted = extractProtocol(address);
  url.protocol = extracted.protocol || location.protocol || '';
  url.slashes = extracted.slashes || location.slashes;
  address = extracted.rest;

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, address.length - index[0].length);
    }

    url[key] = url[key] || (instruction[3] || ('port' === key && relative) ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) {
      url[key] = url[key].toLowerCase();
    }
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  //
  // The href is just the compiled result.
  //
  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol +'//'+ url.host : 'null';
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
 *                               the query.
 *                               When setting the protocol, double slash will be removed from
 *                               the final url if it is true.
 * @returns {URL}
 * @api public
 */
URL.prototype.set = function set(part, value, fn) {
  var url = this;

  if ('query' === part) {
    if ('string' === typeof value && value.length) {
      value = (fn || qs.parse)(value);
    }

    url[part] = value;
  } else if ('port' === part) {
    url[part] = value;

    if (!required(value, url.protocol)) {
      url.host = url.hostname;
      url[part] = '';
    } else if (value) {
      url.host = url.hostname +':'+ value;
    }
  } else if ('hostname' === part) {
    url[part] = value;

    if (url.port) value += ':'+ url.port;
    url.host = value;
  } else if ('host' === part) {
    url[part] = value;

    if (/:\d+$/.test(value)) {
      value = value.split(':');
      url.port = value.pop();
      url.hostname = value.join(':');
    } else {
      url.hostname = value;
      url.port = '';
    }
  } else if ('protocol' === part) {
    url.protocol = value.toLowerCase();
    url.slashes = !fn;
  } else {
    url[part] = value;
  }

  for (var i = 0; i < instructions.length; i++) {
    var ins = instructions[i];

    if (ins[4]) {
      url[ins[1]] = url[ins[1]].toLowerCase();
    }
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol +'//'+ url.host : 'null';
  url.href = url.toString();

  return url;
};

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
URL.prototype.toString = function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
};

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;

},{"./lolcation":63,"querystringify":59,"requires-port":60}],63:[function(require,module,exports){
(function (global){
'use strict';

var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 }
  , URL;

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
module.exports = function lolcation(loc) {
  loc = loc || global.location || {};
  URL = URL || require('./');

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy91cmwtcGFyc2UvbG9sY2F0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHNsYXNoZXMgPSAvXltBLVphLXpdW0EtWmEtejAtOSstLl0qOlxcL1xcLy87XG5cbi8qKlxuICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgbm90IGJlIGNvcGllZCBvciBpbmhlcml0ZWQgZnJvbS4gVGhpcyBpcyBvbmx5IG5lZWRlZFxuICogZm9yIGFsbCBub24gYmxvYiBVUkwncyBhcyBhIGJsb2IgVVJMIGRvZXMgbm90IGluY2x1ZGUgYSBoYXNoLCBvbmx5IHRoZVxuICogb3JpZ2luLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaWdub3JlID0geyBoYXNoOiAxLCBxdWVyeTogMSB9XG4gICwgVVJMO1xuXG4vKipcbiAqIFRoZSBsb2NhdGlvbiBvYmplY3QgZGlmZmVycyB3aGVuIHlvdXIgY29kZSBpcyBsb2FkZWQgdGhyb3VnaCBhIG5vcm1hbCBwYWdlLFxuICogV29ya2VyIG9yIHRocm91Z2ggYSB3b3JrZXIgdXNpbmcgYSBibG9iLiBBbmQgd2l0aCB0aGUgYmxvYmJsZSBiZWdpbnMgdGhlXG4gKiB0cm91YmxlIGFzIHRoZSBsb2NhdGlvbiBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBVUkwgb2YgdGhlIGJsb2IsIG5vdCB0aGVcbiAqIGxvY2F0aW9uIG9mIHRoZSBwYWdlIHdoZXJlIG91ciBjb2RlIGlzIGxvYWRlZCBpbi4gVGhlIGFjdHVhbCBvcmlnaW4gaXNcbiAqIGVuY29kZWQgaW4gdGhlIGBwYXRobmFtZWAgc28gd2UgY2FuIHRoYW5rZnVsbHkgZ2VuZXJhdGUgYSBnb29kIFwiZGVmYXVsdFwiXG4gKiBsb2NhdGlvbiBmcm9tIGl0IHNvIHdlIGNhbiBnZW5lcmF0ZSBwcm9wZXIgcmVsYXRpdmUgVVJMJ3MgYWdhaW4uXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2MgT3B0aW9uYWwgZGVmYXVsdCBsb2NhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBsb2xjYXRpb24gb2JqZWN0LlxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2xjYXRpb24obG9jKSB7XG4gIGxvYyA9IGxvYyB8fCBnbG9iYWwubG9jYXRpb24gfHwge307XG4gIFVSTCA9IFVSTCB8fCByZXF1aXJlKCcuLycpO1xuXG4gIHZhciBmaW5hbGRlc3RpbmF0aW9uID0ge31cbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jXG4gICAgLCBrZXk7XG5cbiAgaWYgKCdibG9iOicgPT09IGxvYy5wcm90b2NvbCkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVVJMKHVuZXNjYXBlKGxvYy5wYXRobmFtZSksIHt9KTtcbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZSkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVVJMKGxvYywge30pO1xuICAgIGZvciAoa2V5IGluIGlnbm9yZSkgZGVsZXRlIGZpbmFsZGVzdGluYXRpb25ba2V5XTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZSkge1xuICAgIGZvciAoa2V5IGluIGxvYykge1xuICAgICAgaWYgKGtleSBpbiBpZ25vcmUpIGNvbnRpbnVlO1xuICAgICAgZmluYWxkZXN0aW5hdGlvbltrZXldID0gbG9jW2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPSBzbGFzaGVzLnRlc3QobG9jLmhyZWYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaW5hbGRlc3RpbmF0aW9uO1xufTtcbiJdfQ==
},{"./":62}]},{},[1])(1)
});


//# sourceMappingURL=sockjs.js.map