import * as selectors from './selectors'

export async function navigate() {
  await element(selectors.navButton()).tap()
  await waitFor(element(selectors.loginScreen())).toBeVisible()
}

export async function login(username, password) {}
