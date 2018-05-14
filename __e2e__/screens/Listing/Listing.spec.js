import * as select from './selectors'
import navigate from './navigate'

describe('listing', () => {
  beforeAll(navigate)

  it('lands on a listing view', async () => {
    await expect(element(select.listing())).toBeVisible()
  })

  it('displays a matterport webview', async () => {
    await expect(element(select.thumbnailWebView())).toExist()
  })
})
