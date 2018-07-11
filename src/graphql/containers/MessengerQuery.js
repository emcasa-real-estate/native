import {Query} from 'react-apollo'
import {connect} from 'react-redux'

import {GET_MESSAGES} from '@/graphql/modules/messenger/queries'
import {getUser} from '@/redux/modules/auth/selectors'

const MessengerQuery = connect((state) => ({sender: getUser(state)}))(
  function _MessengerQuery({children, listingId, sender, ...options}) {
    return (
      <Query
        query={GET_MESSAGES}
        variables={{listingId, senderId: sender.id}}
        {...options}
      >
        {children}
      </Query>
    )
  }
)

MessengerQuery.defaultProps = {
  sender: {}
}

export const withMessages = (getOptions) => (Target) => (props) => (
  <MessengerQuery {...(getOptions ? getOptions(props) : {})}>
    {({data, ...response}) => (
      <Target
        {...props}
        messages={{
          loading: response.loading,
          data: data ? data.listingUserMessages : undefined,
          refetch: response.refetch
        }}
      />
    )}
  </MessengerQuery>
)
