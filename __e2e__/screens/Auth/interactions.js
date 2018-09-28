import * as select from './selectors'
import * as shared from '../shared/selectors'

export async function navigateToLogin() {
  await waitFor(element(shared.bottomTabs()))
    .toBeVisible()
    .withTimeout(12000)
  await element(shared.bottomTabButton('Login')).tap()
  await waitFor(element(select.loginScreen()))
    .toBeVisible()
    .withTimeout(5000)
}

export async function login() {
  await element(select.loginButton()).tap()
}
