module('Dom')

u = SockJS.getUtils()

newIframe = (path = '/iframe.html') ->
    # Requires to put:
    #     document.domain = document.domain
    # in HEAD, for IE7
    hook = u.createHook()
    err = ->
        log('iframe error. bad.')
    hook.iobj = u.createIframe(path + '?a=' + Math.random() + '#' + hook.id, err)
    return hook

onunload_test_factory = (code) ->
    return ->
        expect(3)
        hook = newIframe()
        hook.open = ->
            ok(true, 'open hook called by an iframe')
            hook.callback(code)
        hook.load = ->
            ok(true, 'onload hook called by an iframe')
            f = -> hook.iobj.cleanup()
            setTimeout(f, 1)
        hook.unload = ->
            ok(true, 'onunload hook called by an iframe')
            hook.del()
            start()

if navigator.userAgent.indexOf('Konqueror') isnt -1 or navigator.userAgent.indexOf('Opera') isnt -1
    test "onunload [unsupported by client]", ->
        ok(true)
else
    asyncTest('onunload', onunload_test_factory("""
                    var u = SockJS.getUtils();
                    u.attachEvent('load', function(){
                        hook.load();
                    });
                    var w = 0;
                    var run = function(){
                        if(w === 0) {
                            w = 1;
                            hook.unload();
                        }
                    };
                    u.attachEvent('beforeunload', run);
                    u.attachEvent('unload', run);
                """))

if not SockJS.getIframeTransport().enabled()
    test "onmessage [unsupported by client]", ->
        ok(true)
else
    asyncTest 'onmessage', ->
        expect(3)
        hook = newIframe()
        hook.open = ->
            ok(true, 'open hook called by an iframe')
            hook.callback("""
                    var u = SockJS.getUtils();
                    u.attachMessage(function(e) {
                        var b = e.data;
                        parent.postMessage(window_id + ' ' + 'e', '*');
                    });
                    parent.postMessage(window_id + ' ' + 's', '*');
                """)
        u.attachMessage (e) ->
            [window_id, data] = e.data.split(' ')
            if window_id is hook.id
                switch data
                    when 's'
                        hook.iobj.loaded()
                        ok(true, 'start frame send')
                        origin = u.getOrigin(u.amendUrl('/'))
                        hook.iobj.post(hook.id + ' ' + 's' , origin)
                    when 'e'
                        ok(true, 'done hook called by an iframe')
                        hook.iobj.cleanup()
                        hook.del()
                        start()


ajax_simple_factory = (name) ->
    asyncTest name + ' simple', ->
        expect(2)
        x = new u[name]('GET', '/simple.txt', null)
        x.onfinish = (status, text) ->
            equal(text.length, 2051)
            equal(text.slice(-2), 'b\n')
            start()

ajax_streaming_factory = (name) ->
    asyncTest name + ' streaming', ->
        expect(4)
        x = new u[name]('GET', '/streaming.txt', null)
        x.onchunk = (status, text) ->
            equal(status, 200)
            ok(text.length <= 2049, 'Most likely you\'re behind a transparent Proxy that can\'t do streaming. QUnit tests won\'t work properly. Sorry!')
            delete x.onchunk
        x.onfinish = (status, text) ->
            equal(status, 200)
            equal(text.slice(-4), 'a\nb\n')
            start()


test_wrong_url = (name, url, statuses) ->
    if window.console and console.log
        console.log(' [*] Connecting to wrong url ' + url)
    expect(2)
    x = new u[name]('GET', url, null)
    x.onchunk = ->
        ok(false, "chunk shall not be received")
    x.onfinish = (status, text) ->
        ok(u.arrIndexOf(statuses, status) isnt -1)
        equal(text, '')
        start()

ajax_wrong_port_factory = (name) ->
    for port in [25, 8999, 65300]
        asyncTest name + ' wrong port ' + port, ->
            test_wrong_url(name, 'http://localhost:'+port+'/wrong_url_indeed.txt', [0])


ajax_simple_factory('XHRLocalObject')
if window.XDomainRequest
    ajax_simple_factory('XDRObject')

if not window.ActiveXObject
    # Ajax streaming is not working in ie.
    ajax_streaming_factory('XHRLocalObject')
if window.XDomainRequest
    ajax_streaming_factory('XDRObject')

ajax_wrong_port_factory('XHRLocalObject')
if window.XDomainRequest
    ajax_wrong_port_factory('XDRObject')

asyncTest 'XHRLocalObject wrong url', ->
    # Opera responds with 0, all other browsers with 404
    test_wrong_url('XHRLocalObject', '/wrong_url_indeed.txt', [0, 404])
if window.XDomainRequest
    asyncTest 'XDRObject wrong url', ->
        test_wrong_url('XDRObject', '/wrong_url_indeed.txt', [0])
