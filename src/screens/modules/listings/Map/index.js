import {Component} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withPermission} from '@/containers/Permission'
import {withListingsFeed} from '@/graphql/containers'
import {getSearchFiltersQuery} from '@/screens/modules/listings/Search/module/selectors'
import {
  watchPosition,
  unwatchPosition,
  requestPosition,
  setActiveListing
} from './module'
import {
  getUserPosition,
  getActiveListing,
  isWatchingPosition,
  isWithinBounds
} from './module/selectors'
import ListButton from '@/components/listings/Feed/Button'
import Feed from '@/components/listings/Feed/Map'
import {LocationHeaderButton, FilterHeaderButton} from './HeaderButton'
import Map from './Map'
import styles from './styles'

import ListingScreen from '@/screens/modules/listing/Listing'
import FilterScreen from '@/screens/modules/listings/Search'

class MapScreen extends Component {
  static screenName = 'listings.Map'

  static options = {
    topBar: {
      visible: true,
      animate: true,
      height: 50,
      title: {text: 'Buscar imóveis'}
    }
  }

  state = {active: false}

  componentWillUnmount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {rightButtons: []}
    })
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'map_filter_button',
            component: {
              name: FilterHeaderButton.screenName,
              passProps: {onPress: this.onShowFilters}
            }
          },
          {
            id: 'map_location_button',
            component: {
              name: LocationHeaderButton.screenName,
              passProps: {onPress: this.onToggleWatchPosition()}
            }
          }
        ]
      }
    })
    this.setState({active: true})
  }

  componentDidDisappear() {
    this.setState({active: false})
  }

  onToggleWatchPosition = (activeState) => async () => {
    const isActive =
      typeof activeState === 'undefined'
        ? this.props.watchingPosition
        : activeState
    if (isActive) this.props.unwatchPosition()
    else if ((await this.props.onRequestPermission()) === 'authorized')
      this.props.watchPosition()
  }

  onRequestPosition = () => this.props.requestPosition()

  onOpenListing = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  onSelect = (id) => this.props.setActiveListing(id)

  onReturn = () => Navigation.pop(this.props.componentId)

  onShowFilters = () =>
    Navigation.push(this.props.componentId, {
      component: {name: FilterScreen.screenName}
    })

  render() {
    const {
      listingsFeed: {data},
      activeListing,
      watchingPosition,
      isWithinBounds,
      userPosition,
      onRequestPermission
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          {this.state.active && (
            <Map
              data={data}
              active={activeListing}
              position={userPosition}
              watching={watchingPosition}
              isWithinBounds={isWithinBounds}
              onSelect={this.onSelect}
              onRequestPosition={this.onRequestPosition}
              onWatchPosition={this.onToggleWatchPosition(true)}
              onUnwatchPosition={this.onToggleWatchPosition(false)}
              onRequestPermission={onRequestPermission}
            />
          )}
          <ListButton style={styles.button} onPress={this.onReturn} />
        </View>
        <View style={styles.listings}>
          <Feed
            active={activeListing}
            data={data}
            onSelect={this.onOpenListing}
          />
        </View>
      </View>
    )
  }
}

export default composeWithRef(
  withPermission('location', 'whenInUse'),
  connect(
    (state) => ({
      activeListing: getActiveListing(state),
      userPosition: getUserPosition(state),
      watchingPosition: isWatchingPosition(state),
      isWithinBounds: isWithinBounds(state)
    }),
    {watchPosition, unwatchPosition, requestPosition, setActiveListing}
  ),
  connect((state) => ({filters: getSearchFiltersQuery(state)})),
  withListingsFeed({pageSize: 1000, fetchPolicy: 'cache-then-network'})
)(MapScreen)
