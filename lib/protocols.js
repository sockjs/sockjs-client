'use strict';

var protocolOrdering = [
  'websocket',
  'xdr-streaming',
  'xhr-streaming',
  'iframe-eventsource',
  'iframe-htmlfile',
  'xdr-polling',
  'xhr-polling',
  'iframe-xhr-polling',
  'jsonp-polling'
];

var allProtocols = {
  'websocket': require('./trans-websocket')
, 'iframe-eventsource': require('./trans-iframe-eventsource')
, 'iframe-htmlfile': require('./trans-iframe-htmlfile')
, 'iframe-xhr-polling': require('./trans-iframe-xhr-polling')
, 'jsonp-polling': require('./trans-jsonp-polling')
, 'xdr-polling': require('./trans-xdr-polling')
, 'xdr-streaming': require('./trans-xdr-streaming')
, 'xhr-polling': require('./trans-xhr-polling')
, 'xhr-streaming': require('./trans-xhr-streaming')
};

module.exports = function (url, protocols_whitelist, info) {
  var protocols = [];
  if (!protocols_whitelist) protocols_whitelist = [];
  if (!protocols_whitelist.length) protocols_whitelist = protocolOrdering;

  for (var i = 0; i < protocolOrdering.length; i++) {
    var protoName = protocolOrdering[i];
    if (protocols_whitelist.indexOf(protoName) === -1) continue;

    var proto = allProtocols[protoName];
    if (proto && proto.enabled(url, info)) protocols.push(proto);
  }
  return protocols;
};