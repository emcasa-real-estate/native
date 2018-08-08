import * as listingForm from './modules/listingForm/screens'
import * as listings from './modules/listings/screens'
import * as account from './modules/account/screens'

export const TABS = {
  listings: {
    name: listings.Feed.screenName,
    options: {
      bottomTab: {
        text: 'Imóveis',
        icon: require('@/assets/img/tabs/home.png')
      }
    }
  },
  newListing: {
    name: listingForm.Address.screenName,
    options: {
      bottomTab: {
        text: 'Anuncie',
        icon: require('@/assets/img/tabs/tag.png')
      }
    }
  },
  favorites: {
    name: account.Favorites.screenName,
    options: {
      bottomTab: {
        text: 'Favoritos',
        icon: require('@/assets/img/tabs/heart.png')
      }
    }
  },
  account: {
    name: 'account',
    options: {
      bottomTab: {
        text: 'Perfil',
        icon: require('@/assets/img/tabs/user.png')
      }
    }
  }
}

export default [TABS.listings, TABS.favorites, TABS.newListing, TABS.account]
