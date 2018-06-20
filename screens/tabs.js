import * as listings from './listings'
import * as account from './account'
import * as auth from './auth'
import {Redirect} from './shared'

const tab = ({id, stack}) => ({
  stack: {
    id,
    children: stack.map((component) => ({component}))
  }
})

export const TABS = {
  listings: {
    id: 'listings_tab',
    icon: 'home',
    title: 'Imóveis',
    stack: [{id: 'listings', name: listings.Feed.screenName}]
  },
  account: {
    id: 'account_tab',
    icon: 'user',
    title: 'Perfil',
    stack: Redirect.createStack(
      {id: 'account', name: account.Menu.screenName},
      account.Menu.options,
      {to: 'listings_tab', title: 'Imóveis'}
    )
  },
  auth: {
    id: 'auth_tab',
    icon: 'user',
    title: 'Login',
    stack: Redirect.createStack(
      {id: 'login', name: auth.Login.screenName},
      auth.Login.options,
      {to: 'listings_tab', title: 'Imóveis'}
    )
  }
}

export const getActiveTabs = ({jwt}) => [
  TABS.listings,
  jwt ? TABS.account : TABS.auth
]

export const buildBottomTabs = (tabs) => ({
  children: tabs.map(tab)
})
