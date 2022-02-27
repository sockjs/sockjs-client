import Event from './event.js';

class TransportMessageEvent extends Event {
  constructor(data) {
    super('message');
    this.initEvent(false, false);
    this.data = data;
  }
}

export default TransportMessageEvent;
