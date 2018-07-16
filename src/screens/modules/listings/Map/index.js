import {Component} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
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
import HeaderButton from './HeaderButton'
import Map from './Map'
import styles from './styles'

import ListingScreen from '@/screens/modules/listing/Listing'

class MapScreen extends Component {
  static screenName = 'listings.Map'

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

  state = {active: false}

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'mapLocationButton',
            component: {name: HeaderButton.screenName}
          }
        ]
      }
    })
  }

  componentWillUnmount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {rightButtons: []}
    })
  }

  componentDidAppear() {
    this.setState({active: true})
  }

  componentDidDisappear() {
    this.setState({active: false})
  }

  onToggleWatchPosition = (active) => () =>
    this.props[active ? 'watchPosition' : 'unwatchPosition'].call()

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

  render() {
    const {
      listingsFeed: {data},
      activeListing,
      watchingPosition,
      isWithinBounds,
      userPosition
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
