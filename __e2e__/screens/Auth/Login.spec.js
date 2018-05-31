import * as select from './selectors'
import * as action from './interactions'

describe('auth', () => {
  beforeAll(action.navigate)
  it('', async () => {
    await expect(element(select.passwordResetButton())).toExist()
    await expect(element(select.signUpButton())).toExist()
  })
})
