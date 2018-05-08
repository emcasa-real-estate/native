import _ from 'lodash'
import React, {Component} from 'react'
import geolib from 'geolib'

import Marker from './Marker'

const coord = ({lat, lng}) => ({latitude: lat, longitude: lng})
const getDistance = (a, b) => geolib.getDistance(coord(a), coord(b)) / 1000
const getCenter = (points) => {
  const point = geolib.getCenter(points.map(coord))
  return {
    lng: parseFloat(point.longitude),
    lat: parseFloat(point.latitude)
  }
}

const closestPoint = (point, groups, range) =>
  groups.reduce((closestIdx, group, index) => {
    const distance = getDistance(point, group)
    const closest = closestIdx && groups[closestIdx]
    //console.log(point.index, range, distance, group)
    if (distance <= range && (!closest || closest.value > distance.value))
      return index
    return closestIdx
  }, null)
const groupMarkers = (distance) => (groups, point) => {
  let index = closestPoint(point, _.map(groups, 'center'), distance)
  if (index !== null) {
    const group = groups[index]
    const children = group.children.concat(point)
    groups[index] = {
      center: getCenter(children),
      children
    }
  } else
    groups.push({center: {lng: point.lng, lat: point.lat}, children: [point]})
  return groups
}

export default class MarkerAggregator extends Component {
  static defaultProps = {
    distance: 0.5
  }

  state = {}

  static getDerivedStateFromProps({children, distance}) {
    const points = React.Children.map(children, ({props: {address}}, i) => ({
      index: i,
      lng: address.lng,
      lat: address.lat
    }))
    const groups = points.reduce(groupMarkers(distance), []).map((group) => ({
      ...group,
      key: group.children.map((point) => point.index).join(',')
    }))
    console.log(groups)
    return {
      groups
    }
  }

  render() {
    const {enabled, children} = this.props
    const {groups} = this.state

    if (!enabled) return children
    return groups.map(({key, children, center}) => (
      <Marker key={key} {...center}>
        {children.length}
      </Marker>
    ))
  }
}
