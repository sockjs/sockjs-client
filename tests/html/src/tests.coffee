protocols = ['websocket',
        'xhr-streaming',
        'iframe-eventsource',
        'iframe-htmlfile',
        'xhr-polling',
        'iframe-xhr-polling',
        'jsonp-polling']

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
                ok(false, "Transport closed prematurely. " + e)
            else
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
        """Начало музыкальной карьеры
Бритни пела в церковном хоре местной баптистской церкви. В возрасте 8-ми лет Спирс прошла аудирование для участия в шоу «Новый Клуб Микки-Мауса» на канале «Дисней». И хотя продюсеры решили, что Спирс слишком молода для участия в шоу, они представили её агенту в Нью-Йорке. Следующие 3 года Бритни училась в актёрской школе Professional Performing Arts School в Нью-Йорке и участвовала в нескольких постановках, в том числе «Ruthless!» 1991 года. В 1992 году Спирс участвовала в конкурсе Star Search, но проиграла во втором туре.
В 1993 году Спирс вернулась на канал «Дисней» и в течение 2-х лет участвовала в шоу «Новый Клуб Микки-Мауса». Другие будущие знаменитости, начинавшие с этого шоу — Кристина Агилера, участники 'N Sync Джастин Тимберлейк и Джейси Шазе, звезда сериала «Счастье» Кери Расселл и актёр фильма «Дневник памяти» Райан Гослинг.
В 1994 году шоу закрыли, Бритни вернулась домой в Луизиану, где поступила в среднюю школу. Некоторое время она пела в девичьей группе Innosense, но вскоре, решив начать сольную карьеру, записала демодиск, который попал в руки продюсерам из Jive Records, и те заключили с ней контракт.
Далее последовал тур по стране, выступления в супермаркетах и работа на разогреве у групп 'N Sync и Backstreet Boys.
[править]1999—2000: Ранний коммерческий успех
В октябре 1998 года вышел дебютный сингл Бритни Спирс «…Baby One More Time» . Песня имела огромный успех, в первые же недели возглавила международные чарты, мировые продажи сингла составили 9 миллионов копий, что сделало диск дважды платиновым. Альбом с одноимённым названием вышел в январе 1999 года. Альбом стартовал на первом месте рейтинга Billboard 200, пятьдесят одну неделю продержался в верхней десятке и шестьдесят недель в двадцати лучших. Альбом стал 15-кратным платиновым и на сегодняшний день является самым успешным альбомом Бритни Спирс.
В 1999 году Бритни снялась для апрельского номера журнала Rolling Stone. Откровенные фотографии спровоцировали слухи о том, что 17-летняя звезда сделала операцию по увеличению груди, что сама Спирс отрицала. Успех альбома и противоречивый образ Спирс, созданный массмедиа, сделали её главной звездой 1999 года.
Вслед за успешным дебютом последовал второй альбом певицы «Oops!... I Did It Again», также стартовавший на 1-м месте в США. Продажи за первую неделю составили 1 319 193 копии, что являлось абсолютным рекордом, который затем побил американский рэпер Эминем. Летом 2000 года Спирс отправилась в свой первый мировой тур, «Oops!… I Did It Again World Tour». В 2000 году Спирс получила две награды Billboards Music Awards и была номинирована на «Грэмми» в двух категориях — «Лучший поп-альбом» и «Лучшее живое выступление».
[править]2001—2003: Вершина карьеры


Исполняя «Me Against the Music»
Успех Спирс сделал её заметной фигурой и в музыкальной индустрии, и в поп-культуре. В начале 2001 года она привлекла внимание «Пепси», эта компания предложила ей многомиллионный контракт, включавший телевизионную рекламу и участие в промо-акциях.
В ноябре 2001 года вышел третий альбом Спирс — Britney. Альбом дебютировал на первом месте в США с продажами в 745 744 пластинок за первую неделю, что сделало Бритни первой в истории исполнительницей, чьи первые три альбома стартовали на вершине рейтинга. Сразу же после выхода альбома Спирс отправилась в тур Dream Within a Dream Tour, по окончании которого объявила, что хочет взять 6-месячный перерыв в карьере.
В этом же году Спирс рассталась с солистом 'N Sync Джастином Тимберлейком, с которым встречалась 4 года.
Бритни вернулась на сцену в августе 2003 года.
В ноябре 2003 года вышел четвёртый студийный альбом Спирс In The Zone. Бритни участвовала в написании восьми из тринадцати композиций, а также выступила в качестве продюсера альбома. In The Zone дебютировал на первом месте в США, что сделало Бритни первой в истории исполнительницей, чьи первые четыре альбома стартовали на вершине рейтинга. Самый успешный сингл с альбома — Toxic — принёс Бритни первую для неё награду Грэмми в категории «Лучшая танцевальная композиция».
[править]2007—2008: Возвращение к музыке
В начале 2007 года после двухлетнего перерыва Спирс приступила к записи нового сольного альбома, продюсерами которого выступили Nate «Danja» Hills, Шон Гарретт и Джонатан Ротэм.
В мае 2007 года Спирс в составе коллектива «The M and M’s» дала 6 концертов в рамках тура «House of Blues» в Лос-Анджелесе, Сан-Диего, Анахайме, Лас-Вегасе, Орландо и Майами. Каждый концерт длился около 15 минут и включал 5 старых хитов певицы.[4]
30 августа 2007 года на волнах нью-йоркской радиостанции Z100 состоялась премьера песни «Gimme More», первого сингла с нового альбома Спирс.[5] Сингл вышел на iTunes 24 сентября и на CD 29 октября 2007.
9 сентября 2007 года Спирс исполнила «Gimme More» на церемонии вручения наград MTV Video Music Awards. Выступление оказалось неудачным; Спирс выглядела непрофессионально — не всегда попадала в фонограмму и в танце отставала от группы хореографической поддержки.[6]
Несмотря на это, в начале октября 2007 года сингл «Gimme More» достиг 3-го места в чарте Billboard Hot 100, став таким образом одним из самых успешных синглов Спирс.[7]""",
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
    # Should be larger than 128k - the limit for a single request in
    # some streaming transports.
    messages = [
        Array(Math.pow(2,1)).join('x'),
        Array(Math.pow(2,2)).join('x'),
        Array(Math.pow(2,4)).join('x'),
        Array(Math.pow(2,8)).join('x'),
        Array(Math.pow(2,13)).join('x'),
        Array(Math.pow(2,13)).join('x'),
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
            if counter isnt messages.length
                ok(false, "Transport closed prematurely. " + e)
            else
                ok(true)
            start()

factor_batch_large = (protocol) ->
    messages = [
        Array(Math.pow(2,1)).join('x'),
        Array(Math.pow(2,2)).join('x'),
        Array(Math.pow(2,4)).join('x'),
        Array(Math.pow(2,8)).join('x'),
        Array(Math.pow(2,13)).join('x'),
        Array(Math.pow(2,13)).join('x'),
    ]
    return batch_factory_factory(protocol, messages)


batch_factory_factory_amp = (protocol, messages) ->
    return ->
        expect(3 + messages.length)
        r = newSockJS('/amplify', protocol)
        ok(r)
        counter = 0
        r.onopen = (e) ->
            ok(true)
            for msg in messages
                r.send(''+msg)
        r.onmessage = (e) ->
            equals(e.data.length, Math.pow(2, messages[counter]), e.data)
            counter += 1
            if counter is messages.length
                r.close()
        r.onclose = (e) ->
            if counter isnt messages.length
                ok(false, "Transport closed prematurely. " + e)
            else
                ok(true)
            start()

factor_batch_large_amp = (protocol) ->
    messages = [
        1,
        2,
        4,
        8,
        13,
        15,
        15,
    ]
    return batch_factory_factory_amp(protocol, messages)



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

test_protocol_messages = (protocol) ->
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
        asyncTest("large message (ping-pong)",
            factor_echo_large_message(protocol))
        asyncTest("large message (batch)", factor_batch_large(protocol))
        asyncTest("large download", factor_batch_large_amp(protocol))

        asyncTest("user close", factor_user_close(protocol))
        asyncTest("server close", factor_server_close(protocol))

test_protocol_errors = (protocol) ->
    module(protocol)
    if not SockJS[protocol] or not SockJS[protocol].enabled(client_opts.sockjs_opts)
        test "[unsupported by client]", ->
                log('Unsupported protocol (by client): "' + protocol + '"')
    else if client_opts.disabled_transports and
          arrIndexOf(client_opts.disabled_transports, protocol) isnt -1
        test "[unsupported by server]", ->
                log('Unsupported protocol (by server): "' + protocol + '"')
    else
        asyncTest("invalid url 404", test_invalid_url_404(protocol))
        asyncTest("invalid url 500", test_invalid_url_500(protocol))
        asyncTest("invalid url port", test_invalid_url_port(protocol))


for protocol in protocols
    test_protocol_messages(protocol)


module('other')

test "amending url", ->
    dl = document.location

    r = new SockJS('//blah:1/abc', [])
    equal(r._base_url, dl.protocol + '//blah:1/abc')

    r = new SockJS('/abc', [])
    equal(r._base_url, dl.protocol + '//' + dl.host + '/abc')

    r = new SockJS('http://a:1/abc', [])
    equal(r._base_url, 'http://a:1/abc')

    r = new SockJS('http://a:1/abc/', [])
    equal(r._base_url, 'http://a:1/abc')

    r = new SockJS('http://a:1/abc//', [])
    equal(r._base_url, 'http://a:1/abc')


test "EventEmitter", ->
    expect(4)
    r = new SockJS('//blah/abc', [])
    r.addEventListener 'message', -> ok(true)
    r.onmessage = -> fail(true)
    bluff = -> fail(true)
    r.addEventListener 'message', bluff
    r.removeEventListener 'message', bluff
    r.addEventListener 'message', bluff
    r.addEventListener 'message', -> ok(true)
    r.onmessage = -> ok(true)
    r.removeEventListener 'message', bluff
    r.dispatchEvent({type:'message'})

    # Adding the same eventlistener should be indempotent (sockjs-client #4).
    single = -> ok(true)
    r.addEventListener 'close', single
    r.addEventListener 'close', single
    r.dispatchEvent({type:'close'}) # 1 callback run
    r.removeEventListener 'close', single
    r.dispatchEvent({type:'close'}) # 0 runs


chunking_test_factory = (counter) ->
    return ->
        expect(counter)
        a = new Array(counter)
        go = ->
            SockJS.chunkingTest client_opts.url + '/echo', (r) ->
                if $.browser.msie and $.browser.version < 8
                    # on browsers with no streaming support...
                    equal(r, false)
                else
                    equal(r, true)
                a.shift()
                if a.length isnt 0
                    go()
                else
                    start()
        go()

asyncTest "chunking test (simple)", chunking_test_factory(1)
asyncTest "chunking test (stability)", chunking_test_factory(25)



asyncTest "chunking test, invalid url 404", ->
        expect(1)
        SockJS.chunkingTest client_opts.url + '/invalid_url', (r) ->
            equal(r, false)
            start()

asyncTest "chunking test, invalid url 500", ->
        expect(1)
        SockJS.chunkingTest client_opts.url + '/500_error', (r) ->
            equal(r, false)
            start()

asyncTest "chunking test, invalid url port", ->
        expect(1)
        dl = document.location
        SockJS.chunkingTest dl.protocol + '//' + dl.hostname + ':1079', (r) ->
            equal(r, false)
            start()


for protocol in protocols
    test_protocol_errors(protocol)
