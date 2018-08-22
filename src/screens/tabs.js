import * as listingForm from './modules/listingForm/screens'
import * as listings from './modules/listings/screens'
import * as account from './modules/account/screens'
import * as auth from './modules/auth/screens'

const FAVORITES_SCREEN_NAME = 'Favorites'

const matchScreens = (namespace, {exclude, include} = {}) => {
  let pattern = `/^${namespace}`
  if (exclude) pattern += `\\.(?!${exclude.join('|')})`
  else if (include) pattern += `\\.(${include.join('|')})`
  const regex = new RegExp(pattern)
  return ({name}) => regex.test(name)
}

export default {
  listings: {
    name: listings.Feed.screenName,
    isActive: matchScreens('listings')
  },
  newListing: {
    name: listingForm.Address.screenName,
    isActive: matchScreens('listingForm')
  },
  favorites: {
    name: account.Favorites.screenName,
    isActive: matchScreens('listings', {include: [FAVORITES_SCREEN_NAME]})
  },
  account: {
    name: account.Menu.screenName,
    isActive: matchScreens('listings', {exclude: [FAVORITES_SCREEN_NAME]})
  },
  auth: {
    name: auth.Login.screenName,
    isActive: matchScreens('auth')
  }
}

export const STACK_ROOT = 'listings'
