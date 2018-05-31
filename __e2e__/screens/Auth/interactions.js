import * as select from './selectors'

export async function navigate() {
  await element(select.navButton()).tap()
  await waitFor(element(select.loginScreen())).toBeVisible()
}

export async function login(email, password) {
  await element(select.input('Email')).tap()
  await element(select.input('Email')).clearText()
  await element(select.input('Email')).typeText(email + '\n')
  await element(select.input('Senha')).typeText(password + '\n')
  await element(by.text('Enviar')).tap()
}
