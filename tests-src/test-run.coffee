
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


for protocol in ['ws', 'jsonp']
    test_protocol(protocol)
