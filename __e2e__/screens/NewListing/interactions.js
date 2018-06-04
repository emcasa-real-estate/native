import * as select from './selectors'

export async function navigate() {
  await waitFor(element(by.id('@shared.Shell.Navigation')))
    .toBeVisible()
    .withTimeout(2000)
  await element(select.navButton()).tap()
  await waitFor(element(select.addressScreen())).toBeVisible()
}

export async function blurInputs(screen) {
  await element(screen).tapAtPoint({x: 100, y: 50})
}

export async function submitEditing(input) {
  await element(input).typeText('\n')
}

export async function selectNthAutoCompleteOption(n) {
  await element(select.autoCompleteOptions())
    .atIndex(n)
    .tap()
}

export async function insertAddress(text) {
  await element(select.autoCompleteInput()).tap()
  await element(select.autoCompleteInput()).replaceText(text)
}
