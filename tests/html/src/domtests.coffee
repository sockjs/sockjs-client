module('Dom')

u = SockJS.getUtils()

newIframe = ->
    document.domain = document.domain
    hook = u.createHook()
    err = ->
        log('iframe error. bad.')
    hook.iobj = u.createIframe('/iframe.html?a=' + Math.random() + '#' + hook.id, err)
    return hook

if navigator.userAgent.indexOf('Konqueror') isnt -1 or $.browser.opera
    test "onunload [unsupported by client]", ->
        ok(true)
else
    asyncTest 'onunload', ->
        expect(2)
        hook = newIframe()
        hook.open = ->
            ok(true, 'open hook called by an iframe')
            hook.callback("""
                    var u = SockJS.getUtils();
                    u.attachEvent('unload', function(){
                        hook.done();
                    });
                """)
            f = -> hook.iobj.cleanup()
            setTimeout(f, 1)
        hook.done = ->
            ok(true, 'done hook called by an iframe')
            hook.del()
            start()

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

