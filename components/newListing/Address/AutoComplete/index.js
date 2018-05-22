import {Component} from 'react'
import {View} from 'react-native'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

import {GOOGLE_PLACES_API_KEY} from '@/lib/config'
import styles from './styles'

export default class AddressAutoComplete extends Component {
  onFocus = () => this.setState({focus: true})
  onBlur = () => this.setState({focus: false})

  render() {
    const {onChange, ...props} = this.props
    return (
      <View styles={styles.viewContainer}>
        <GooglePlacesAutocomplete
          {...props}
          autoFocus={false}
          horizontal={false}
          enablePoweredByContainer={false}
          styles={styles}
          minLength={4}
          getDefaultValue={() => ''}
          onPress={onChange}
          filterReverseGeocodingByTypes={['locality', 'street_address']}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'pt-BR',
            types: 'address'
          }}
          textInputProps={{
            onFocus: this.onFocus,
            onBlur: this.onBlur
          }}
        />
      </View>
    )
  }
}
