import _ from 'lodash'
import {Query} from 'react-apollo'
import {compose, mapProps} from 'recompose'

import {GET_CHANNEL_FEED} from '@/graphql/modules/messenger/queries'
import {MESSAGE_SENT} from '@/graphql/modules/messenger/subscriptions'

function MessengerFeedQuery({children}) {
  const hasParticipant = (chn, user) =>
    [chn.participant1, chn.participant2].findIndex(({id}) => id == user.id) !==
    -1
  const findChannelIndex = (channels, message) =>
    channels.findIndex(
      (chn) =>
        chn.listing.id == message.listing.id &&
        hasParticipant(chn, message.sender) &&
        hasParticipant(chn, message.receiver)
    )
  return (
    <Query query={GET_CHANNEL_FEED}>
      {({subscribeToMore, ...response}) =>
        children({
          ...response,
          subscribeToMoreMessages: () =>
            subscribeToMore({
              document: MESSAGE_SENT,
              updateQuery: (prev, {subscriptionData}) => {
                const newMessage = subscriptionData.data.messageSent
                const channels = [...(prev.userChannels || [])]
                const channelIndex = findChannelIndex(channels, newMessage)
                if (channelIndex === -1) {
                  response.refetch()
                  return prev
                }
                const channel = channels[channelIndex]
                channels.splice(channelIndex, 1, {
                  ...channel,
                  lastMessage: newMessage,
                  unreadCount: channel.unreadCount + 1
                })
                return _.defaultsDeep({userChannels: channels}, prev)
              }
            })
        })
      }
    </Query>
  )
}

MessengerFeedQuery.defaultProps = {
  fetchPolicy: 'cache-and-network'
}

export const withMessengerFeed = (Target) => (props) => (
  <MessengerFeedQuery query={GET_CHANNEL_FEED}>
    {({data, ...response}) => (
      <Target
        {...props}
        channels={{
          loading: response.loading,
          data: data ? data.userChannels : undefined,
          refetch: response.refetch,
          subscribe: response.subscribeToMoreMessages
        }}
      />
    )}
  </MessengerFeedQuery>
)

export const withMessengerUnreadCount = compose(
  withMessengerFeed,
  mapProps(({channels, ...props}) => ({
    ...props,
    unreadCount: (channels.data || []).reduce(
      (count, {unreadCount}) => count + unreadCount,
      0
    )
  }))
)
