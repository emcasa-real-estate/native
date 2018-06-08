import * as actions from './interactions'
import * as select from './selectors'

describe('newListing/address', () => {
  // skip ui test
  context.skip('autocomplete', () => {
    it('suggests addresses from text input', async () => {
      await actions.insertAddress('Rua')
      await expect(element(select.autoCompleteInput())).toHaveText('Rua')
      await expect(element(select.autoCompleteOptions()).atIndex(0)).toExist()
    })

    it('auto selects first option on blur', async () => {
      await actions.insertAddress('Rua')
      await actions.blurInputs(select.addressScreen())
      await element(select.addressScreen()).tap()
      await expect(
        element(select.autoCompleteOptions()).atIndex(0)
      ).toNotExist()
    })

    it('auto selects first option on submitEditing', async () => {
      await actions.insertAddress('Rua')
      await actions.submitEditing(select.autoCompleteInput())
      await element(select.addressScreen()).tap()
      await expect(
        element(select.autoCompleteOptions()).atIndex(0)
      ).toNotExist()
    })

    it('updates value to selected option', async () => {
      await actions.insertAddress('Rua')
      await element(select.autoCompleteOptions())
        .atIndex(0)
        .tap()
      await element(select.addressScreen()).tap()
      await expect(
        element(select.autoCompleteOptions()).atIndex(0)
      ).toNotExist()
    })
  })

  context('validations', () => {
    it('validates address number', async () => {
      await actions.insertAddress('Rua Vergueiro')
      await actions.submitEditing(select.autoCompleteInput())
      await waitFor(element(select.autoComplete())).toBeNotVisible()
      await expect(element(by.text('O número é obrigatório'))).toBeVisible()
    })

    it('validates address google places id', async () => {
      await actions.insertAddress('Rua Vergueiro 300')
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
    await element(select.input('Complemento')).tap()
    await element(select.input('Complemento')).typeText('123')
    await element(by.text('Próximo').withAncestor(select.addressScreen())).tap()
    await waitFor(element(select.addressScreen())).toBeNotVisible()
    await expect(element(select.propertiesScreen())).toBeVisible()
  })
})
