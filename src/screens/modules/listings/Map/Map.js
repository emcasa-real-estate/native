import _ from 'lodash'
import React, {PureComponent} from 'react'

import {withPermission} from '@/containers/Permission'
import UserPositionMarker from '@/components/listings/Map/UserPosition'
import Map, {Marker, Aggregator} from '@/components/listings/Map'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

class MapApp extends PureComponent {
  state = {
    zoom: 12,
    region: {
      longitude: -43.2096142,
      latitude: -22.9608099,
      longitudeDelta: 0.1,
      latitudeDelta: 0.1
    }
  }

  map = React.createRef()

  requestInitialPermission = async () => {
    const permission = await this.props.onRequestPermission(false)
    if (permission === 'authorized') this.props.onRequestPosition()
  }

  animateToUserCoordinates = () =>
    this.map.current.getMapRef().animateToCoordinate(this.props.position)

  animateToUserRegion = () =>
    this.map.current.getMapRef().animateToRegion({
      ...this.props.position,
      longitudeDelta: 0.01,
      latitudeDelta: 0.01
    })

  constructor(props) {
    super(props)
    if (props.watching && props.isWithinBounds)
      this.state.region = {
        longitude: props.position.longitude,
        latitude: props.position.latitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01
      }
  }

  componentDidMount() {
    requestAnimationFrame(this.requestInitialPermission)
  }

  componentDidUpdate(prev) {
    const {watching, position, isWithinBounds, onWatchPosition} = this.props
    if (!isWithinBounds) return
    else if (typeof watching === 'undefined') onWatchPosition()
    else if (watching && !prev.watching) this.animateToUserRegion()
    else if (watching && !_.isEqual(prev.position, position))
      this.animateToUserCoordinates()
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

  onWatchPosition = async () => {
    if ((await this.props.onRequestPermission()) === 'authorized')
      this.props.onWatchPosition()
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
    const {watching, position, isWithinBounds} = this.props
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
        onRegionChangeComplete={this.onRegionChange}
        onSelect={this.onSelect}
        initialRegion={region}
      >
        {isWithinBounds && (
          <UserPositionMarker
            active={watching}
            address={{
              lat: position.latitude,
              lng: position.longitude
            }}
          />
        )}
      </Map>
    )
  }
}

export default withPermission('location', 'whenInUse')(MapApp)
