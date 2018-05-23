import _ from 'lodash'
import {Component} from 'react'
import {View} from 'react-native'

import Shell from '@/containers/shared/Shell'
import Map from '@/containers/listings/Map'
import Feed from '@/containers/listings/Feed/Map'
import ListButton from '@/components/listings/Feed/Button'
import styles from './styles'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

// https://gis.stackexchange.com/a/127949
const kmPerPx = ({lat, zoom}) =>
  156.54303392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)

export default class MapScreen extends Component {
  state = {
    active: undefined,
    lat: 0.01,
    zoom: zoom({longitudeDelta: 0.1})
  }

  onRegionChange = _.debounce((region) => {
    this.setState({
      zoom: zoom(region),
      lat: region.latitude,
      lng: region.longitude
    })
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
    const maxZoomToAggregateMarkers = 15
    const aggregateMarkerPixelDiameter = 35

    return (
      <Shell overlay title="Buscar imóveis" footer={null}>
        <View style={styles.body}>
          <ListButton style={styles.button} onPress={this.onReturn} />
          <Map
            onRegionChange={this.onRegionChange}
            onSelect={this.onSelect}
            distance={kmPerPx(this.state) * aggregateMarkerPixelDiameter}
            aggregate={zoom < maxZoomToAggregateMarkers}
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
