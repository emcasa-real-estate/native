import Feed from '@/components/listings/Feed/Listing'
import InfiniteScroll from '@/containers/shared/InfiniteScroll'
import Card from '@/containers/listings/Card/Listing'
import Loader from './FeedLoader'

export default function ListingFeedApp({type, ...props}) {
  return (
    <Loader as={InfiniteScroll} type={type} {...props}>
      {(state) => <Feed {...props} {...state} Card={Card} />}
    </Loader>
  )
}
