import debugModule from 'debug';
import process from 'node:process';

export default function debug(ctx) {
  if (process.env.NODE_ENV !== 'production') {
    return debugModule(ctx);
  }

  return function () {};
}
