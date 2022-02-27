import Event from './event.js';

class CloseEvent extends Event {
  constructor() {
    super('close');
    this.initEvent(false, false);
    this.wasClean = false;
    this.code = 0;
    this.reason = '';
  }
}

export default CloseEvent;
