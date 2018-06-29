import React, {PureComponent} from 'react'

import UserPositionMarker from '@/components/listings/Map/UserPosition'
import Map, {Marker, Aggregator} from '@/components/listings/Map'

const zoom = ({longitudeDelta}) =>
  Math.round(Math.log(360 / longitudeDelta) / Math.LN2)

export default class MapAndroid extends PureComponent {
  static defaultProps = {
    watching: undefined,
    data: []
  }

  state = {
    zoom: 12
  }

  map = React.createRef()

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
    const {data, watching} = this.props
    const {region} = this.state
    const maxZoomToAggregateMarkers = 14
    const aggregate = region ? zoom(region) < maxZoomToAggregateMarkers : true
    return (
      <Map
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={watching}
        mapClusterRef={this.map}
        as={Aggregator}
        data={data}
        renderMarker={this.renderMarker}
        clusteringEnabled={aggregate}
        onRegionChangeComplete={this.onRegionChange}
        onSelect={this.onSelect}
      />
    )
  }
}
