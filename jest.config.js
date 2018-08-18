module.exports = {
  rootDir: __dirname,
  preset: 'react-native',
  automock: false,
  transform: {
    '^.+\\.js$': 'react-native/jest/preprocessor.js'
  },
  unmockedModulePathPatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/(?!(jest-)?react-native)/'],
  modulePathIgnorePatterns: ['/src/redux/__mocks__', '/src/graphql/__mocks__']
}
