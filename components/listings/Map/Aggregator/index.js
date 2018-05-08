import _ from 'lodash/fp'
import React, {Component} from 'react'
import geolib from 'geolib'

import Marker from './Marker'

const coord = ({lat, lng}) => ({latitude: lat, longitude: lng})
const getDistance = (a, b) => geolib.getDistance(coord(a), coord(b)) / 1000
const isWithinCircle = (a, b, distance) =>
  geolib.isPointInCircle(coord(a), coord(b), distance * 1000)
const getCenter = (points) => {
  const point = geolib.getCenterOfBounds(points.map(coord))
  return {
    lng: parseFloat(point.longitude),
    lat: parseFloat(point.latitude)
  }
}

const closestPoint = (point, groups, range) =>
  groups.reduce((closest, group, index) => {
    const distance = getDistance(point, group.center)
    const closestGroup = closest && groups[closest.index]
    const isWithin = isWithinCircle(point, group.center, range)
    const isCloser = !closestGroup || closestGroup.distance > distance
    if (isWithin && isCloser) return {index, distance}
    return closest
  }, null)
const groupMarkers = (distance) => (groups, point) => {
  const closest = closestPoint(point, groups, distance)
  if (closest) {
    const group = groups[closest.index]
    const children = group.children.concat(point)
    groups[closest.index] = {
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
