import {View} from 'react-native'

import Button from '../FormButton'

export default function AccountMenu({onEditProfile, onSignOut}) {
  return (
    <View>
      <Button onPress={onEditProfile} icon="chevron-right">
        Editar perfil
      </Button>
      <Button onPress={onSignOut} icon="sign-out">
        Sair
      </Button>
    </View>
  )
}
