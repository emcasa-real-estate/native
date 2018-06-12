import React, {PureComponent} from 'react'
import {Alert} from 'react-native'
import geolib from 'geolib'
import {connect} from 'react-redux'

import {load} from '@/redux/modules/listings/feed'
import {
  getOptions,
  getListings,
  getPagination
} from '@/redux/modules/listings/feed/selectors'
import {withPermission} from '@/containers/shared/Permission'
import UserPositionMarker from '@/components/listings/Map/UserPosition'
import Map, {Marker, Aggregator} from '@/components/listings/Map'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
    pagination: getPagination(state, {type: 'search'}),
    options: getOptions(state, {type: 'search'})
  }),
  {load}
)
@withPermission('location', 'whenInUse')
export default class ListingsMap extends PureComponent {
  state = {
    authorized: false,
    watchID: undefined,
    region: undefined,
    // initial position
    lat: -22.9608099,
    lng: -43.2096142,
    zoom: 12
  }

  lastUserLocation = null

  map = React.createRef()

  componentDidMount() {
    // Request permission to get user's location and focus map if this.isWithinBounds
    requestAnimationFrame(async () => {
      const permission = await this.props.onRequestPermission(false)
      if (permission !== 'authorized') return
      navigator.geolocation.getCurrentPosition(
        async (response) => {
          await this.updatePosition(response)
          if (this.isWithinBounds()) this.onWatchPosition()
        },
        console.log, // eslint-disable-line no-console
        {timeout: 1000}
      )
    })
  }

  componentWillUnmount() {
    this.onUnwatchPosition()
  }

  updatePosition = async ({coords}) => {
    this.lastUserLocation = coords
    return new Promise((resolve) =>
      this.setState(
        {
          zoom: zoom({longitudeDelta: 0.01}),
          region: {
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            longitude: coords.longitude,
            latitude: coords.latitude
          }
        },
        resolve
      )
    )
  }

  isWatching() {
    return typeof this.state.watchID === 'number'
  }

  isWithinBounds() {
    if (!this.lastUserLocation) return undefined
    // Vista Chinesa - RJ
    const centerOfRJ = {
      latitude: -22.9730992,
      longitude: -43.2524123
    }
    const distance = 17 * 1000
    return geolib.isPointInCircle(this.lastUserLocation, centerOfRJ, distance)
  }

  get data() {
    return this.props.data.map((listing) => ({
      listing,
      location: {
        longitude: listing.address.lng,
        latitude: listing.address.lat
      }
    }))
  }

  onRegionChange = (region) => {
    this.setState({
      zoom: zoom(region),
      lat: region.latitude,
      lng: region.longitude,
      region
    })
  }

  onSelect = (id) => () => this.props.onSelect(id)

  onWatchPosition = async () => {
    if (!this.isWithinBounds()) {
      return Alert.alert(
        'Fora da área de cobertura',
        'A sua região ainda não é coberta pela EmCasa.'
      )
    }
    const permission = await this.props.onRequestPermission()
    if (this.isWatching() || permission !== 'authorized') return
    const watchID = navigator.geolocation.watchPosition(this.updatePosition)
    this.setState({watchID})
  }

  onUnwatchPosition = () => {
    if (!this.isWatching()) return
    navigator.geolocation.clearWatch(this.state.watchID)
    this.setState({watchID: null})
  }

  renderMarker = ({listing}) => {
    const active = this.props.active === listing.id
    return (
      <Marker
        active={active}
        onPress={this.onSelect(listing.id)}
        key={listing.id}
        style={{zIndex: active ? 2 : 1}}
        zIndex={active ? 2 : 1}
        {...listing}
      />
    )
  }

  render() {
    const {zoom, region} = this.state
    const maxZoomToAggregateMarkers = 14
    const aggregate = zoom < maxZoomToAggregateMarkers
    return (
      <Map
        mapRef={this.map}
        as={Aggregator}
        data={this.data}
        renderMarker={this.renderMarker}
        clusteringEnabled={aggregate}
        scrollEnabled={!this.isWatching()}
        onRegionChangeComplete={this.onRegionChange}
        onPanDrag={this.onUnwatchPosition}
        onSelect={this.onSelect}
        region={this.isWatching() ? region : undefined}
      >
        {this.isWithinBounds() && (
          <UserPositionMarker
            active={this.isWatching()}
            address={{
              lat: this.lastUserLocation.latitude,
              lng: this.lastUserLocation.longitude
            }}
          />
        )}
      </Map>
    )
  }
}
