import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withListingsFeed} from '@/graphql/containers'
import {Shell, Body, Header, Footer} from '@/components/layout'
import MapButton from '@/components/listings/Map/Button'
import ListingFeed from '@/components/listings/Feed/Listing'
import BottomTabs from '@/screens/modules/navigation/BottomTabs'
import Feed from '@/screens/modules/listings/shared/Feed'
import Card from '@/screens/modules/listings/shared/Card'
import SearchHeader from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'
import styles from './styles'

import MapScreen from '@/screens/modules/listings/Map'
import SearchScreen from '@/screens/modules/listings/Search'

class ListingsFeedScreen extends PureComponent {
  static screenName = 'listings.Feed'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      translucent: true,
      height: 0,
      backButtonTitle: 'Imóveis'
    }
  }

  onLoadMore = () => {
    const {listingsFeed: {loading, fetchMore}} = this.props
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

  render() {
    const {
      listingsFeed: {loading, data, remainingCount},
      componentId
    } = this.props
    return (
      <Shell testID="@listings.Feed">
        <Header>
          <SearchHeader onPress={this.onOpenSearch} />
        </Header>
        <Body loading={loading} style={styles.container}>
          <Feed
            as={ListingFeed}
            target={componentId}
            Card={Card}
            data={data}
            remainingCount={remainingCount}
            onLoadMore={this.onLoadMore}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={
              loading === false && !data.length ? ListEmpty : undefined
            }
          />
          <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
        </Body>
        <Footer>
          <BottomTabs />
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  withListingsFeed({pageSize: 15, fetchPolicy: 'network-only'})
)(ListingsFeedScreen)
