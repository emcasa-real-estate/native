const config = require('../../jest.config.js')

module.exports = {
  ...config,
  testMatch: [`${__dirname}/**/*.spec.js`],
  setupTestFrameworkScriptFile: `${__dirname}/setup.js`
}
