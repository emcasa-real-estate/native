import _ from 'lodash/fp'
import React, {Component} from 'react'
import ClusteredMapView from 'react-native-maps-super-cluster'

import Marker from './Marker'

export default class MarkerAggregator extends Component {
  static defaultProps = {
    distance: 0.5
  }

  state = {}

  renderCluster = ({pointCount, coordinate}) => {
    return <Marker coordinate={coordinate}>{pointCount}</Marker>
  }

  renderSinglePointCluster = ({location}) => {
    return <Marker coordinate={location}>1</Marker>
  }

  render() {
    const {clusteringEnabled, renderMarker} = this.props
    return (
      <ClusteredMapView
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
