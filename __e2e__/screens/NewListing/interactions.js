import * as select from './selectors'

export async function navigate() {
  await waitFor(element(by.id('@shared.Shell.Navigation')))
    .toBeVisible()
    .withTimeout(2000)
  await element(select.navButton()).tap()
  await waitFor(element(select.addressScreen())).toBeVisible()
}

export async function insertAddress(text) {
  await element(select.input('Endereço')).tap()
}
