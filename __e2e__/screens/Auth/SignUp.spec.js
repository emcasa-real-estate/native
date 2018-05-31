import * as landing from '../Landing/selectors'
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
})
