import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withMessages, withSendMessageMutation} from '@/graphql/containers'
import {Shell, Body, Footer} from '@/components/layout'
import MessageForm from '@/components/messenger/Form'

class ConversationScreen extends PureComponent {
  static screenName = 'messenger.Conversation'

  onSubmit = (message) => this.props.sendMessage({variables: {message}})

  render() {
    // console.log(this.props)
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
  withMessages(({params: {listingId}}) => ({listingId})),
  withSendMessageMutation(({params: {listingId}}) => ({listingId}))
)(ConversationScreen)
