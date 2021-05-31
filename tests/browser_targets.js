module.exports = {
  bs_chrome_windows: {
    base: 'BrowserStack',
    browser: 'chrome',
    os: 'Windows',
    os_version: '10',
  },
  bs_edge_windows: {
    base: 'BrowserStack',
    browser: 'edge',
    os: 'Windows',
    os_version: '10',
  },
  bs_firefox_windows: {
    base: 'BrowserStack',
    browser: 'firefox',
    os: 'Windows',
    os_version: '10',
  },
  bs_safari_11_mac: {
    base: 'BrowserStack',
    browser: 'safari',
    os: 'OS X',
    os_version: 'Catalina',
  },
  bs_ios_14: {
    base: 'BrowserStack',
    os: 'ios',
    os_version: '14',
    device: 'iPhone 11',
    real_mobile: true,
  },
  bs_android_11: {
    base: 'BrowserStack',
    os: 'android',
    os_version: '11.0',
    device: 'Google Pixel 5',
    real_mobile: true,
  },
};
