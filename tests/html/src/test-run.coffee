
test_protocol = (protocol) ->
    module(protocol)
    if not SockJS[protocol] or not SockJS[protocol].enabled()
        test "[unsupported]", ->
                log('Unsupported protocol: "' + protocol + '"')
    else
        asyncTest("echo", factor_echo_basic(protocol))
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
        'xhr-polling',
        'iframe-xhr-polling',
        'jsonp-polling']
for protocol in protocols
    test_protocol(protocol)
