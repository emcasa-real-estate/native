import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withMessages, withSendMessageMutation} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body} from '@/components/layout'

class ConversationScreen extends PureComponent {
  static screenName = 'messenger.Conversation'

  render() {
    console.log(this.props)
    return (
      <Shell>
        <Body />
      </Shell>
    )
  }
}

export default composeWithRef(
  connect((state) => ({user: getUser(state)})),
  withMessages(({user, params}) => ({
    senderId: user.id,
    listingId: params.listingId
  })),
  withSendMessageMutation(({params}) => ({
    listingId: params.listingId
  }))
)(ConversationScreen)
