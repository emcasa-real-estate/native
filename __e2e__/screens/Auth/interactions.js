import * as select from './selectors'

export async function navigateToLogin() {
  await waitFor(element(by.id('@shared.Shell.Navigation')))
    .toBeVisible()
    .withTimeout(2000)
  await element(select.navButton()).tap()
  await waitFor(element(select.loginScreen())).toBeVisible()
}

export async function navigateToSignUp() {
  await navigateToLogin()
  await element(select.signUpButton()).tap()
  await waitFor(element(select.signUpScreen())).toBeVisible()
}

export async function login({email, password}) {
  const input = (label) =>
    select.input(label).withAncestor(select.loginScreen())
  await element(input('Email')).tap()
  await element(input('Email')).clearText()
  await element(input('Email')).typeText(email + '\n')
  await element(input('Senha')).typeText(password + '\n')
}

export async function signUp({name, email, phone, password}) {
  const input = (label) =>
    select.input(label).withAncestor(select.signUpScreen())
  await element(input('Nome')).tap()
  await element(input('Nome')).clearText()
  await element(input('Nome')).typeText(name + '\n')
  await element(input('Email')).clearText()
  await element(input('Email')).typeText(email + '\n')
  if (phone) await element(input('Telefone (opcional)')).typeText(phone)
  await element(input('Senha')).tap()
  await element(input('Senha')).typeText(password + '\n')
}
