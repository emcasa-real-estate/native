import * as select from './selectors'

export async function navigate() {
  await waitFor(element(by.id('bottom_tabs')))
    .toBeVisible()
    .withTimeout(2000)
  await element(select.navButton()).tap()
  await waitFor(element(select.addressScreen())).toBeVisible()
}

export async function blurInputs(screen) {
  await element(screen).tapAtPoint({x: 100, y: 50})
}

export async function submitEditing(input) {
  await element(input).typeText('\n')
}

export async function insertAddress(text) {
  await element(select.autoCompleteInput()).tap()
  await element(select.autoCompleteInput()).replaceText(text)
}

export async function submitProperties({type, floor, area, phone}) {
  if (type) {
    await element(select.dropDown('Tipo de imóvel')).tap()
    await element(by.text(type)).tap()
  }
  for (const [value, label] of [
    [floor, 'Andar'],
    [area, 'Área (m²)'],
    [phone, 'Telefone (obrigatório)']
  ]) {
    await element(select.input(label)).tap()
    if (value) await element(select.input(label)).typeText(value)
    await element(by.label('done').and(by.type('UIButtonLabel'))).tap()
    await waitFor(element(by.type('UIRemoteKeyboardWindow')))
      .toBeNotVisible()
      .withTimeout(1000)
  }
  await element(by.text('Enviar').withAncestor(select.propertiesScreen()))
    .atIndex(0)
    .tap()
}
