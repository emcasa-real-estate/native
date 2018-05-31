import * as select from './selectors'
import * as action from './interactions'

describe('auth/login', () => {
  beforeAll(action.navigate)
  it('validates input data', async () => {
    await action.login('foo', '')
    await expect(element(by.text('Este email é inválido'))).toBeVisible()
    await expect(element(by.text('A senha é obrigatória'))).toBeVisible()
  })
  it('show an error message on failure', async () => {
    await expect(element(select.passwordResetButton())).toExist()
    await expect(element(select.signUpButton())).toExist()
  })
})
