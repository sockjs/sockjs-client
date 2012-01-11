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

            var sock = new SockJS('""" + url + """', '""" + protocol + """');
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

module('sockjs in head')
body_protocols = ['iframe-eventsource',
            'iframe-htmlfile',
            'iframe-xhr-polling',
            'jsonp-polling']
for protocol in body_protocols
    factory_body_check(protocol)