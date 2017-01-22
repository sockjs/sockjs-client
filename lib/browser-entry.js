import './shims';

import transportList from './browser-transport-list';
import main from './main';

export default main(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}
