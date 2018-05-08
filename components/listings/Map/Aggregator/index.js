import _ from 'lodash/fp'
import React, {Component} from 'react'
import geolib from 'geolib'

import Marker from './Marker'

const coord = ({lat, lng}) => ({latitude: lat, longitude: lng})

const distance = (a, b) => geolib.getDistance(coord(a), coord(b))
const center = (a, b) => geolib.getCenter(coord(a), coord(b))

export default class MarkerAggregator extends Component {
  static defaultProps = {
    distance: 0.5
  }

  state = {}

  static getDerivedStateFromProps({children, distance: diameter}) {
    const groups = []
    React.Children.forEach(children, ({props: {address}}, i) => {
      const {lat, lng} = address
      let min
      const distances = groups.map((group, index) => ({
        value: distance(address, group),
        index
      }))
      for (const {value, index} of distances) {
        if (value <= diameter && (!min || value <= min.value))
          min = {value, index}
      }
      if (min) {
        groups[min.index] = {
          ...center(address, groups[min.index]),
          children: groups[min.index].children.concat(i)
        }
      } else groups.push({lat, lng, children: [i]})
    })
    return {groups}
  }

  render() {
    const {enabled, children} = this.props
    const {groups} = this.state

    if (!enabled) return children
    return groups.map(({children, ...props}) => (
      <Marker key={`${children.join(',')}`} {...props}>
        {children.length}
      </Marker>
    ))
  }
}
