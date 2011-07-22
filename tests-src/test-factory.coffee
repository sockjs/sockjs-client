debug = false

echo_factory_factory = (protocol, messages, name) ->
    return ->
        expect(3 + messages.length)
        a = messages.slice(0)
        r = new SockJS(test_server_url + '/echo', [protocol])
        ok(r)
        r.onopen = (e) ->
            if debug
                log(name+'_'+protocol+'_open', e)
            ok(true)
            r.send(a[0])
        r.onmessage = (e) ->
            if debug
                log(name+'_'+protocol+'_msg', e.data + ' ' + a[0])
            equals(e.data, a[0])
            a.shift()
            if typeof a[0] is 'undefined'
                r.close()
            else
                r.send(a[0])
        r.onclose = (e) ->
            if debug
                log(name+'_'+protocol+'_close', e)
            ok(true)
            start()

factor_echo_basic = (protocol) ->
    messages = ['data']
    return echo_factory_factory(protocol, messages, 'echo_basic')

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
    return echo_factory_factory(protocol, messages, 'echo_unicode')

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
        "\ufffd",
        "\ufffd\u0000",
        "message\ufffd",
        "\ufffdmessage",
    ]
    return echo_factory_factory(protocol, messages, 'echo_unicode')


factor_echo_large_message = (protocol) ->
    messages = [
        Array(4096).join('x'),
        Array(4096*2).join('x'),
        Array(4096*4).join('x'),
        Array(4096*8).join('x'),
    ]
    return echo_factory_factory(protocol, messages, 'large_message')


batch_factory_factory = (protocol, messages, name) ->
    return ->
        expect(3 + messages.length)
        r = new SockJS(test_server_url + '/echo', [protocol])
        ok(r)
        counter = 0
        r.onopen = (e) ->
            if debug
                log(name+'_'+protocol+'_open', e)
            ok(true)
            for msg in messages
                r.send(msg)
        r.onmessage = (e) ->
            if debug
                log(name+'_'+protocol+'_msg', e.data + ' ' + messages[counter])
            equals(e.data, messages[counter])
            counter += 1
            if counter is messages.length
                r.close()
        r.onclose = (e) ->
            if debug
                log(name+'_'+protocol+'_close', e)
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
    return batch_factory_factory(protocol, messages, 'batch_large')
