import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'

import MapButton from '@/components/listings/Map/Button'
import Feed from './Feed'
import styles from './styles'

export default class ListingsFeedScreen extends PureComponent {
  onOpenMap = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'listings.Map',
        passProps: this.props
      }
    })
  }

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
