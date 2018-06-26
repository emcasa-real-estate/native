import * as listingForm from './modules/listingForm/screens'
import * as listings from './modules/listings/screens'
import * as account from './modules/account/screens'
import * as auth from './modules/auth/screens'

export default {
  listings: {
    name: listings.Feed.screenName,
    isActive: ({name}) => /^listings/.test(name)
  },
  newListing: {
    name: listingForm.Address.screenName,
    isActive: ({name}) => /^listingForm/.test(name)
  },
  favorites: {
    name: account.Favorites.screenName,
    isActive: ({name}) => /^account\.Favorites/.test(name)
  },
  account: {
    name: account.Menu.screenName,
    isActive: ({name}) => /^account\.(?!Favorites)/.test(name)
  },
  auth: {
    name: auth.Login.screenName,
    isActive: ({name}) => /^auth/.test(name)
  }
}

export const STACK_ROOT = 'listings'
