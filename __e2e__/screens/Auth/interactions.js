import * as select from './selectors'
import * as shared from '../shared/selectors'

export async function navigateToLogin() {
  await waitFor(element(shared.bottomTabs()))
    .toBeVisible()
    .withTimeout(12000)
  await element(shared.bottomTabButton('Login')).tap()
  await waitFor(element(select.loginScreen()))
    .toBeVisible()
    .withTimeout(5000)
}

export async function navigateToSignUp() {
  await navigateToLogin()
  await element(select.signUpButton()).tap()
  await waitFor(element(select.signUpScreen()))
    .toBeVisible()
    .withTimeout(5000)
}

export async function login({email, password}) {
  const input = (label) =>
    shared.input(label).withAncestor(select.loginScreen())
  await element(input('Email')).tap()
  await element(input('Email')).clearText()
  await element(input('Email')).typeText(email + '\n')
  await element(input('Senha')).typeText(password + '\n')
}

export async function signUp({name, email, phone, password}) {
  const input = (label) =>
    shared.input(label).withAncestor(select.signUpScreen())
  await element(input('Nome')).tap()
  await element(input('Nome')).clearText()
  await element(input('Nome')).typeText(name + '\n')
  await element(input('Email')).clearText()
  await element(input('Email')).typeText(email + '\n')
  if (phone) await element(input('Telefone (opcional)')).typeText(phone)
  await element(by.label('done').and(by.type('UIButtonLabel'))).tap()
  await element(input('Senha')).tap()
  await element(input('Senha')).typeText(password + '\n')
}
