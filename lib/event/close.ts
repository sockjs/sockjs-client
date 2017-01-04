import {Event} from './event';

export class CloseEvent extends Event {
  wasClean: boolean;
  code: number;
  reason: string;

  constructor() {
    super('close', false, false);
    this.wasClean = false;
    this.code = 0;
    this.reason = '';
  }
}
