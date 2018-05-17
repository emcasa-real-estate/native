import {View} from 'react-native'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

import {GOOGLE_PLACES_API_KEY} from '@/lib/config'
import styles from './styles'

export default function AddressAutoComplete({onChange, ...props}) {
  return (
    <View styles={styles.viewContainer}>
      <GooglePlacesAutocomplete
        {...props}
        currentLocation
        currentLocationLabel="Meu local"
        styles={styles}
        minLength={4}
        getDefaultValue={() => ''}
        onPress={onChange}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'pt-BR',
          types: 'address'
        }}
      />
    </View>
  )
}
