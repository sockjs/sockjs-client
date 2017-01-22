import inherits from 'inherits';
import Event from './event';

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

export default TransportMessageEvent;
