const config = require('../jest.config.js')

module.exports = {
  ...config,
  testMatch: [`${__dirname}/**/*.spec.js`],
  setupFiles: ['./__test__/setup.js', 'jest-plugin-context/setup'],
  setupTestFrameworkScriptFile: './__test__/setup.framework.js'
}
