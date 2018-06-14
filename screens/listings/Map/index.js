import {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Navigation} from 'react-native-navigation'

import {load} from '@/redux/modules/listings/feed'
import {
  getOptions,
  getPagination
} from '@/redux/modules/listings/feed/selectors'
import {watchPosition, unwatchPosition, setActiveListing} from './module'
import {
  getUserPosition,
  getActiveListing,
  isWatchingPosition
} from './module/selectors'
import ListButton from '@/components/listings/Feed/Button'
import HeaderButton from './HeaderButton'
import Map from './Map'
import Feed from './Feed'
import styles from './styles'

@connect(
  (state) => ({
    pagination: getPagination(state, {type: 'search'}),
    options: getOptions(state, {type: 'search'})
  }),
  {load}
)
@connect(
  (state) => ({
    activeListing: getActiveListing(state),
    userPosition: getUserPosition(state),
    watchingPosition: isWatchingPosition(state)
  }),
  {watchPosition, unwatchPosition, setActiveListing}
)
export default class MapScreen extends Component {
  static screen = 'listings.Map'

  static options = {
    topBar: {
      visible: true,
      animate: true,
      height: 50,
      title: {
        text: 'Buscar imóveis',
        alignment: 'center'
      }
    }
  }

  updateNavigationOptions() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'mapLocationButton',
            component: {name: HeaderButton.screen},
            passProps: this.props
          }
        ]
      }
    })
  }

  loadAllMarkers() {
    const {load, options, pagination} = this.props
    if (!pagination.remainingCount) return
    load('search', {
      ...options,
      page_size: pagination.remainingCount
    })
  }

  componentDidMount() {
    this.updateNavigationOptions()
    this.loadAllMarkers()
  }

  onToggleWatchPosition = (active) => () =>
    this.props[active ? 'watchPosition' : 'unwatchPosition'].call()

  onSelect = (id) => this.props.setActiveListing(id)

  render() {
    const {activeListing, watchingPosition, userPosition} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Map
            active={activeListing}
            position={userPosition}
            watching={watchingPosition}
            onSelect={this.onSelect}
            onWatchPosition={this.onToggleWatchPosition(true)}
            onUnwatchPosition={this.onToggleWatchPosition(false)}
          />
          <ListButton style={styles.button} onPress={this.onReturn} />
        </View>
        <View style={styles.listings}>
          <Feed active={activeListing} />
        </View>
      </View>
    )
  }
}
