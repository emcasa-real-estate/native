const config = require('../jest.config.js')

module.exports = {
  ...config,
  testMatch: [`${__dirname}/**/*.spec.js`],
  setupFiles: ['jest-plugin-context/setup'],
  setupTestFrameworkScriptFile: `${__dirname}/setup.framework.js`
}
