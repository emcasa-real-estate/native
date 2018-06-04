import {View} from 'react-native'
import {Marker, Callout} from 'react-native-maps'

import $styles from './styles'

function UserPositionMarker({
  styles,
  address: {lat, lng},
  active,
  radius,
  ...props
}) {
  return (
    <Marker
      {...props}
      coordinate={{
        latitude: lat,
        longitude: lng
      }}
      zIndex={-1}
    >
      <View
        style={[
          styles.circle,
          active && {
            marginTop: -radius - 7.5,
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius * 2
          }
        ]}
      >
        <View style={styles.dot} />
      </View>
      <Callout tooltip />
    </Marker>
  )
}

export default $styles.inject()(UserPositionMarker)
