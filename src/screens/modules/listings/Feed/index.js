import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withListingsFeed} from '@/graphql/containers'
import {getSearchFiltersQuery} from '@/screens/modules/listings/Search/module/selectors'
import {Shell, Body, Header} from '@/components/layout'
import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'
import InfiniteScroll from '@/containers/InfiniteScroll'
import MapButton from '@/components/listings/Map/Button'
import Feed from '@/components/listings/Feed/Listing'
import SearchHeader from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'
import styles from './styles'

import MapScreen from '@/screens/modules/listings/Map'
import SearchScreen from '@/screens/modules/listings/Search'
import ListingScreen from '@/screens/modules/listing/Listing'

class ListingsFeedScreen extends PureComponent {
  static screenName = 'listings.Feed'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      translucent: true,
      height: 0,
      backButton: {title: 'Imóveis'}
    }
  }

  componentDidDisappear() {
    const {
      listingsFeed: {loading, updateBlacklists}
    } = this.props
    if (!loading) updateBlacklists()
  }

  onLoadMore = () => {
    const {
      listingsFeed: {loading, fetchMore}
    } = this.props
    if (!loading) fetchMore()
  }

  onOpenMap = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MapScreen.screenName,
        passProps: this.props
      }
    })
  }

  onOpenSearch = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SearchScreen.screenName,
        passProps: this.props
      }
    })
  }

  onSelect = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  render() {
    const {
      listingsFeed: {loading, data, remainingCount}
    } = this.props
    return (
      <Shell
        testID="@listings.Feed"
        bottomTabs={{
          icon: 'map-marker-alt',
          onPress: this.onPressTabButton
        }}
      >
        <Header>
          <SearchHeader onPress={this.onOpenSearch} />
        </Header>
        <Body loading={loading} style={styles.container}>
          <InfiniteScroll
            loading={loading}
            hasNextPage={remainingCount > 0}
            onLoad={this.onLoadMore}
          >
            <BottomTabsAvoidingScrollView>
              <Feed
                automaticallyAdjustContentInsets={false}
                data={data}
                onSelect={this.onSelect}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                  loading === false && !data.length ? ListEmpty : undefined
                }
              />
            </BottomTabsAvoidingScrollView>
          </InfiniteScroll>
          <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect((state) => ({filters: getSearchFiltersQuery(state)})),
  withListingsFeed({pageSize: 15, fetchPolicy: 'network-only'})
)(ListingsFeedScreen)
