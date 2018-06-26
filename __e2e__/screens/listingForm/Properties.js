import * as actions from './interactions'
import * as select from './selectors'

describe('newListing/properties', () => {
  beforeEach(async () => {
    await element(
      by.type('RCTCustomScrollView').withAncestor(select.propertiesScreen())
    ).swipe('down', 'fast', 0.3)
  })

  it('validates required fields', async () => {
    await actions.submitProperties({})
    await expect(element(by.text('O tipo de imóvel é obrigatório'))).toExist()
    await expect(element(by.text('A área é obrigatória'))).toExist()
    await expect(element(by.text('O telefone é obrigatório'))).toExist()
  })

  it('redirects to a success screen', async () => {
    await actions.submitProperties({
      type: 'Apartamento',
      area: '1000',
      phone: '22222222'
    })
    await expect(element(select.propertiesScreen())).toBeNotVisible()
    await expect(element(select.successScreen())).toBeVisible()
  })
})
