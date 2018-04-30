import {View} from 'react-native'
import styles from './styles'

import Button from './Button'

export default function Navigation({user, navigation, onLogout}) {
  const navigateTo = (scene) => () => navigation.navigate(scene)
  return (
    <View style={styles.container}>
      <Button icon="search" onPress={navigateTo('listings')}>
        Busca
      </Button>
      <Button icon="heart" onPress={navigateTo(user ? 'favorites' : 'auth')}>
        Salvos
      </Button>
      <Button icon="tag" onPress={navigateTo('create')}>
        Anunciar
      </Button>
      <Button icon="calendar-alt" onPress={navigateTo('schedule')}>
        Agenda
      </Button>
      {user ? (
        <Button icon="sign-out" onPress={onLogout}>
          Sair
        </Button>
      ) : (
        <Button icon="user" onPress={navigateTo('auth')}>
          Login
        </Button>
      )}
    </View>
  )
}
