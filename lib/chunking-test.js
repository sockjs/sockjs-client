var doChunkingTest = function(base_url, callback, cors) {
    var recv = new XhrReceiver(base_url + '/chunking_test', {cors: cors});
    var result = 0;
    recv.onmessage = function(e) {
        // Now a cool hack: we can stop receiving after we got at least
        // one chunk, contains some data, but not everyting.
        var l = e.responsetext.split('h\n').length;
        if(e.readystate === 3 && l > 0 && l < 6 ) {
            result = l;
            recv.abort();
        }
    };
    recv.onclose = function(e) {
        recv = recv.onmessage = recv.onclose = null;
        utils.log('Chunking test: ' + (result ? 'passed' : 'failed')
                  + ' (' + result + ' chunk received)');
        callback(!!result);
    };
};

var ChunkingTestIframe = FacadeJS['w-iframe-chunking-test'] = function (ri, trans_url, base_url) {
    doChunkingTest(base_url, function(r) {
                       ri._didMessage('m'+r);
                       ri._didClose();
                   }, false);
};
ChunkingTestIframe.prototype.doCleanup = function() {};

var chunkingTestUncached = SockJS.chunkingTest = function(base_url, callback, options) {
    base_url = utils.amendUrl(base_url);
    // 1. CORS
    if (_window.XDomainRequest ||
         (_window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())) {
        doChunkingTest(base_url, callback, true);
        return;
    }
    if(!_document.body) {
        utils.attachEvent('load', function(){
            chunkingTestWithBody(base_url, callback, options);
        });
    } else {
        chunkingTestWithBody(base_url, callback, options);
    }
}
var chunkingTestWithBody = function(base_url, callback, options) {
    // 2. Iframe
    if (IframeTransport.enabled()) {
        var ifr = new IframeTransport();
        ifr.protocol = 'w-iframe-chunking-test';
        var fun = function(r) {
            if (ifr) {
                callback(r === 'mtrue');
                ifr.doCleanup();
                ifr = null;
            }
        };
        var mock_ri = {
            _options: options || {},
            _didClose: fun,
            _didMessage: fun
        };
        ifr.i_constructor(mock_ri, '', base_url);
        return;
    }
    // 3. Fall back to polling (IE 7)
    setTimeout(function() {
                   callback(false);
               }, 0);
    return;
};

// Although chunking test is run against a particular 'base_url', it's
// safe to assume that if chunking works for client, it will work for
// any SockJS server. That means we can cache the result of
// chunkingTest, at least until user switches network. Let's assume a
// value of 10 seconds.
var chunkingTest = function() {
    var value;
    var t0 = 0;
    return function (base_url, callback) {
        var t1 = (new Date()).getTime();
        if (t1 - t0 > 10000) {
            chunkingTestUncached(base_url, function (v) {
                                     value = v;
                                     t0 = (new Date()).getTime();
                                     callback(value);
                                 });
        } else {
            setTimeout(function() {
                           callback(value);
                       }, 0);
        }
    };
}();
