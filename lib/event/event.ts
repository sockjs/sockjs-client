export class Event {
  timeStamp: number;

  constructor(public type: string,
              public bubbles?: boolean,
              public cancelable?: boolean) {
    this.timeStamp = +new Date();
  }

  stopPropagation() {
  };
  preventDefault() {
  };

  static CAPTURING_PHASE = 1;
  static AT_TARGET = 2;
  static BUBBLING_PHASE = 3;
}