import {Feed} from './listings'
import {Menu} from './account'
import {Login} from './auth'
import {Redirect} from './shared'

const tab = (id, stack) => ({
  stack: {
    id,
    children: stack.map((component) => ({component}))
  }
})

export default () => ({
  children: [
    tab('listings_tab', [{id: 'listings', name: Feed.screenName}]),
    tab('account_tab', [{id: 'account', name: Menu.screenName}]),
    tab(
      'login_tab',
      Redirect.createStack(
        {id: 'login', name: Login.screenName},
        Login.options,
        {to: 'listings_tab', title: 'Imóveis'}
      )
    )
  ]
})
