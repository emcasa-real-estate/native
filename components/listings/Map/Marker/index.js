import {View} from 'react-native'
import {Marker, Callout} from 'react-native-maps'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import {abbrevPrice} from '@/assets/format'
import $styles from './styles'

function ListingMarker({styles, icon, price, address: {lat, lng}, ...props}) {
  return (
    <Marker
      {...props}
      coordinate={{
        latitude: lat,
        longitude: lng
      }}
    >
      <View style={styles.container}>
        <View style={styles.body}>
          {icon ? (
            <Icon name={icon} color="white" size={16} />
          ) : (
            <Text style={styles.text}>{abbrevPrice(price)}</Text>
          )}
        </View>
        <View style={styles.tip} />
      </View>
      <Callout tooltip />
    </Marker>
  )
}

export default $styles.inject()(ListingMarker)
