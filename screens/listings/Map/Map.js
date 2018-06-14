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
  static defaultProps = {
    watching: undefined
  }

  state = {
    authorized: false,
    watchID: undefined,
    region: undefined,
    // initial position
    lat: -22.9608099,
    lng: -43.2096142,
    zoom: 12
  }

  map = React.createRef()

  // componentDidMount() {
  //   requestAnimationFrame(this.requestInitialPosition)
  // }

  componentWillUnmount() {
    this.onUnwatchPosition()
  }

  requestInitialPosition = async () => {
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
  }

  isWithinBounds() {
    const {userPosition} = this.props
    if (!userPosition) return undefined
    // Vista Chinesa - RJ
    const centerOfRJ = {
      latitude: -22.9730992,
      longitude: -43.2524123
    }
    const distance = 17 * 1000
    return geolib.isPointInCircle(userPosition, centerOfRJ, distance)
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

  onRegionChange = (region) =>
    this.setState({
      lat: region.latitude,
      lng: region.longitude,
      region
    })

  onSelect = (id) => () => this.props.onSelect(id)

  shouldWatchPosition = async () => {
    if (!this.isWithinBounds()) {
      Alert.alert(
        'Fora da área de cobertura',
        'A sua região ainda não é coberta pela EmCasa.'
      )
      return false
    }
    const permission = await this.props.onRequestPermission()
    if (this.props.watching || permission !== 'authorized') return false
    return true
  }

  onWatchPosition = async () => {
    if (await this.shouldWatchPosition()) this.props.onWatchPosition()
  }

  onUnwatchPosition = () => this.props.onUnwatchPosition()

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
    const {region} = this.state
    const maxZoomToAggregateMarkers = 14
    const aggregate = region ? zoom(region) < maxZoomToAggregateMarkers : true
    return (
      <Map
        mapRef={this.map}
        as={Aggregator}
        data={this.data}
        renderMarker={this.renderMarker}
        clusteringEnabled={aggregate}
        scrollEnabled={!this.props.watching}
        onRegionChangeComplete={this.onRegionChange}
        onPanDrag={this.onUnwatchPosition}
        onSelect={this.onSelect}
        region={this.props.watching ? region : undefined}
      >
        {this.isWithinBounds() && (
          <UserPositionMarker
            active={this.props.watching}
            address={{
              lat: this.props.userPosition.latitude,
              lng: this.props.userPosition.longitude
            }}
          />
        )}
      </Map>
    )
  }
}
