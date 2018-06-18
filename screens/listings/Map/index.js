import {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Navigation} from 'react-native-navigation'

import {loadMore} from '@/redux/modules/listings/feed'
import {
  getListings,
  getOptions,
  getPagination
} from '@/redux/modules/listings/feed/selectors'
import {
  watchPosition,
  unwatchPosition,
  requestPosition,
  setActiveListing
} from './module'
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
    data: getListings(state, {type: 'search'}),
    pagination: getPagination(state, {type: 'search'}),
    options: getOptions(state, {type: 'search'})
  }),
  {loadMore: loadMore('search')}
)
@connect(
  (state) => ({
    activeListing: getActiveListing(state),
    userPosition: getUserPosition(state),
    watchingPosition: isWatchingPosition(state)
  }),
  {watchPosition, unwatchPosition, requestPosition, setActiveListing}
)
export default class MapScreen extends Component {
  static screenName = 'listings.Map'

  static options = {
    topBar: {
      visible: true,
      animate: true,
      height: 50,
      title: {
        text: 'Buscar imóveis',
        alignment: 'center'
      },
      rightButtons: [
        {
          id: 'mapLocationButton',
          component: {name: HeaderButton.screenName}
        }
      ]
    }
  }

  loadAllMarkers() {
    const {loadMore, pagination} = this.props
    if (!pagination.remainingCount) return
    loadMore(pagination.remainingCount)
  }

  componentDidMount() {
    this.loadAllMarkers()
  }

  onToggleWatchPosition = (active) => () =>
    this.props[active ? 'watchPosition' : 'unwatchPosition'].call()

  onRequestPosition = () => this.props.requestPosition()

  onSelect = (id) => this.props.setActiveListing(id)

  render() {
    const {data, activeListing, watchingPosition, userPosition} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Map
            data={data}
            active={activeListing}
            position={userPosition}
            watching={watchingPosition}
            onSelect={this.onSelect}
            onRequestPosition={this.onRequestPosition}
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
