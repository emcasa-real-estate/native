import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({user, navigation, onLogout}) {
  const navigateTo = (scene) => () => navigation.navigate(scene)
  return (
    <View style={styles.container}>
      <Button icon="magnify" onPress={navigateTo('listings')}>
        Busca
      </Button>
      <Button icon="plus-outline" onPress={navigateTo('create')}>
        Anunciar
      </Button>
      <Button icon="heart-outline" onPress={navigateTo('favorites')}>
        Salvos
      </Button>
      {user ? (
        <Button icon="logout" onPress={onLogout}>
          Sair
        </Button>
      ) : (
        <Button icon="account-outline" onPress={navigateTo('auth')}>
          Login
        </Button>
      )}
      <Button icon="dots-horizontal">Mais</Button>
    </View>
  )
}
