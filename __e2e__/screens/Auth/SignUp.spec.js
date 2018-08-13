import * as select from './selectors'
import * as action from './interactions'

describe('auth/signUp', () => {
  beforeAll(action.navigateToSignUp)

  it('validates input data', async () => {
    await action.signUp({name: '', email: '', phone: '', password: ''})
    await expect(element(by.text('O nome é obrigatório'))).toBeVisible()
    await expect(element(by.text('O email é obrigatório'))).toBeVisible()
    await expect(element(by.text('A senha é obrigatória'))).toBeVisible()
  })

  it('redirects to a success page on success', async () => {
    await action.signUp({
      name: 'Test',
      email: 'test@example.com',
      phone: '2199996666',
      password: 'passwd'
    })
    await waitFor(element(select.signUpScreen()))
      .toBeNotVisible()
      .withTimeout(1000)
    await expect(element(select.successScreen())).toBeVisible()
  })
})
