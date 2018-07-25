import {navigateToLogin, login} from '../auth/interactions'
import {loginScreen} from '../auth/selectors'
import {backButton} from '../shared/selectors'
import * as select from './selectors'
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

    it('opens a modal on mount', async () => {
      await waitFor(element(select.addressScreen())).toBeNotVisible()
      await expect(element(select.learnMoreScreen())).toBeVisible()
      await element(by.id('close_modal_button')).tap()
      await waitFor(element(select.addressScreen())).toBeVisible()
    })

    require('./Address')
    require('./Properties')
  })
})
