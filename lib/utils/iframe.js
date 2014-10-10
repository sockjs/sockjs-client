'use strict';

module.exports = {
  WPrefix: '_jp'

, polluteGlobalNamespace: function() {
    if (!(this.WPrefix in global)) {
      global[this.WPrefix] = {};
    }
  }

, createIframe: function (iframeUrl, errorCallback) {
    var iframe = document.createElement('iframe');
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
        utils.unloadDel(unloadRef);
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
    document.body.appendChild(iframe);
    tref = setTimeout(function(){onerror('timeout');}, 15000);
    unloadRef = utils.unloadAdd(cleanup);
    return {
      post: post,
      cleanup: cleanup,
      loaded: unattach
    };
  }

/* jshint undef: false, newcap: false */
/* eslint no-undef: [0], new-cap: [0] */
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
        utils.unloadDel(unloadRef);
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
    doc.parentWindow[utils.WPrefix] = window[utils.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    tref = setTimeout(function(){onerror('timeout');}, 15000);
    unloadRef = utils.unloadAdd(cleanup);
    return {
      post: post,
      cleanup: cleanup,
      loaded: unattach
    };
  }
};
