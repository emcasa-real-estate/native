const config = require('../jest.config.js')

module.exports = {
  ...config,
  transform: {
    '^.+\\.js$': 'react-native/jest/preprocessor.js'
  },
  testMatch: [`${__dirname}/**/*.spec.js`],
  setupFiles: ['./__test__/setup.js', 'jest-plugin-context/setup'],
  setupTestFrameworkScriptFile: './__test__/setup.framework.js'
}
