'use strict';

import {Event} from './event';

export class TransportMessageEvent extends Event {
  constructor(public data: string) {
    super('message', false, false);
  }
}