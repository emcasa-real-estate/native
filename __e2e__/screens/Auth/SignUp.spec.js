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

  it('show an error when the email is already in use', async () => {
    await action.signUp({
      name: 'Test',
      email: 'foo@example.com',
      phone: '',
      password: 'passwd'
    })
    await expect(element(by.text('Esse e-mail já está em uso'))).toBeVisible()
  })

  it('redirects to a success page on success', async () => {
    await action.signUp({
      name: 'Test',
      email: 'test@emcasa.com',
      phone: '',
      password: 'passwd'
    })
    await waitFor(element(select.signUpScreen()))
      .toBeNotVisible()
      .withTimeout(1000)
    await expect(element(select.successScreen())).toBeVisible()
  })
})