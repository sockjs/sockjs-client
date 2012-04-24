module('End to End')

factory_body_check = (protocol) ->
    if not SockJS[protocol] or not SockJS[protocol].enabled(client_opts.sockjs_opts)
        n = " " + protocol + " [unsupported by client]"
        test n, ->
            log('Unsupported protocol (by client): "' + protocol + '"')
    else
        asyncTest protocol, ->
            expect(5)
            url = client_opts.url + '/echo'

            code = """
            hook.test_body(!!document.body, typeof document.body);

            var sock = new SockJS('""" + url + """', null,
                                  {protocols_whitelist:['""" + protocol + """']});
            sock.onopen = function() {
                var m = hook.onopen();
                sock.send(m);
            };
            sock.onmessage = function(e) {
                hook.onmessage(e.data);
                sock.close();
            };
            """
            hook = newIframe('sockjs-in-head.html')
            hook.open = ->
                hook.iobj.loaded()
                ok(true, 'open')
                hook.callback(code)
            hook.test_body = (is_body, type) ->
                equal(is_body, false, 'body not yet loaded ' + type)
            hook.onopen = ->
                ok(true, 'onopen')
                return 'a'
            hook.onmessage = (m) ->
                equal(m, 'a')
                ok(true, 'onmessage')
                hook.iobj.cleanup()
                hook.del()
                start()

# module('sockjs in head')
# body_protocols = ['iframe-eventsource',
#             'iframe-htmlfile',
#             'iframe-xhr-polling',
#             'jsonp-polling']
# for protocol in body_protocols
#     factory_body_check(protocol)


module('connection errors')
asyncTest "invalid url 404", ->
    expect(4)
    r = newSockJS('/invalid_url', 'jsonp-polling')
    ok(r)
    r.onopen = (e) ->
        ok(false)
    r.onmessage = (e) ->
        ok(false)
    r.onclose = (e) ->
        if u.isXHRCorsCapable() < 4
            equals(e.code, 1002)
            equals(e.reason, 'Can\'t connect to server')
        else
            # IE 7 doesn't look at /info, unfortunately
            equals(e.code, 2000)
            equals(e.reason, 'All transports failed')
        equals(e.wasClean, false)
        start()

asyncTest "invalid url port", ->
    expect(4)
    dl = document.location
    r = newSockJS(dl.protocol + '//' + dl.hostname + ':1079', 'jsonp-polling')
    ok(r)
    r.onopen = (e) ->
        ok(false)
    r.onclose = (e) ->
        if u.isXHRCorsCapable() < 4
            equals(e.code, 1002)
            equals(e.reason, 'Can\'t connect to server')
        else
            # IE 7 doesn't look at /info, unfortunately
            equals(e.code, 2000)
            equals(e.reason, 'All transports failed')
        equals(e.wasClean, false)
        start()

asyncTest "disabled websocket test", ->
        expect(3)
        r = newSockJS('/disabled_websocket_echo', 'websocket')
        r.onopen = (e) ->
            ok(false)
        r.onmessage = (e) ->
            ok(false)
        r.onclose = (e) ->
            equals(e.code, 2000)
            equals(e.reason, "All transports failed")
            equals(e.wasClean, false)
            start()

asyncTest "close on close", ->
    expect(4)
    r = newSockJS('/close', 'jsonp-polling')
    r.onopen = (e) ->
        ok(true)
    r.onmessage = (e) ->
        ok(false)
    r.onclose = (e) ->
        equals(e.code, 3000)
        equals(e.reason, "Go away!")
        equals(e.wasClean, true)
        r.onclose = ->
            ok(false)
        r.close()

        u.delay 10, ->
            start()

# Test for #61
asyncTest "EventEmitter exception handling", ->
    expect(1)
    r = newSockJS('/echo', 'xhr-streaming')
    prev_onerror = window.onerror
    window.onerror = (e) ->
        ok(/onopen error/.test(''+e))
        window.onerror = prev_onerror
        r.close()
    r.onopen = (e) ->
        throw "onopen error"
    r.onclose = ->
        start()
