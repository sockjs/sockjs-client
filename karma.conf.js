if (!process.env.BROWSERSTACK_LOCAL_IDENTIFIER) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
}

var testServer = require('./tests/support/sockjs_server');
var targets = require('./tests/browser_targets');

var port = 9889;
var SockFrameworkFactory = function (config, logger) {
  var log = logger.create('sockjs.server');
  log.info('Starting sockjs test server...');
  testServer(port, config, '/sockjs-test');
};

module.exports = function (config) {
  config.set({
    // necessary to have karma proxy websockets correctly
    urlRoot: '/karma/',
    client: {
      useIframe: false,
      runInParent: true,
    },

    plugins: [
      { 'framework:sock': ['factory', SockFrameworkFactory] },
      'karma-*',
    ],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['sock', 'mocha', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'tests/support/domain.js', watched: false, nocache: true },
      { pattern: 'tests/browser.js', watched: false },
    ],

    // list of files / patterns to exclude
    exclude: [],

    proxies: {
      '/sockjs-test/': 'http://localhost:' + port + '/',
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/browser.js': ['browserify'],
    },

    browserify: {
      debug: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'summary', 'BrowserStack'],
    summaryReporter: {
      show: 'failed',
      overviewColumn: true,
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(targets),

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,

    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      forcelocal: true,
      video: false,
      project: 'sockjs-client',
      startTunnel: !process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
      localIdentifer: process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
      build: process.env.BROWSERSTACK_BUILD_NAME,
    },

    captureTimeout: 3e5,
    browserDisconnectTolerance: 0,
    browserDisconnectTimeout: 3e5,
    browserSocketTimeout: 1.2e5,
    browserNoActivityTimeout: 3e5,

    customLaunchers: targets,
  });
};
