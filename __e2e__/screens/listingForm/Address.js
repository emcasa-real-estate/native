import * as shared from '../shared/selectors'
import * as actions from './interactions'
import * as select from './selectors'

describe('listingForm.Address', () => {
  context('validations', () => {
    it('validates address number', async () => {
      await actions.insertAddress('Rua Vergueiro')
      await actions.submitEditing(select.autoCompleteInput())
      await waitFor(element(select.autoComplete())).toBeNotVisible()
      await expect(element(by.text('O número é obrigatório'))).toBeVisible()
    })

    it('validates address google places id', async () => {
      await actions.insertAddress('Rua Vergueiro 50000')
      await actions.submitEditing(select.autoCompleteInput())
      await waitFor(element(select.autoComplete())).toBeNotVisible()
      await expect(
        element(by.text('Não encontramos um endereço válido com esse número'))
      ).toBeVisible()
    })
  })

  it('redirects to the next step', async () => {
    await actions.insertAddress('Rua Vergueiro 123')
    await actions.submitEditing(select.autoCompleteInput())
    await element(shared.input('Complemento')).tap()
    await element(shared.input('Complemento')).typeText('xxx')
    await element(by.text('Próximo').withAncestor(select.addressScreen())).tap()
    await waitFor(element(select.addressScreen())).toBeNotVisible()
    await expect(element(select.propertiesScreen())).toBeVisible()
  })
})
