import * as elements from './elements'

describe('<Landing />', () => {
  it('loads more listings on scroll', async () => {
    await waitFor(elements.feed())
      .toExist()
      .withTimeout(3000)
    await expect(elements.nthCard(1)).toExist()
    await expect(elements.nthCard(16)).toNotExist()
    await elements.feed().swipe('up', 'fast', 0.9)
    await waitFor(elements.nthCard(16))
      .toExist()
      .withTimeout(3000)
    await expect(elements.nthCard(16)).toExist()
  })
})
