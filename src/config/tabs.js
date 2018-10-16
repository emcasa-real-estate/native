import * as listingForm from '@/screens/modules/listingForm/screens'
import * as listings from '@/screens/modules/listings/screens'
import * as account from '@/screens/modules/account/screens'
import * as auth from '@/screens/modules/auth/screens'

/**
 * react-native-navigation bottom tabs layout generator.
 * Returns an array of `component` layouts for each tab.
 * https://wix.github.io/react-native-navigation/v2/#/docs/layout-types?id=component
 * @param {Object} state - redux state
 * @param {Object|null} args.user - logged in user
 */
export default (_, {user}) => [
  {
    name: listings.Feed.screenName,
    props: {
      icon: 'search',
      label: 'Explorar'
    }
  },
  {
    name: user.id ? listingForm.Address.screenName : auth.Login.screenName,
    props: {
      icon: 'flag',
      label: 'Anunciar'
    }
  },
  {
    name: account.Favorites.screenName,
    props: {
      icon: 'heart',
      label: 'Favoritos'
    }
  },
  {
    name: user.id ? account.Menu.screenName : auth.Login.screenName,
    props: {
      icon: 'user',
      label: user.id ? 'Meu Perfil' : 'Login'
    }
  }
]
