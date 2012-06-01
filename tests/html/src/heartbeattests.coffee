

heartbeat_test_factory = (protocol) ->
    module(protocol)
    if not SockJS[protocol] or not SockJS[protocol].enabled()
        test "[unsupported by client]", ->
                log('Unsupported protocol (by client): "' + protocol + '"')
        return
    if client_opts.disabled_transports and
          arrIndexOf(client_opts.disabled_transports, protocol) isnt -1
        test "[disabled by config]", ->
                log('Disabled by config: "' + protocol + '"')
        return

    asyncTest 'single heartbeat', ->
        expect(3)
        r = newSockJS('/echo', protocol)
        r.onopen = (e) ->
            ok(true)
            r._sendEmpty()
            r.send('a')
        r.onmessage = (e) ->
            equal(e.data, 'a')
            r.close()
        r.onclose = (e) ->
            log(JSON.stringify(e))
            ok(true)
            start()

    asyncTest 'round trip', ->
        expect(3)
        r = newSockJS('/heartbeat', protocol)
        r.onopen = (e) ->
            ok(true)
            r._sendEmpty()
        r.onmessage = (e) ->
            equal(e.data, 'heartbeat')
            r.close()
        r.onclose = () ->
            ok(true)
            start()

    asyncTest 'server heartbeat', ->
        expect(3)
        r = newSockJS('/heartbeat', protocol)
        r.onopen = (e) ->
            ok(true)
            r.send('gimme heartbeat')
        r.onheartbeat = (e) ->
            ok(true)
            r.close()
        r.onclose = () ->
            ok(true)
            start()


for protocol in protocols
    heartbeat_test_factory(protocol)
