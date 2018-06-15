import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {loadMore} from '@/redux/modules/listings/feed'
import {
  getListings,
  getPagination,
  isLoading
} from '@/redux/modules/listings/feed/selectors'
import InfiniteScroll from '@/containers/shared/InfiniteScroll'
import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'
import MapButton from '@/components/listings/Map/Button'
import Map from '../Map'
import Empty from './Empty'
import Header from './Header'
import styles from './styles'

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
    pagination: getPagination(state, {type: 'search'}),
    loading: isLoading(state, {type: 'search'})
  }),
  {loadMore: loadMore('search')}
)
export default class ListingsFeedScreen extends PureComponent {
  static screen = 'listings.Feed'

  static options = {
    topBar: {
      visible: false,
      height: 0
    }
  }

  componentDidMount() {
    const {data} = this.props
    if (_.isEmpty(data)) this.onLoadMore()
  }

  onOpenMap = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: Map.screen,
        passProps: this.props
      }
    })
  }

  onLoadMore = () => {
    const {loading, loadMore} = this.props
    if (!loading) loadMore(15)
  }

  render() {
    const {data, pagination, loading} = this.props
    return (
      <View style={styles.container}>
        <InfiniteScroll
          loading={loading}
          pagination={pagination}
          onLoad={this.onLoadMore}
        >
          <Feed
            data={data}
            loading={loading}
            pagination={pagination}
            onSelect={this.onSelect}
            Card={Card}
            ListHeaderComponent={Header}
            ListEmptyComponent={loading ? undefined : Empty}
          />
        </InfiniteScroll>
        <MapButton style={styles.mapButton} onPress={this.onOpenMap} />
      </View>
    )
  }
}
