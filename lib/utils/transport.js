import debugFunc from './utils/debug.js';

const debug = debugFunc('sockjs-client:utils:transport');

export default function transportFunc(availableTransports) {
  return {
    filterToEnabled(transportsInclude, info) {
      const transports = {
        main: [],
        facade: [],
      };
      if (!transportsInclude) {
        transportsInclude = [];
      } else if (typeof transportsInclude === 'string') {
        transportsInclude = [transportsInclude];
      }

      for (const trans of availableTransports) {
        if (!trans) {
          continue;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          continue;
        }

        if (transportsInclude.length > 0
            && !transportsInclude.includes(trans.transportName)) {
          debug('not in whitelist', trans.transportName);
          continue;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      }

      return transports;
    },
  };
}
