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
    requestAnimationFrame(this.requestInitialPermission)
  }

  componentDidUpdate() {
    const {watching, isWithinBounds, onWatchPosition} = this.props
    if (typeof watching === 'undefined' && isWithinBounds) onWatchPosition()
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
