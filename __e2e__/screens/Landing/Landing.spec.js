import * as select from './selectors'

describe('listings/results', () => {
  beforeAll(() => device.reloadReactNative())

  it('loads more listings on scroll', async () => {
    await waitFor(element(select.feed()))
      .toExist()
      .withTimeout(6000)
    await expect(element(select.nthCard(1))).toExist()
    await expect(element(select.nthCard(16))).toNotExist()
    await element(select.feed()).swipe('up', 'fast', 0.9)
    await waitFor(element(select.nthCard(16)))
      .toExist()
      .withTimeout(20000)
    await expect(element(select.nthCard(16))).toExist()
  })

  context('unauthenticated', () => {
    beforeAll(() => {})

    it('stores favorited listings', () => {})
  })
})
