import {login} from '../auth/interactions'
import {loginScreen} from '../auth/selectors'
import {addressScreen} from './selectors'
import * as actions from './interactions'

describe('listingForm', () => {
  beforeAll(actions.navigate)

  it('redirects to the login page', async () => {
    await expect(element(loginScreen())).toBeVisible()
  })

  it('redirects to new listing screen after user logs in', async () => {
    await login({email: 'test@example.com', password: 'passwd'})
    await expect(element(addressScreen())).toBeVisible()
  })

  require('./Address')
  require('./Properties')
})
