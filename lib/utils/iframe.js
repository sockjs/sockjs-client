'use strict';

var eventUtils = require('./event')
  , JSON3 = require('json3')
  ;

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(this.WPrefix in global)) {
      global[this.WPrefix] = {};
    }
  }

, postMessage: function (type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: this.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      console.log('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function (iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      clearTimeout(tref);
      // Explorer had problems with that.
      try {iframe.onload = null;} catch (x) {}
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if(iframe) {
              iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(r) {
      if (iframe) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        if (iframe && iframe.contentWindow) {
          setTimeout(function() {
            iframe.contentWindow.postMessage(msg, origin);
          }, 0);
        }
      } catch (x) {}
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function(){onerror('onerror');};
    iframe.onload = function() {
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function(){onerror('onload timeout');}, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function(){onerror('timeout');}, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post,
      cleanup: cleanup,
      loaded: unattach
    };
  }

/* jshint undef: false, newcap: false */
/* eslint no-undef: 0, new-cap: 0 */
, createHtmlfile: function (iframeUrl, errorCallback) {
    var doc = new ActiveXObject('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
        clearTimeout(tref);
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r)  {
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        if (iframe && iframe.contentWindow) {
          setTimeout(function() {
            iframe.contentWindow.postMessage(msg, origin);
          }, 0);
        }
      } catch (x) {}
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[this.WPrefix] = global[this.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    tref = setTimeout(function(){onerror('timeout');}, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post,
      cleanup: cleanup,
      loaded: unattach
    };
  }
};
