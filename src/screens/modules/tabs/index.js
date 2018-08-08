import * as listings from '@/screens/modules/listings/screens'
import * as account from '@/screens/modules/account/screens'
import {AuthTab, NewListingTab} from './screens'

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
    name: NewListingTab.screenName,
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
    name: AuthTab.screenName,
    options: {
      bottomTab: {
        text: 'Perfil',
        icon: require('@/assets/img/tabs/user.png')
      }
    }
  }
}

export default [TABS.listings, TABS.favorites, TABS.newListing, TABS.account]
