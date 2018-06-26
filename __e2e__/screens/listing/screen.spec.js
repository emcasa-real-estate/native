import * as shared from '../shared/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listing', () => {
  beforeAll(actions.navigate)

  it('displays a webview in the thumbnail', async () => {
    await expect(element(select.thumbnail())).toBeVisible()
    await expect(
      element(by.type('RCTWebView').withAncestor(select.thumbnail()))
    ).toBeVisible()
  })

  it('opens the 3d tour modal', async () => {
    await element(select.tourButton()).tap()
    await waitFor(element(select.listingScreen())).toBeNotVisible()
    await expect(element(select.tourScreen())).toBeVisible()
    await expect(
      element(by.type('RCTWebView').withAncestor(select.tourScreen()))
    ).toExist()
    await element(shared.modalCloseButton()).tap()
    await waitFor(element(select.tourScreen())).toBeNotVisible()
    await expect(element(select.tourScreen())).toBeNotVisible()
  })

  it('opens the gallery modal', async () => {
    await element(select.galleryButton()).tap()
    await waitFor(element(select.listingScreen())).toBeNotVisible()
    await expect(element(select.galleryScreen())).toBeVisible()
    await element(shared.modalCloseButton()).tap()
    await waitFor(element(select.galleryScreen())).toBeNotVisible()
    await expect(element(select.galleryScreen())).toBeNotVisible()
  })
})
