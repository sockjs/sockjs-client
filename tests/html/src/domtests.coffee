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

if navigator.userAgent.indexOf('Konqueror') isnt -1
    test "onunload [unsupported by client]", ->
        ok(true)
else
    asyncTest('onunload', onunload_test_factory("""
                    var u = SockJS.getUtils();
                    u.attachEvent('load', function(){
                        hook.load();
                    });
                    u.attachEvent('unload', function(){
                        hook.unload();
                    });
                """))

if navigator.userAgent.indexOf('Konqueror') isnt -1 or $.browser.opera
    test "onbeforeunload [unsupported by client]", ->
        ok(true)
else
    asyncTest('onbeforeunload', onunload_test_factory("""
                    var u = SockJS.getUtils();
                    u.attachEvent('load', function(){
                        hook.load();
                    });
                    u.attachEvent('beforeunload', function(){
                        hook.unload();
                    });
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
                        hook.iobj.iframe.contentWindow.postMessage(hook.id + ' ' + 's' , origin)
                    when 'e'
                        ok(true, 'done hook called by an iframe')
                        hook.iobj.cleanup()
                        hook.del()
                        start()





# 1. data url
# 2. wrong uri
# 3. mass run - to verify mem leaks

