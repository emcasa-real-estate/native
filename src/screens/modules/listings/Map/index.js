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
import MapFeed from '@/components/listings/Feed/Map'
import Feed from '@/screens/modules/listings/shared/Feed'
import HeaderButton from './HeaderButton'
import Map from './Map'
import styles from './styles'

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

  onSelect = (id) => this.props.setActiveListing(id)

  onReturn = () => Navigation.pop(this.props.componentId)

  render() {
    const {
      listingsFeed: {data, remainingCount},
      activeListing,
      watchingPosition,
      isWithinBounds,
      userPosition,
      componentId
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
            as={MapFeed}
            target={componentId}
            active={activeListing}
            data={data}
            remainingCount={remainingCount}
            onLoadMore={() => null}
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
