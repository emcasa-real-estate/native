import {PureComponent} from 'react'
import {Dimensions} from 'react-native'
import ClusteredMapView from 'react-native-maps-super-cluster'

import Marker from './Marker'

export default class MarkerAggregator extends PureComponent {
  static defaultProps = {
    maxZoom: 14
  }

  state = {}

  get radius() {
    return Dimensions.get('window').width / 100 * 10
  }

  renderCluster = ({pointCount, coordinate, clusterId}) => {
    return (
      <Marker key={`cluster.${clusterId}`} coordinate={coordinate}>
        {pointCount}
      </Marker>
    )
  }

  renderSinglePointCluster = ({listing: {id}, location}) => {
    return (
      <Marker key={`listing.${id}`} coordinate={location}>
        1
      </Marker>
    )
  }

  render() {
    const {clusteringEnabled, renderMarker} = this.props
    return (
      <ClusteredMapView
        radius={this.radius}
        {...this.props}
        animateClusters
        renderCluster={this.renderCluster}
        renderMarker={
          clusteringEnabled ? this.renderSinglePointCluster : renderMarker
        }
      />
    )
  }
}
