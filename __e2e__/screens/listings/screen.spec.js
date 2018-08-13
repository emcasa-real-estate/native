import * as select from './selectors'

describe('listings/results', () => {
  beforeAll(async () => {
    await waitFor(element(select.feed())).toBeVisible()
  })

  it('loads more listings on scroll', async () => {
    await expect(element(select.nthCard(1))).toExist()
    await expect(element(select.nthCard(16))).toNotExist()
    await element(select.feed()).swipe('up', 'fast', 0.8)
    await element(select.feed()).swipe('up', 'fast', 0.8)
    await waitFor(element(select.nthCard(16)))
      .toExist()
      .withTimeout(5000)
    await expect(element(select.nthCard(16))).toExist()
  })

  context('favorites', () => {
    beforeAll(() => device.reloadReactNative())
    beforeEach(() => element(select.feed()).swipe('down', 'fast', 0.5))

    const iterations = 3

    it('saves client-side favorited listings', async () => {
      for (let i = 1; i <= iterations; ++i) {
        const likeButton = element(select.nthLikeButton(i))
        await expect(likeButton).toBeVisible()
        await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
        await likeButton.tap()
        await expect(likeButton).toHaveLabel('Remover dos favoritos')
        await element(select.feed()).scroll(310, 'down')
      }
    })

    it('removes client-side favorited listings', async () => {
      for (let i = 1; i <= iterations; ++i) {
        const likeButton = element(select.nthLikeButton(i))
        await expect(likeButton).toBeVisible()
        await expect(likeButton).toHaveLabel('Remover dos favoritos')
        await likeButton.multiTap(2)
        await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
        await element(select.feed()).scroll(310, 'down')
      }
    })
  })
})
