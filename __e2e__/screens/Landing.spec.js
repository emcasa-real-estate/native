describe('<Landing />', () => {
  it('displays featured listings', async () => {
    await expect(element(by.id('@listings.Card')).atIndex(0)).toExist()
  })
})
