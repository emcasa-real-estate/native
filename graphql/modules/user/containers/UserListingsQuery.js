import {Query} from 'react-apollo'

import createContainer from '@/graphql/createContainer'
import {GET_USER_LISTINGS} from '@/graphql/modules/user/queries'

export const withUserListings = (Target) =>
  createContainer(
    (props, ref) => (
      <Query
        query={GET_USER_LISTINGS}
        fetchPolicy={
          process.env.NODE_ENV === 'e2e' ? 'cache-and-network' : 'network-only'
        }
      >
        {(response) => (
          <Target
            {...props}
            ref={ref}
            userListings={{
              loading: response.loading,
              data: response.data ? response.data.userListings : [],
              refetch: response.refetch
            }}
          />
        )}
      </Query>
    ),
    Target
  )
