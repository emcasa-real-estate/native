import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withMessengerFeed} from '@/graphql/containers'
import {getUser} from '@/redux/modules/auth/selectors'
import {Shell, Body} from '@/components/layout'
import Channels from '@/components/messenger/Channels'

import ConversationScreen from '@/screens/modules/messenger/Conversation'

class MessengerChannelsScreen extends PureComponent {
  static screenName = 'messenger.Channels'

  static options = {
    topBar: {
      title: {text: 'Mensagens'}
    }
  }

  getChannel(id) {
    return this.props.channels.data.find((chn) => chn.id == id)
  }

  getChannelParams(id) {
    const {listing, participant1: p1, participant2: p2} = this.getChannel(id)
    return {
      listing: {id: listing.id},
      receiver: [p1, p2].find((p) => p.id != this.props.user.id)
    }
  }

  componentDidMount() {
    this.props.channels.subscribe()
  }

  onSelect = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: ConversationScreen.screenName,
        passProps: {params: this.getChannelParams(id)}
      }
    })
  }

  render() {
    const {channels, user} = this.props
    return (
      <Shell>
        <Body scroll loading={channels.loading}>
          {channels.data && (
            <Channels
              channels={channels.data}
              sender={user}
              onSelect={this.onSelect}
            />
          )}
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withMessengerFeed,
  connect((state) => ({user: getUser(state)}))
)(MessengerChannelsScreen)
