newSockJS = (path, protocol) ->
    url = if /^http/.test(path) then path else client_opts.url + path
    return new SockJS(url, [protocol], client_opts.sockjs_opts)

echo_factory_factory = (protocol, messages) ->
    return ->
        expect(2 + messages.length)
        a = messages.slice(0)
        r = newSockJS('/echo', protocol)
        r.onopen = (e) ->
            log('onopen ' + e)
            ok(true)
            r.send(a[0])
        r.onmessage = (e) ->
            #log('onmessage ' + e);
            deepEqual(e.data, a[0])
            a.shift()
            if typeof a[0] is 'undefined'
                r.close()
            else
                r.send(a[0])
        r.onclose = (e) ->
            if a.length
                ok(false, "Transport closed prematurely.")
            else
                log('onclose ' + e)
                ok(true)
            start()

factor_echo_basic = (protocol) ->
    messages = [ 'data' ]
    return echo_factory_factory(protocol, messages)

factor_echo_rich = (protocol) ->
    messages = [ [1,2,3,'data'], null, "data", 1, 12.0, {a:1, b:2} ]
    return echo_factory_factory(protocol, messages)

factor_echo_unicode = (protocol) ->
    messages = [
        "Τη γλώσσα μου έδωσαν ελληνική το σπίτι φτωχικό στις αμμουδιές του ",
        "ღმერთსი შემვედრე, ნუთუ კვლა დამხსნას სოფლისა შრომასა, ცეცხლს, წყალს",
        "⠊⠀⠉⠁⠝⠀⠑⠁⠞⠀⠛⠇⠁⠎⠎⠀⠁⠝⠙⠀⠊⠞⠀⠙⠕⠑⠎⠝⠞⠀⠓⠥⠗⠞⠀⠍⠑",
        "Би шил идэй чадна, надад хортой биш",
        "을",
        "나는 유리를 먹을 수 있어요. 그래도 아프지 않아요",
        "ฉันกินกระจกได้ แต่มันไม่ทำให้ฉันเจ็บฉันกินกระจกได้ แต่มันไม่ทำให้ฉันเจ็บ",
        "Ég get etið gler án þess að meiða mig.",
        "Mogę jeść szkło, i mi nie szkodzi.",
        "\ufffd\u10102\u2f877",
    ]
    return echo_factory_factory(protocol, messages)

factor_echo_special_chars = (protocol) ->
    messages = [
        " ",
        "\u0000",
        "\xff",
        "\xff\x00",
        "\x00\xff",
        " \r ",
        " \n ",
        " \r\n ",
        "\r\n",
        "",
        "message\t",
        "\tmessage",
        "message ",
        " message",
        "message\r",
        "\rmessage",
        "message\n",
        "\nmessage",
        "message\xff",
        "\xffmessage",
        "A",
        "b",
        "c",
        "d",
        "e",
        "\ufffd",
        "\ufffd\u0000",
        "message\ufffd",
        "\ufffdmessage",
    ]
    return echo_factory_factory(protocol, messages)


factor_echo_large_message = (protocol) ->
    messages = [
        Array(4096).join('x'),
        Array(4096*2).join('x'),
        Array(4096*4).join('x'),
        Array(4096*8).join('x'),
    ]
    return echo_factory_factory(protocol, messages)


batch_factory_factory = (protocol, messages) ->
    return ->
        expect(3 + messages.length)
        r = newSockJS('/echo', protocol)
        ok(r)
        counter = 0
        r.onopen = (e) ->
            ok(true)
            for msg in messages
                r.send(msg)
        r.onmessage = (e) ->
            equals(e.data, messages[counter])
            counter += 1
            if counter is messages.length
                r.close()
        r.onclose = (e) ->
            ok(true)
            start()

factor_batch_large = (protocol) ->
    messages = [
        Array(Math.pow(2,1)).join('x'),
        Array(Math.pow(2,2)).join('x'),
        Array(Math.pow(2,4)).join('x'),
        Array(Math.pow(2,8)).join('x'),
        Array(Math.pow(2,16)).join('x'),
        Array(Math.pow(2,17)).join('x'),
        Array(Math.pow(2,18)).join('x'),
    ]
    return batch_factory_factory(protocol, messages)



