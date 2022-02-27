const logObject = {};
for (const level of ['log', 'debug', 'warn']) {
  let levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch {
    // Do nothing
  }

  logObject[level] = levelExists ? function (...args) {
    return global.console[level](...args);
  } : (level === 'log' ? function () {} : logObject.log);
}

export default logObject;
