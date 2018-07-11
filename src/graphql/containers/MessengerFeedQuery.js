import {Query} from 'react-apollo'
import {compose, mapProps} from 'recompose'

import {GET_MESSAGE_CHANNELS} from '@/graphql/modules/messenger/queries'

export const withMessengerFeed = (Target) => (props) => (
  <Query query={GET_MESSAGE_CHANNELS}>
    {({data, ...response}) => (
      <Target
        {...props}
        channels={{
          loading: response.loading,
          data: data ? data.userChannels : undefined,
          refetch: response.refetch
        }}
      />
    )}
  </Query>
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
