import * as select from './selectors'

describe('listings/results', () => {
  beforeAll(() => device.reloadReactNative())

  it('loads more listings on scroll', async () => {
    await waitFor(element(select.feed()))
      .toExist()
      .withTimeout(6000)
    await expect(element(select.nthCard(1))).toExist()
    await expect(element(select.nthCard(16))).toNotExist()
    await element(select.feed()).swipe('up', 'fast', 0.6)
    await element(select.feed()).swipe('up', 'fast', 0.6)
    await waitFor(element(select.nthCard(16)))
      .toExist()
      .withTimeout(20000)
    await expect(element(select.nthCard(16))).toExist()
  })

  context('favorites', () => {
    beforeAll(() => device.reloadReactNative())
    afterEach(() => element(select.feed()).swipe('down', 'fast', 0.5))

    const scrollToCard = (n, direction = 'down') =>
      waitFor(element(select.nthCard(n)))
        .toBeVisible()
        .whileElement(select.feed())
        .scroll(250, direction)

    it('saves client-side favorited listings', async () => {
      for (let i = 1; i <= 3; ++i) {
        const likeButton = element(select.nthLikeButton(i))
        await scrollToCard(i)
        await expect(likeButton).toBeVisible()
        await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
        await likeButton.tap()
        await expect(likeButton).toHaveLabel('Remover dos favoritos')
      }
    })

    it('removes client-side favorited listings', async () => {
      for (let i = 1; i <= 3; ++i) {
        const likeButton = element(select.nthLikeButton(i))
        await scrollToCard(i)
        await expect(likeButton).toBeVisible()
        await expect(likeButton).toHaveLabel('Remover dos favoritos')
        await likeButton.tap()
        await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
      }
    })
  })
})
