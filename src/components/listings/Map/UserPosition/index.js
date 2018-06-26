import {Fragment} from 'react'
import {View} from 'react-native'
import {Marker, Circle, Callout} from 'react-native-maps'

import $styles, {circleColor} from './styles'

function UserPositionMarker({
  styles,
  address: {lat, lng},
  active,
  radius,
  ...props
}) {
  return (
    <Fragment>
      <Marker
        {...props}
        coordinate={{
          latitude: lat,
          longitude: lng
        }}
        zIndex={-1}
      >
        <View style={styles.dot} />
        <Callout tooltip />
      </Marker>
      {active && (
        <Circle
          zIndex={-2}
          radius={300}
          strokeColor="rgba(0,0,0,0)"
          fillColor={circleColor}
          center={{
            latitude: lat,
            longitude: lng
          }}
        />
      )}
    </Fragment>
  )
}

export default $styles.inject()(UserPositionMarker)
