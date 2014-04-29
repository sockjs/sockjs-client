transports = ['websocket',
        'xdr-streaming',
        'xhr-streaming',
        'iframe-eventsource',
        'iframe-htmlfile',
        'xdr-polling',
        'xhr-polling',
        'iframe-xhr-polling',
        'jsonp-polling']

for transport in transports
    test_protocol_messages(transport)