module.exports = {
  rootDir: __dirname,
  preset: 'react-native',
  automock: false,
  unmockedModulePathPatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(jest-)?react-native|react-navigation)/'
  ],
  modulePathIgnorePatterns: ['/redux/__mocks__', '/lib/graphql/__mocks__']
}
