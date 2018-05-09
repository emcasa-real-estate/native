import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({user, active, onNavigate, onLogout}) {
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
      {user ? (
        <Button icon="sign-out" onPress={onLogout}>
          Sair
        </Button>
      ) : (
        <Button icon="user" onPress={onNavigate('auth')}>
          Login
        </Button>
      )}
    </View>
  )
}
