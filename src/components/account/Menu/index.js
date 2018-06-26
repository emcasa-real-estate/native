import {View} from 'react-native'

import Button, {ButtonLabel} from '../FormButton'

export default function AccountMenu({
  listingsCount,
  onEditProfile,
  onViewListings,
  onSignOut
}) {
  return (
    <View>
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
