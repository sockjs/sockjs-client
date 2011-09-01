var doChunkingTest = function(base_url, callback, cors) {
    var recv = new XhrReceiver(base_url + '/chunking_test', {cors: cors});
    var chunk_nos = {};
    recv.onmessage = function(e) {
        chunk_nos[e.chunk_no] = true;
        // Now a cool hack: we can stop receiving after we got more
        // than one chunk:
        if (utils.objectLength(chunk_nos) > 1) {
            recv.abort();
        }
    };
    recv.onclose = function(e) {
        recv = recv.onmessage = recv.onclose = null;
        var l = utils.objectLength(chunk_nos);
        utils.log('Chunking test: ' + (l > 1 ? 'passed' : 'failed')
                  + ' (' + l + ' chunks received)');
        callback(l > 1);
    };
};

var ChunkingTestIframe = FacadeJS['w-iframe-chunking-test'] = function (ri, trans_url, base_url) {
    doChunkingTest(base_url, function(r) {
                       ri._didMessage('m'+r);
                       ri._didClose();
                   }, false);
};
ChunkingTestIframe.prototype.doCleanup = function() {};

var chunkingTestUncached = function(base_url, callback) {
    // 1. CORS
    if (_window.XDomainRequest ||
         (_window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest())) {
        doChunkingTest(base_url, callback, true);
        return;
    }
    // 2. Iframe
    if (IframeTransport.enabled()) {
        var ifr = new IframeTransport();
        ifr.protocol = 'w-iframe-chunking-test';
        var mock_ri = {
            _options: {},
            _didClose: function() {},
            _didMessage: function(r) {
                if(r.slice(0,1) === 'm') {
                    callback(r.slice(1));
                }
                ifr.doCleanup();
            }
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
