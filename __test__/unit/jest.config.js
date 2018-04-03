const config = require('../../jest.config.js')

module.exports = {
  ...config,
  testMatch: [`${__dirname}/**/*.spec.js`],
  setupTestFrameworkScriptFile: './__test__/setup.framework.js'
}
