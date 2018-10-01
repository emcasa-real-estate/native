import {Query} from 'react-apollo'

import {GET_USER_LISTINGS} from '@/graphql/modules/user/queries'

export const withUserListings = (Target) => (props) => (
  <Query query={GET_USER_LISTINGS} fetchPolicy="cache-and-network">
    {(response) => (
      <Target
        {...props}
        userListings={{
          loading: response.loading,
          data:
            response.data && response.data.userProfile
              ? response.data.userProfile.listings
              : [],
          refetch: response.refetch
        }}
      />
    )}
  </Query>
)
