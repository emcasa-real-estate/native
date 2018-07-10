import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withMessages, withSendMessageMutation} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import MessageForm from '@/components/messenger/Form'

class ConversationScreen extends PureComponent {
  static screenName = 'messenger.Conversation'

  onSubmit = (message) => this.props.sendMessage({variables: {message}})

  render() {
    console.log(this.props)
    return (
      <Shell disableKeyboardSpacer>
        <Body scroll />
        <Footer>
          <MessageForm onSubmit={this.onSubmit} />
        </Footer>
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
