import * as select from './selectors'
import navigate from './navigate'

describe('listing', () => {
  beforeAll(navigate)

  it('displays a webview', async () => {
    await expect(element(select.header())).toBeVisible()
    await expect(element(select.headerWebView())).toBeVisible()
  })

  it('opens a webview modal', async () => {
    await element(select.tourButton()).tap()
    await waitFor(element(select.modal())).toBeVisible()
    await expect(element(select.modalWebView()))
  })
})
