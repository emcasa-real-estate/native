import {navigateToLogin, login} from '../auth/interactions'
import {loginScreen} from '../auth/selectors'
import {backButton} from '../shared/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listingForm', () => {
  context('unauthenticated', () => {
    beforeAll(actions.navigate)

    it('redirects to a modal within the login page', async () => {
      await expect(element(select.learnMoreScreen())).toBeVisible()
      await element(by.id('close_modal_button')).tap()
      await waitFor(element(select.learnMoreScreen())).toBeNotVisible()
      await expect(element(loginScreen())).toBeVisible()
      await element(backButton()).tap()
    })
  })

  context('authenticated', () => {
    beforeAll(async () => {
      await navigateToLogin()
      await login({email: 'foo@example.com', password: 'password'})
      await actions.navigate()
    })

    require('./Address')
    require('./Properties')
  })
})
