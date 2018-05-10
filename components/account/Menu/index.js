import {View} from 'react-native'

import {Gateway} from 'react-gateway'
import Button from '../FormButton'
import Header from './Header'

export default function AccountMenu({user, onEditProfile, onSignOut}) {
  return (
    <View>
      <Gateway into="header">
        <Header user={user} />
      </Gateway>
      <Button onPress={onEditProfile} icon="chevron-right">
        Editar perfil
      </Button>
      <Button onPress={onSignOut} icon="sign-out">
        Sair
      </Button>
    </View>
  )
}
