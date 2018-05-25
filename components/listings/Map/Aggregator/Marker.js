import {Component} from 'react'
import {View} from 'react-native'
import {Marker, Callout} from 'react-native-maps'

import Text from '@/components/shared/Text'
import styles from './styles'

export default class AggregatorMarker extends Component {
  shouldComponentUpdate(next) {
    const {lat, lng, children} = this.props
    return lat !== next.lat || lng !== next.lng || children !== next.children
  }

  render() {
    const {children, lat, lng, ...props} = this.props

    return (
      <Marker
        {...props}
        coordinate={{
          latitude: lat,
          longitude: lng
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
        </View>
        <Callout tooltip />
      </Marker>
    )
  }
}
