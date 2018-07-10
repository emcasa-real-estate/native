import {Query} from 'react-apollo'

import {GET_MESSAGES} from '@/graphql/modules/messenger/queries'

function MessengerQuery({children, listingId, senderId, ...options}) {
  return (
    <Query query={GET_MESSAGES} variables={{listingId, senderId}} {...options}>
      {children}
    </Query>
  )
}

export const withMessages = (getOptions) => (Target) => (props) => (
  <MessengerQuery {...(getOptions ? getOptions(props) : {})}>
    {({data, ...response}) => (
      <Target
        {...props}
        messages={{
          loading: response.loading,
          data: data ? data.messages : undefined,
          refetch: response.refetch
        }}
      />
    )}
  </MessengerQuery>
)
