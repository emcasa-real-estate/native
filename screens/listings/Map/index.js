import {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Navigation} from 'react-native-navigation'

import {load} from '@/redux/modules/listings/feed'
import {
  getOptions,
  getPagination
} from '@/redux/modules/listings/feed/selectors'
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

  state = {
    active: undefined,
    watchingPosition: false
  }

  updateNavigationOptions() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'mapLocationButton',
            component: {name: HeaderButton.screen},
            passProps: {
              onPress: () => this.onToggleWatchPosition()
            }
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
    this.props.eventEmitter.emitToScreen('mapLocationButton', 'onToggle')

  onSelect = (id) =>
    this.setState(({active}) => ({active: id === active ? null : id}))

  render() {
    const {active} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Map
            active={active}
            onSelect={this.onSelect}
            onWatchPosition={this.onToggleWatchPosition(true)}
            onUnwatchPosition={this.onToggleWatchPosition(false)}
          />
          <ListButton style={styles.button} onPress={this.onReturn} />
        </View>
        <View style={styles.listings}>
          <Feed active={active} />
        </View>
      </View>
    )
  }
}
