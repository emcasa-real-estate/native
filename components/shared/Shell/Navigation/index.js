import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({user, active, onNavigate}) {
  return (
    <View style={styles.container}>
      <Button
        active={active === 'listings'}
        icon="search"
        onPress={onNavigate('listings')}
      >
        Buscar
      </Button>
      <Button
        active={active === 'favorites'}
        icon="heart"
        onPress={onNavigate('favorites')}
      >
        Salvos
      </Button>
      <Button
        active={active === 'profile'}
        icon="user"
        onPress={onNavigate(user ? 'profile' : 'auth')}
      >
        {user ? 'Perfil' : 'Login'}
      </Button>
    </View>
  )
}
