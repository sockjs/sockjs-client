class Event {
  constructor(eventType) {
    this.type = eventType;
  }

  static CAPTURING_PHASE = 1;
  static AT_TARGET = 2;
  static BUBBLING_PHASE = 3;

  initEvent(canBubble, cancelable) {
    this.bubbles = canBubble;
    this.cancelable = cancelable;
    this.timeStamp = Date.now();
    return this;
  }

  stopPropagation() {}
  preventDefault() {}
}

export default Event;
