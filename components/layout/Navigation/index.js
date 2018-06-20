import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({user, active, onNavigate}) {
  return (
    <View testID="@shared.Shell.Navigation" style={styles.container}>
      <Button
        active={active === 'listings'}
        icon="home"
        onPress={onNavigate('listings_tab')}
      >
        Imóveis
      </Button>
      <Button
        active={active === 'favorites'}
        icon="heart"
        onPress={onNavigate('favorites')}
      >
        Salvos
      </Button>
      <Button
        active={active === 'newListing'}
        icon="tag"
        onPress={onNavigate(user ? 'newListing' : 'auth')}
      >
        Anunciar
      </Button>
      <Button
        active={active === 'account'}
        icon="user"
        onPress={onNavigate(user ? 'account' : 'auth')}
      >
        {user ? 'Perfil' : 'Login'}
      </Button>
    </View>
  )
}
