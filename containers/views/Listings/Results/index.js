import {Component} from 'react'
import {View} from 'react-native'

import Shell from '@/containers/shared/Shell'
import Listings from '@/containers/listings/Feed/Listing'
import MapButton from '@/components/listings/Map/Button'
import Header from '../Header'
import styles from './styles'

export default class ListingsScreen extends Component {
  onOpenMap = () => {
    const {navigation} = this.props
    const {params, key} = navigation.state
    navigation.navigate('map', {...params, parent: key})
  }

  render() {
    const {navigation} = this.props

    return (
      <Shell root overlay header={<Header navigation={navigation} />}>
        <View style={styles.container}>
          <Listings
            type="search"
            style={styles.feed}
            params={navigation.state.params}
          />
          <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
        </View>
      </Shell>
    )
  }
}

export const screen = ListingsScreen
