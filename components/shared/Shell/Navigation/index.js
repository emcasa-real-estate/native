import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({user, navigation}) {
  const navigateTo = (scene) => () => navigation.navigate(scene)
  const active = navigation.state.route || navigation.state.routeName
  return (
    <View style={styles.container}>
      <Button
        active={active === 'results'}
        icon="search"
        onPress={navigateTo('listings')}
      >
        Buscar
      </Button>
      <Button
        active={active === 'favorites'}
        icon="heart"
        onPress={navigateTo('favorites')}
      >
        Salvos
      </Button>
      {user ? (
        <Button icon="user" onPress={navigateTo('profile')}>
          Perfil
        </Button>
      ) : (
        <Button icon="user" onPress={navigateTo('auth')}>
          Login
        </Button>
      )}
    </View>
  )
}
