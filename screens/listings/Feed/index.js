import {PureComponent} from 'react'
import {View} from 'react-native'

import MapButton from '@/components/listings/Map/Button'
import Feed from './Feed'
import styles from './styles'

export default class ListingsFeedScreen extends PureComponent {
  onOpenMap = () => null

  render() {
    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          // params={navigation.state.params}
        />
        <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
      </View>
    )
  }
}
