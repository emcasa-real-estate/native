import * as select from './selectors'
import * as action from './interactions'

describe('auth/login', () => {
  beforeAll(action.navigate)
  it('validates input data', async () => {
    await action.login('test', '')
    await expect(element(by.text('Este email é inválido'))).toBeVisible()
    await expect(element(by.text('A senha é obrigatória'))).toBeVisible()
  })

  it('shows an error message on failure', async () => {
    await action.login('test@example.com', 'wrong_password')
    await expect(element(by.text('Senha ou email inválidos'))).toExist()
  })
})
