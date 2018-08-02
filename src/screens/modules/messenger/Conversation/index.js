import _ from 'lodash'
import {PureComponent} from 'react'
import {View, Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import * as colors from '@/assets/colors'
import composeWithRef from '@/lib/composeWithRef'
import {authRequired} from '@/containers/AuthRequired'
import {
  withListing,
  withMessages,
  withMarkAsReadMutation,
  withSendMessageMutation
} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import MessageForm from '@/components/messenger/Form'
import Conversation from '@/components/messenger/Conversation'

class ConversationScreen extends PureComponent {
  static screenName = 'messenger.Conversation'

  static options = {
    topBar: {
      title: {text: 'Entre em contato'}
    }
  }

  updateTitle() {
    const listing = this.props.listing.data
    const messages = this.props.messages.data
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text:
            messages && messages.user ? messages.user.name : 'Entre em contato',
          fontSize: 16
        },
        subtitle: {
          text: listing
            ? `${listing.address.street}, ${listing.address.neighborhood}`
            : '',
          fontSize: 10,
          color: colors.gray.light
        }
      }
    })
  }

  componentDidMount() {
    this.unsubscribe = this.props.messages.subscribe()
    this.updateTitle()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidUpdate(prev) {
    const getUser = (__) => _.get(__, 'messages.data.user')
    const getAddress = (__) => _.get(__, 'listing.data.address')
    if (
      !_.isEqual(getAddress(prev), getAddress(this.props)) ||
      !_.isEqual(getUser(prev), getUser(this.props))
    )
      this.updateTitle()
  }

  onSubmit = (message) => this.props.sendMessage({message})

  onMarkAsRead = (id) => this.props.markAsRead(id)

  render() {
    const {messages, loading, user} = this.props
    return (
      <Shell avoidKeyboard={Platform.OS !== 'ios'}>
        <Body loading={messages.loading || loading}>
          {messages.data && (
            <Conversation
              messages={messages.data.messages}
              receiver={messages.data.user}
              sender={user}
              onMarkAsRead={this.onMarkAsRead}
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
  authRequired(() => ({
    notice: 'O login é necessário para enviar mensagens.'
  })),
  connect((state) => ({user: getUser(state)})),
  withListing(({params: {listing: {id}}}) => ({id})),
  withMessages(({params: {listing}}) => ({listing})),
  withSendMessageMutation(({params: {listing, receiver}}) => ({
    listing,
    receiver
  })),
  withMarkAsReadMutation()
)(ConversationScreen)
