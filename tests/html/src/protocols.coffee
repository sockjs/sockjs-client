protocols = ['websocket',
        'xdr-streaming',
        'xhr-streaming',
        'iframe-eventsource',
        'iframe-htmlfile',
        'xdr-polling',
        'xhr-polling',
        'iframe-xhr-polling',
        'jsonp-polling']

for protocol in protocols
    test_protocol_messages(protocol)