factor_user_close = (protocol) ->
    return ->
        expect(4)
        r = newSockJS('/echo', protocol)
        ok(r)
        counter = 0
        r.onopen = (e) ->
            counter += 1
            ok(counter is 1)
            r.close(3000, "User message")
            ok(counter is 1)
        r.onmessage = () ->
            fail(true)
            counter += 1
        r.onclose = (e) ->
            counter += 1
            log('user_close ' + e.status + ' ' + e.reason)
            ok(counter is 2)
            start()

factor_server_close = (protocol) ->
    return ->
        expect(4)
        r = newSockJS('/close', protocol)
        ok(r)
        r.onopen = (e) ->
            ok(true)
        r.onmessage = (e) ->
            fail(true)
        r.onclose = (e) ->
            equals(e.status, 3000)
            equals(e.reason, "Go away!")
            start()

test_invalid_url_404 = (protocol) ->
    return ->
        expect(2)
        r = newSockJS('/invalid_url', protocol)
        ok(r)
        counter =
        r.onopen = (e) ->
            fail(true)
        r.onmessage = (e) ->
            fail(true)
        r.onclose = (e) ->
            log('404', e)
            equals(e.status, 2000)
            start()

test_invalid_url_500 = (protocol) ->
    return ->
        expect(2)
        r = newSockJS('/500_error', protocol)
        ok(r)
        r.onopen = (e) ->
            fail(true)
        r.onclose = (e) ->
            log('500', e)
            equals(e.status, 2000)
            start()

test_invalid_url_port = (protocol) ->
    return ->
        expect(2)
        dl = document.location
        r = newSockJS(dl.protocol + '//' + dl.hostname + ':1079', protocol)
        ok(r)
        r.onopen = (e) ->
            fail(true)
        r.onclose = (e) ->
            log('port', e)
            equals(e.status, 2000)
            start()


# IE doesn't do array.indexOf...
arrIndexOf = (arr, obj) ->
     for i in [0...arr.length]
         if arr[i] is obj
            return i
     return -1

test_protocol = (protocol) ->
    module(protocol)
    if not SockJS[protocol] or not SockJS[protocol].enabled(client_opts.sockjs_opts)
        test "[unsupported by client]", ->
                log('Unsupported protocol (by client): "' + protocol + '"')
    else if client_opts.disabled_transports and
          arrIndexOf(client_opts.disabled_transports, protocol) isnt -1
        test "[unsupported by server]", ->
                log('Unsupported protocol (by server): "' + protocol + '"')
    else
        asyncTest("echo1", factor_echo_basic(protocol))
        asyncTest("echo2", factor_echo_rich(protocol))
        asyncTest("unicode", factor_echo_unicode(protocol))
        asyncTest("special_chars", factor_echo_special_chars(protocol))
        asyncTest("large_message", factor_echo_large_message(protocol))
        asyncTest("batch_large", factor_batch_large(protocol))

        asyncTest("user close", factor_user_close(protocol))
        asyncTest("server close", factor_server_close(protocol))
        asyncTest("invalid url 404", test_invalid_url_404(protocol))
        asyncTest("invalid url 500", test_invalid_url_500(protocol))
        asyncTest("invalid url port", test_invalid_url_port(protocol))


protocols = ['websocket',
        'iframe-eventsource',
        'iframe-htmlfile',
        'xhr-polling',
        'iframe-xhr-polling',
        'jsonp-polling']
for protocol in protocols
    test_protocol(protocol)


module('other')

test "amending url", ->
    dl = document.location

    r = new SockJS('//blah:1/abc', [])
    equal(r._base_url, dl.protocol + '//blah:1/abc')

    r = new SockJS('/abc', [])
    equal(r._base_url, dl.protocol + '//' + dl.host + '/abc')

    r = new SockJS('http://a:1/abc', [])
    equal(r._base_url, 'http://a:1/abc')
