import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withMessages, withSendMessageMutation} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import MessageForm from '@/components/messenger/Form'
import Conversation from '@/components/messenger/Conversation'

class ConversationScreen extends PureComponent {
  static screenName = 'messenger.Conversation'

  componentDidMount() {
    this.unsubscribe = this.props.messages.subscribe()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onSubmit = (message) => this.props.sendMessage({variables: {message}})

  render() {
    const {messages, loading, user} = this.props
    return (
      <Shell disableKeyboardSpacer>
        <Body scroll loading={messages.loading || loading}>
          {messages.data && (
            <Conversation
              messages={messages.data.messages}
              receiver={messages.data.user}
              sender={user}
            />
          )}
        </Body>
        <Footer>
          <MessageForm onSubmit={this.onSubmit} />
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect((state) => ({user: getUser(state)})),
  withMessages(({params: {listing}}) => ({listing})),
  withSendMessageMutation(({params: {listing, receiver}}) => ({
    listing,
    receiver
  }))
)(ConversationScreen)
