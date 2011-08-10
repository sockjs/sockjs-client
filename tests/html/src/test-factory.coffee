echo_factory_factory = (protocol, messages) ->
    return ->
        expect(2 + messages.length)
        a = messages.slice(0)
        r = new SockJS(sockjs_url + '/echo', [protocol])
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
        r = new SockJS(sockjs_url + '/echo', [protocol])
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
        r = new SockJS(sockjs_url + '/echo', [protocol])
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
        r = new SockJS(sockjs_url + '/close', [protocol])
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
        r = new SockJS(sockjs_url + '/invalid_url', [protocol])
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
        r = new SockJS(sockjs_url + '/500_error', [protocol])
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
        r = new SockJS("http://127.0.0.1:1079", [protocol])
        ok(r)
        r.onopen = (e) ->
            fail(true)
        r.onclose = (e) ->
            log('port', e)
            equals(e.status, 2000)
            start()
