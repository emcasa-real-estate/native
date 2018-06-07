import {Query} from 'react-apollo'

import {GET_USER_LISTINGS} from '@/lib/graphql/queries/account'

export const withUserListings = (Target) => (props) => (
  <Query query={GET_USER_LISTINGS} fetchPolicy="network-only">
    {(response) => (
      <Target
        {...props}
        userListings={{
          loading: response.loading,
          data: response.data ? response.data.userListings : [],
          refetch: response.refetch
        }}
      />
    )}
  </Query>
)
