import {Query} from 'react-apollo'

import {GET_USER_LISTINGS} from '@/lib/graphql/queries/account'

export const withUserListings = (Target) => (props) => (
  <Query query={GET_USER_LISTINGS}>
    {(ctx) => <Target {...props} userListings={ctx} />}
  </Query>
)
