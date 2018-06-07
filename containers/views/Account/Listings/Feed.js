import Feed from '@/components/listings/Feed/Listing'
import Card from '@/containers/listings/Card/Listing'
import {withUserListings} from '@/containers/account/UserListingsQuery'

function UserListingFeed({userListings, ...props}) {
  return (
    <Feed
      {...props}
      data={userListings.data}
      loading={userListings.loading}
      Card={Card}
    />
  )
}

export default withUserListings(UserListingFeed)
