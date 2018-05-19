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

  context('favorites', () => {
    beforeAll(() => device.reloadReactNative())

    it('saves client-side favorited listings', async () => {
      for (let i = 1; i <= 3; ++i) {
        const likeButton = element(select.nthLikeButton(i))
        await waitFor(element(select.nthCard(i)))
          .toBeVisible()
          .whileElement(select.feed())
          .scroll(200, 'down')
        await expect(likeButton).toBeVisible()
        await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
        await likeButton.tap()
        await expect(likeButton).toHaveLabel('Remover dos favoritos')
      }
    })

    it('persists client-side data', async () => {
      await device.terminateApp()
      await device.launchApp({newInstance: false})
      await expect(element(select.nthLikeButton(1)))
        .toHaveLabel('Remover dos favoritos')
        .withTimeout(3000)
    })
  })
})
