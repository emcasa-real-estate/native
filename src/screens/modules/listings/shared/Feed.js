import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import InfiniteScroll from '@/containers/InfiniteScroll'

import ListingScreen from '@/screens/modules/listing/Listing'

export default class FeedApp extends PureComponent {
  onLoadMore = () => {
    const {onLoadMore, loading} = this.props
    if (!loading) onLoadMore()
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
    const {as: Feed, data, loading, remainingCount, ...props} = this.props
    return (
      <InfiniteScroll
        loading={loading}
        hasNextPage={remainingCount !== 0}
        onLoad={this.onLoadMore}
      >
        <Feed
          data={data}
          loading={loading}
          onSelect={this.onSelect}
          {...props}
        />
      </InfiniteScroll>
    )
  }
}
