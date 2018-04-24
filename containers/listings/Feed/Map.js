import Feed from '@/components/listings/Feed/Map'
import InfiniteScroll from '@/containers/shared/InfiniteScroll'
import Loader from './FeedLoader'

export default function MapFeedApp({type, ...props}) {
  return (
    <Loader as={InfiniteScroll} direction="horizontal" type={type} {...props}>
      <Feed {...props} />
    </Loader>
  )
}
