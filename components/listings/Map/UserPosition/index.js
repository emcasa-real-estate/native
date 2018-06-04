import {View} from 'react-native'
import {Marker, Callout} from 'react-native-maps'

import $styles from './styles'

function UserPositionMarker({styles, address: {lat, lng}, ...props}) {
  return (
    <Marker
      {...props}
      coordinate={{
        latitude: lat,
        longitude: lng
      }}
    >
      <View style={styles.container}>
        <View style={styles.body} />
      </View>
      <Callout tooltip />
    </Marker>
  )
}

export default $styles.inject()(UserPositionMarker)
