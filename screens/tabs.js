import * as listings from './listings'
import * as account from './account'
import * as auth from './auth'

export default {
  listings: {
    name: listings.Feed.screenName,
    isActive: ({name}) => /^listings/.test(name)
  },
  account: {
    name: account.Menu.screenName,
    isActive: ({name}) => /^account/.test(name)
  },
  auth: {
    name: auth.Login.screenName,
    isActive: ({name}) => /^auth/.test(name)
  }
}

export const STACK_ROOT = 'listings'
