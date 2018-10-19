import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withListingsFeed} from '@/graphql/containers'
import {getSearchFiltersQuery} from '@/screens/modules/listings/Search/module/selectors'
import {Shell, Body, Header} from '@/components/layout'
import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'
import InfiniteScroll from '@/containers/InfiniteScroll'
import Feed from '@/components/listings/Feed/Listing'
import LocationSearch from '../Search/Location'
import SearchHeader from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'
import styles from './styles'

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

  state = {
    modalActive: false
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

  onOpenFilters = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SearchScreen.screenName,
        passProps: this.props
      }
    })
  }

  onToggleLocationSearch = () =>
    this.setState({modalActive: !this.state.modalActive})

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
    const {modalActive} = this.state
    return (
      <Shell
        testID="@listings.Feed"
        bottomTabs={{
          icon: modalActive ? 'check' : 'map-marker-alt',
          onPress: this.onToggleLocationSearch
        }}
      >
        <LocationSearch visible={modalActive} zIndex={2} />
        <Header>
          <SearchHeader onPress={this.onOpenFilters} />
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
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect((state) => ({filters: getSearchFiltersQuery(state)})),
  withListingsFeed({pageSize: 15, fetchPolicy: 'network-only'})
)(ListingsFeedScreen)
