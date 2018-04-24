import Feed from '@/components/listings/Feed/Related'
import Loader from './RelatedLoader'

export default function RelatedFeedApp({id, ...props}) {
  return (
    <Loader id={id} {...props}>
      <Feed {...props} />
    </Loader>
  )
}
