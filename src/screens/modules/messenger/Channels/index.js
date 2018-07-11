import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withMessengerFeed} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body} from '@/components/layout'
import Channels from '@/components/messenger/Channels'

class MessengerChannelsScreen extends PureComponent {
  static screenName = 'messenger.Channels'

  render() {
    const {channels, user} = this.props
    return (
      <Shell>
        <Body scroll loading={channels.loading}>
          {channels.data && <Channels channels={channels.data} sender={user} />}
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withMessengerFeed,
  connect((state) => ({user: getUser(state)}))
)(MessengerChannelsScreen)
