import _ from 'lodash'
import {Component} from 'react'
import {View} from 'react-native'

import Shell from '@/containers/shared/Shell'
import Map from '@/containers/listings/Map'
import Feed from '@/containers/listings/Feed/Map'
import ListButton from '@/components/listings/Feed/Button'
import styles from './styles'

const zoom = ({longitudeDelta}) => Math.PI * _.round(longitudeDelta, 10) / 180

export default class MapScreen extends Component {
  state = {
    active: undefined,
    zoom: zoom({longitudeDelta: 0.09999999999993747})
  }

  onRegionChange = _.debounce((region) => {
    this.setState({zoom: zoom(region)})
  }, 200)

  onSelect = (id) => {
    const {active} = this.state
    this.setState({active: id === active ? null : id})
  }

  onReturn = () => {
    const {navigation} = this.props
    navigation.goBack(null)
  }

  get params() {
    return _.omitBy(this.props.navigation.state.params, 'id')
  }

  render() {
    const {active, zoom} = this.state

    const distance = 800 * zoom
    console.log(zoom, distance)
    return (
      <Shell overlay title="Buscar imóveis" footer={null}>
        <View style={styles.body}>
          <ListButton style={styles.button} onPress={this.onReturn} />
          <Map
            onRegionChange={this.onRegionChange}
            onSelect={this.onSelect}
            distance={distance}
            aggregate={zoom > 0.0007}
            active={active}
            type="search"
          />
        </View>
        <View style={styles.listings}>
          <Feed active={active} type="search" params={this.params} />
        </View>
      </Shell>
    )
  }
}

export const screen = MapScreen
