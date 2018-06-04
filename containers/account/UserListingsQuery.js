import {Query} from 'react-apollo'

import {GET_USER_LISTINGS} from '@/lib/graphql/queries/account'

export const withUserListings = (Target) => (props) => (
  <Query query={GET_USER_LISTINGS}>
    {(response) => (
      <Target
        {...props}
        userListings={{
          loading: response.loading,
          data: response.data ? response.data.userListing : []
        }}
      />
    )}
  </Query>
)
