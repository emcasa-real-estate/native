import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {loadMore} from '@/redux/modules/listings/feed'
import {
  getListings,
  getPagination,
  isLoading
} from '@/redux/modules/listings/feed/selectors'
import InfiniteScroll from '@/containers/InfiniteScroll'

import ListingScreen from '@/screens/modules/listing/Listing'

@connect(
  (state) => ({
    data: getListings(state, {type: 'search'}),
    pagination: getPagination(state, {type: 'search'}),
    loading: isLoading(state, {type: 'search'})
  }),
  {loadMore: loadMore('search')}
)
export default class FeedApp extends PureComponent {
  onLoadMore = () => {
    const {loadMore, loading} = this.props
    if (!loading) loadMore()
  }

  onSelect = (id) => {
    const {target} = this.props
    Navigation.push(target, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  render() {
    const {as: Feed, data, loading, pagination, ...props} = this.props
    return (
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
          {...props}
        />
      </InfiniteScroll>
    )
  }
}
