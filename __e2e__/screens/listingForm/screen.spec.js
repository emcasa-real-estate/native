import {navigateToLogin, login} from '../auth/interactions'
import {loginScreen} from '../auth/selectors'
import {backButton} from '../shared/selectors'
import * as actions from './interactions'

describe('listingForm', () => {
  context('unauthenticated', () => {
    beforeAll(actions.navigate)

    it('redirects to the login page', async () => {
      await expect(element(loginScreen())).toBeVisible()
      await element(backButton()).tap()
    })
  })

  context('authenticated', () => {
    //beforeAll(async () => device.reloadReactNative())
    beforeAll(async () => {
      await navigateToLogin()
      await login({email: 'test@example.com', password: 'passwd'})
      await actions.navigate()
    })
    require('./Address')
    require('./Properties')
  })
})
