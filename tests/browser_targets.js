module.exports = {
  chrome_windows: {
    base: 'BrowserStack',
    browser: 'chrome',
    os: 'Windows',
    os_version: '10',
  },
  edge_windows: {
    base: 'BrowserStack',
    browser: 'edge',
    os: 'Windows',
    os_version: '10',
  },
  firefox_windows: {
    base: 'BrowserStack',
    browser: 'firefox',
    os: 'Windows',
    os_version: '10',
  },
  safari_14_mac: {
    base: 'BrowserStack',
    browser: 'safari',
    os: 'OS X',
    os_version: 'Big Sur',
  },
  ios_14: {
    base: 'BrowserStack',
    os: 'ios',
    os_version: '14',
    device: 'iPhone 11',
    real_mobile: true,
  },
  android_11: {
    base: 'BrowserStack',
    os: 'android',
    os_version: '11.0',
    device: 'Google Pixel 5',
    real_mobile: true,
  },
};
