import {View} from 'react-native'

import {Gateway} from 'react-gateway'
import Button, {ButtonLabel} from '../FormButton'
import Header from './Header'

export default function AccountMenu({
  user,
  listingsCount,
  onEditProfile,
  onViewListings,
  onSignOut
}) {
  return (
    <View>
      <Gateway into="header">
        <Header user={user} />
      </Gateway>
      <Button onPress={onEditProfile} icon="chevron-right">
        Editar perfil
      </Button>
      <Button
        onPress={onViewListings}
        icon="chevron-right"
        label={listingsCount && <ButtonLabel>{listingsCount}</ButtonLabel>}
      >
        Meus imóveis
      </Button>
      <Button onPress={onSignOut} icon="sign-out">
        Sair
      </Button>
    </View>
  )
}
