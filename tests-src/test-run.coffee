
test_protocol = (protocol) ->
    module(protocol)
    if not SockJS[protocol].enabled()
        test "[unsupported]", ->
                log('Unsupported protocol: "' + protocol + '"')
    else
        asyncTest("echo", factor_echo_basic(protocol))
        asyncTest("unicode", factor_echo_unicode(protocol))
        asyncTest("special_chars", factor_echo_special_chars(protocol))
        asyncTest("large_message", factor_echo_large_message(protocol))
        asyncTest("batch_large", factor_batch_large(protocol))

        asyncTest("user close", factor_user_close(protocol))
        asyncTest("server close", factor_server_close(protocol))
        asyncTest("invalid url 404", test_invalid_url_404(protocol))
        asyncTest("invalid url 500", test_invalid_url_500(protocol))
        asyncTest("invalid url port", test_invalid_url_port(protocol))


for protocol in ['ws', 'jsonp', 'iframe-eventsource']
    test_protocol(protocol)
