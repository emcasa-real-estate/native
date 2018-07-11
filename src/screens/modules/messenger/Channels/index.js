import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withMessengerFeed} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import MessageForm from '@/components/messenger/Form'

class ConversationScreen extends PureComponent {
  static screenName = 'messenger.Channels'

  render() {
    const {channels, user} = this.props
    console.log(channels)
    return (
      <Shell disableKeyboardSpacer>
        <Body scroll loading={channels.loading}>
          {channels.data && null}
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withMessengerFeed,
  connect((state) => ({user: getUser(state)}))
)(ConversationScreen)
