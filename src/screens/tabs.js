import * as listingForm from '@/screens/modules/listingForm/screens'
import * as listings from '@/screens/modules/listings/screens'
import * as account from '@/screens/modules/account/screens'
import * as auth from '@/screens/modules/auth/screens'

export default (_, {user}) => [
  {
    name: listings.Feed.screenName,
    options: {
      bottomTab: {
        text: 'Imóveis',
        icon: require('@/assets/img/tabs/home.png')
      }
    }
  },
  {
    name: account.Favorites.screenName,
    options: {
      bottomTab: {
        text: 'Favoritos',
        icon: require('@/assets/img/tabs/heart.png')
      }
    }
  },
  {
    name: user ? listingForm.Address.screenName : auth.Login.screenName,
    passProps: {
      params: {
        tabIndex: 2,
        notice: 'O login é necessário para anunciar um imóvel.'
      }
    },
    options: {
      bottomTab: {
        text: 'Anunciar',
        icon: require('@/assets/img/tabs/tag.png')
      }
    }
  },
  {
    name: user ? account.Menu.screenName : auth.Login.screenName,
    options: {
      bottomTab: {
        text: user ? 'Perfil' : 'Login',
        icon: require('@/assets/img/tabs/user.png')
      }
    }
  }
]
