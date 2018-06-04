import _ from 'lodash'
import React, {Component} from 'react'
import {View, Platform, Alert} from 'react-native'
import geolib from 'geolib'

import Shell from '@/containers/shared/Shell'
import Map from '@/containers/listings/Map'
import Feed from '@/containers/listings/Feed/Map'
import UserPositionMarker from '@/components/listings/Map/UserPosition'
import ListButton from '@/components/listings/Feed/Button'
import Header from '@/components/shared/Form/SubmitHeader'
import {withPermission} from '@/containers/shared/Permission'
import styles from './styles'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

// https://gis.stackexchange.com/a/127949
const kmPerPx = ({lat, zoom}) =>
  156.54303392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)

@withPermission('location', 'whenInUse')
export default class MapScreen extends Component {
  state = {
    authorized: false,
    watchID: undefined,
    region: undefined,
    active: undefined,
    // initial position
    lat: -22.9608099,
    lng: -43.2096142,
    zoom: 12
  }

  lastUserLocation = null

  map = React.createRef()

  componentDidMount() {
    requestAnimationFrame(async () => {
      const permission = await this.props.onRequestPermission(false)
      if (permission !== 'authorized') return
      navigator.geolocation.getCurrentPosition(
        async (response) => {
          await this.updatePosition(response)
          if (this.isWithinBounds) this.onWatchPosition()
        },
        console.warn,
        {timeout: 1000}
      )
    })
  }

  componentWillUnmount() {
    this.onUnwatchPosition()
  }

  onRegionChange = (region) => {
    this.setState({
      zoom: zoom(region),
      lat: region.latitude,
      lng: region.longitude,
      region
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

  updatePosition = async ({coords}) => {
    this.lastUserLocation = coords
    return new Promise((resolve) =>
      this.setState(
        {
          region: {
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
            longitude: coords.longitude,
            latitude: coords.latitude
          }
        },
        resolve
      )
    )
  }

  onWatchPosition = async () => {
    if (!this.isWithinBounds) {
      return Alert.alert(
        'Fora da área de cobertura',
        'A sua região ainda não é coberta pela EmCasa.'
      )
    }
    const permission = await this.props.onRequestPermission()
    if (this.isWatching || permission !== 'authorized') return
    const watchID = navigator.geolocation.watchPosition(this.updatePosition)
    this.setState({watchID})
  }

  onUnwatchPosition = () => {
    if (!this.isWatching) return
    navigator.geolocation.clearWatch(this.state.watchID)
    this.setState({watchID: null})
  }

  get params() {
    return _.omitBy(this.props.navigation.state.params, 'id')
  }

  get isWatching() {
    return typeof this.state.watchID === 'number'
  }

  get isWithinBounds() {
    if (!this.lastUserLocation) return undefined
    // Vista Chinesa - RJ
    const centerOfRJ = {
      latitude: -22.9730992,
      longitude: -43.2524123
    }
    const distance = 17 * 1000
    return geolib.isPointInCircle(this.lastUserLocation, centerOfRJ, distance)
  }

  render() {
    const {active, zoom, region} = this.state
    const maxZoomToAggregateMarkers = 15
    const aggregateMarkerPixelDiameter = Platform.OS === 'ios' ? 45 : 35

    return (
      <Shell
        overlay
        header={
          <Header
            onReturn={this.onReturn}
            onSubmit={
              !this.isWatching ? this.onWatchPosition : this.onUnwatchPosition
            }
            title="Buscar imóvel"
            buttonText="Meu local"
            buttonStyle={!this.isWatching && {color: 'gray'}}
          />
        }
        footer={null}
      >
        <View style={styles.body}>
          <ListButton style={styles.button} onPress={this.onReturn} />
          <Map
            mapRef={this.map}
            scrollEnabled={!this.isWatching}
            onRegionChangeComplete={this.onRegionChange}
            onPanDrag={this.onUnwatchPosition}
            onSelect={this.onSelect}
            distance={kmPerPx(this.state) * aggregateMarkerPixelDiameter}
            aggregate={zoom < maxZoomToAggregateMarkers}
            active={active}
            region={this.isWatching ? region : undefined}
            type="search"
          >
            {this.isWithinBounds && (
              <UserPositionMarker active={this.isWatching} address={this.state} />
            )}
          </Map>
        </View>
        <View style={styles.listings}>
          <Feed active={active} type="search" params={this.params} />
        </View>
      </Shell>
    )
  }
}

export const screen = MapScreen
