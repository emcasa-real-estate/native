import {Query} from 'react-apollo'

import {GET_CREDENTIALS, GET_USER_PROFILE} from '@/graphql/modules/user/queries'

export const withJwt = (Target) => (props) => (
  <Query query={GET_CREDENTIALS}>
    {({data}) => <Target {...props} jwt={data ? data.credentials.jwt : null} />}
  </Query>
)

export const withUserProfile = (Target) => (props) => (
  <Query query={GET_USER_PROFILE}>
    {({data}) => <Target {...props} user={data ? data.userProfile : null} />}
  </Query>
)
