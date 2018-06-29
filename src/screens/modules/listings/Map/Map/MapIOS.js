import React, {PureComponent} from 'react'
import {Alert} from 'react-native'
import geolib from 'geolib'

import {withPermission} from '@/containers/Permission'
import UserPositionMarker from '@/components/listings/Map/UserPosition'
import Map, {Marker, Aggregator} from '@/components/listings/Map'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

export default class MapIOS extends PureComponent {
  static defaultProps = {
    watching: undefined,
    data: []
  }

  state = {
    authorized: false,
    region: undefined,
    // initial position
    lat: -22.9608099,
    lng: -43.2096142,
    zoom: 12
  }

  map = React.createRef()

  static getDerivedStateFromProps(props, state) {
    if (!props.watching || !props.position) return null
    if (state.region) {
      return {
        region: {
          ...state.region,
          ...props.position
        }
      }
    } else {
      return {
        region: {
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...props.position
        }
      }
    }
  }

  requestInitialPosition = async () => {
    const permission = await this.props.onRequestPermission(false)
    if (permission !== 'authorized') return
    this.props.onRequestPosition()
  }

  focusOnUserPosition = () => {
    const region = {
      longitudeDelta: 0.01,
      latitudeDelta: 0.01,
      ...this.props.position
    }
    this.setState({
      region
    })
    this.map.current.getMapRef().animateToRegion(region)
  }

  isWithinBounds() {
    const {position} = this.props
    if (!position) return undefined
    // Vista Chinesa - RJ
    const centerOfRJ = {
      latitude: -22.9730992,
      longitude: -43.2524123
    }
    const distance = 17 * 1000
    return geolib.isPointInCircle(position, centerOfRJ, distance)
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

  componentDidUpdate(prev) {
    const {watching, position} = this.props
    if (
      watching &&
      position &&
      (prev.watching !== watching || prev.position !== position)
    ) {
      this.focusOnUserPosition()
    }
  }

  onRegionChange = (region) =>
    this.setState({
      lat: region.latitude,
      lng: region.longitude,
      region
    })

  onSelect = (id) => () => this.props.onSelect(id)

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
        mapClusterRef={this.map}
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
              lat: this.props.position.latitude,
              lng: this.props.position.longitude
            }}
          />
        )}
      </Map>
    )
  }
}
