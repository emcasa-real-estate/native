import {login} from '../auth/interactions'
import {loginScreen} from '../auth/selectors'
import {addressScreen} from './selectors'
import {backButton} from '../shared/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listingForm', () => {
  beforeAll(actions.navigate)

    it('redirects to a modal within the login page', async () => {
      await expect(element(select.learnMoreScreen())).toBeVisible()
      await element(by.id('close_modal_button')).tap()
      await waitFor(element(select.learnMoreScreen())).toBeNotVisible()
      await expect(element(loginScreen())).toBeVisible()
      await element(backButton()).tap()
  })

  it('redirects to new listing screen after user logs in', async () => {
    await login({ email: 'test@example.com', password: 'passwd' })
    await expect(element(addressScreen())).toBeVisible()
  })

  require('./Address')
  require('./Properties')
})
