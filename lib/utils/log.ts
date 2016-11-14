var logObject: any = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = (<any>global).console && (<any>global).console[level] && (<any>global).console[level].apply;
  } catch (e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return (<any>global).console[level].apply((<any>global).console, arguments);
  } : (level === 'log' ? function () {
  } : logObject.log);
});

export = logObject;
