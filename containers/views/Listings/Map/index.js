import _ from 'lodash'
import React, {Component} from 'react'
import {View, Platform, PermissionsAndroid} from 'react-native'

import Shell from '@/containers/shared/Shell'
import Map from '@/containers/listings/Map'
import Feed from '@/containers/listings/Feed/Map'
import ListButton from '@/components/listings/Feed/Button'
import Header from '@/components/shared/Form/SubmitHeader'
import styles from './styles'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

// https://gis.stackexchange.com/a/127949
const kmPerPx = ({lat, zoom}) =>
  156.54303392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)

export default class MapScreen extends Component {
  state = {
    active: undefined,
    // initial position
    lat: -22.9608099,
    lng: -43.2096142,
    zoom: 12
  }

  map = React.createRef()

  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Acessar local',
        message: 'Esta função necessita permissão para acessar o seu local.'
      }
    )
  }
  onRegionChange = (region) => {
    this.setState({
      zoom: zoom(region),
      lat: region.latitude,
      lng: region.longitude
    })
  }

  onSelect = (id) => {
    const {active} = this.state
    this.setState({active: id === active ? null : id})
  }

  onReturn = () => {
    const {navigation} = this.props
    navigation.goBack(null)
  }

  // onWatchPosition = () => this.setState({following: !this.state.following})
  onWatchPosition = () => {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      this.map.current.animateToRegion({
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        longitude: coords.longitude,
        latitude: coords.latitude
      })
    })
  }

  get params() {
    return _.omitBy(this.props.navigation.state.params, 'id')
  }

  render() {
    const {active, zoom, lat, lng} = this.state
    const maxZoomToAggregateMarkers = 15
    const aggregateMarkerPixelDiameter = Platform.OS === 'ios' ? 45 : 35

    return (
      <Shell
        overlay
        header={
          <Header
            onReturn={this.onReturn}
            onSubmit={this.onWatchPosition}
            title="Buscar imóvel"
            buttonText="Meu local"
          />
        }
        footer={null}
      >
        <View style={styles.body}>
          <ListButton style={styles.button} onPress={this.onReturn} />
          <Map
            mapRef={this.map}
            onRegionChange={this.onRegionChange}
            onSelect={this.onSelect}
            distance={kmPerPx(this.state) * aggregateMarkerPixelDiameter}
            aggregate={zoom < maxZoomToAggregateMarkers}
            active={active}
            lat={lat}
            lng={lng}
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
