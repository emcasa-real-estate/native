import _ from 'lodash'
import {Query} from 'react-apollo'
import {connect} from 'react-redux'

import {GET_MESSAGES} from '@/graphql/modules/messenger/queries'
import {MESSAGE_SENT} from '@/graphql/modules/messenger/subscriptions'
import {getUser} from '@/redux/modules/auth/selectors'

const MessengerQuery = connect((state) => ({
  sender: getUser(state)
}))(function _MessengerQuery({children, listing, sender, ...options}) {
  const isThisChannel = (message) =>
    message.listing.id == listing.id &&
    (message.sender.id == sender.id || message.receiver.id == sender.id)
  return (
    <Query
      notifyOnNetworkStatusChange
      query={GET_MESSAGES}
      variables={{listingId: listing.id, senderId: sender.id}}
      {...options}
    >
      {({subscribeToMore, ...response}) =>
        children({
          ...response,
          subscribeToMoreMessages: () =>
            subscribeToMore({
              document: MESSAGE_SENT,
              updateQuery: (prev, {subscriptionData}) => {
                const newMessage = subscriptionData.data.messageSent
                if (!isThisChannel(newMessage)) return prev
                return _.defaultsDeep(
                  {
                    listingUserMessages: {
                      messages: (
                        prev.listingUserMessages.messages || []
                      ).concat(newMessage)
                    }
                  },
                  prev
                )
              }
            })
        })
      }
    </Query>
  )
})

MessengerQuery.defaultProps = {
  fetchPolicy: 'cache-and-network'
}

export const withMessages = (getOptions) => (Target) => (props) => (
  <MessengerQuery {...(getOptions ? getOptions(props) : {})}>
    {({data, ...response}) => (
      <Target
        {...props}
        messages={{
          loading: response.loading,
          data: data ? data.listingUserMessages : undefined,
          refetch: response.refetch,
          subscribe: response.subscribeToMoreMessages
        }}
      />
    )}
  </MessengerQuery>
)
