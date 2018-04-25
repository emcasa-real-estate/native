import Feed from '@/components/listings/Feed/Listing'
import InfiniteScroll from '@/containers/shared/InfiniteScroll'
import Loader from './FeedLoader'

export default function ListingFeedApp({type, ...props}) {
  return (
    <Loader as={InfiniteScroll} type={type} {...props}>
      {(state) => <Feed {...props} {...state} />}
    </Loader>
  )
}
