import Feed from '@/components/listings/Feed/Listing'
import Header from '@/components/listings/Feed/Header'
import InfiniteScroll from '@/containers/shared/InfiniteScroll'
import Card from '@/containers/listings/Card/Listing'
import Empty from './Empty'
import Loader from './FeedLoader'

export default function ListingFeedApp({type, ...props}) {
  return (
    <Loader as={InfiniteScroll} type={type} {...props}>
      {(state) => (
        <Feed
          {...props}
          {...state}
          Card={Card}
          ListHeaderComponent={Header}
          ListEmptyComponent={state.loading ? undefined : Empty}
        />
      )}
    </Loader>
  )
}
