import * as listings from '../listings/selectors'
import * as select from './selectors'
import * as action from './interactions'

describe('auth.Login', () => {
  beforeAll(action.navigateToLogin)

  it('validates input data', async () => {
    await action.login({email: 'test', password: ''})
    await expect(element(by.text('Este email é inválido'))).toBeVisible()
    await expect(element(by.text('A senha é obrigatória'))).toBeVisible()
  })

  it('shows an error message on failure', async () => {
    await action.login({email: 'foo@example.com', password: 'wrong_password'})
    await expect(element(by.text('Senha ou email inválidos'))).toBeVisible()
  })

  it('redirects to the main screen on success', async () => {
    await action.login({email: 'foo@example.com', password: 'password'})
    await waitFor(element(select.loginScreen()))
      .toBeNotVisible()
      .withTimeout(1000)
    await expect(element(listings.feedScreen())).toBeVisible()
  })
})
