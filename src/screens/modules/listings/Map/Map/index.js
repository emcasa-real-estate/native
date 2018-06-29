import {PureComponent} from 'react'
import {Platform} from 'react-native'

import {withPermission} from '@/containers/Permission'
import MapIOS from './MapIOS'
import MapAndroid from './MapAndroid'

const MapView = Platform.select({
  android: MapAndroid,
  ios: MapIOS
})

@withPermission('location', 'whenInUse')
export default class MapApp extends PureComponent {
  requestInitialPermission = async () => {
    const permission = await this.props.onRequestPermission(false)
    if (permission === 'authorized') this.props.onRequestPosition()
  }

  componentDidMount() {
    const {watching, isWithinBounds, onWatchPosition} = this.props
    if (typeof watching === 'undefined') {
      if (isWithinBounds) onWatchPosition()
      else requestAnimationFrame(this.requestInitialPermission)
    }
  }

  shouldWatchPosition = async () => {
    if (!this.props.isWithinBounds) {
      return false
    }
    const permission = await this.props.onRequestPermission()
    if (this.props.watching || permission !== 'authorized') return false
    return true
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
    const permission = await this.props.onRequestPermission()
    if (permission === 'authorized') this.props.onWatchPosition()
  }

  render() {
    return (
      <MapView
        {...this.props}
        data={this.data}
        onWatchPosition={this.onWatchPosition}
      />
    )
  }
}
