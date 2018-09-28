export default {
  configure() {},
  loginWithPhone() {
    return Promise.resolve({token: 'test'})
  }
}
