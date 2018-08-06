import * as listingForm from './modules/listingForm/screens'
import * as listings from './modules/listings/screens'
import * as account from './modules/account/screens'

export const TABS = {
  listings: {
    name: listings.Feed.screenName,
    options: {
      bottomTab: {text: 'Test1'}
    }
  },
  newListing: {
    name: listingForm.Address.screenName,
    options: {
      bottomTab: {text: 'Test1'}
    }
  },
  favorites: {
    name: account.Favorites.screenName,
    options: {
      bottomTab: {text: 'Test1'}
    }
  },
  account: {
    name: 'account',
    options: {
      bottomTab: {text: 'Test'}
    }
  }
}

export default [TABS.listings, TABS.favorites, TABS.newListing, TABS.account]
