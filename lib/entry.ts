import {transportList} from './transport-list';
import {main} from './main';

export = main(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout((<any>global)._sockjs_onload, 1);
}
