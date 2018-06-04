import {View} from 'react-native'
import {Marker, Callout} from 'react-native-maps'

import $styles from './styles'

function UserPositionMarker({styles, address: {lat, lng}, radius, ...props}) {
  return (
    <Marker
      {...props}
      coordinate={{
        latitude: lat,
        longitude: lng
      }}
      zIndex={-1}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            {width: radius * 2, height: radius * 2, borderRadius: radius}
          ]}
        >
          <View style={styles.dot} />
        </View>
      </View>
      <Callout tooltip />
    </Marker>
  )
}

export default $styles.inject()(UserPositionMarker)
