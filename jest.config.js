module.exports = {
  rootDir: __dirname,
  preset: 'react-native',
  automock: false,
  unmockedModulePathPatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/(?!(jest-)?react-native)/'],
  modulePathIgnorePatterns: ['/redux/__mocks__', '/graphql/__mocks__']
}
