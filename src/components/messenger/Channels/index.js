import _ from 'lodash'
import {Fragment} from 'react'
import {View, TouchableHighlight} from 'react-native'

import * as format from '@/assets/format'
import Text from '@/components/shared/Text'
import Avatar from '@/components/messenger/UserAvatar'
import styles, {underlayColor} from './styles'

function Channel({receiver, messages, listing: {address}, onPress}) {
  const {insertedAt, message} = messages[0]
  return (
    <TouchableHighlight
      style={styles.channel}
      underlayColor={underlayColor}
      onPress={onPress}
    >
      <Fragment>
        <View>
          <Avatar {...receiver} />
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{receiver.name}</Text>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="middle">
            {address.street}, {address.neighborhood}
          </Text>
          <Text
            style={styles.lastMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {message.replace('\n', ' ')}
          </Text>
        </View>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.time}>{format.timeElapsed(insertedAt)}</Text>
        </View>
      </Fragment>
    </TouchableHighlight>
  )
}

const createHandler = (fun, ...args) => fun && (() => fun(...args))

export default function MessengerChannels({
  channels,
  sender,
  onSelect,
  ListEmptyComponent
}) {
  if (!channels.length && ListEmptyComponent) return <ListEmptyComponent />
  const receiver = ({participant1, participant2}) =>
    [participant1, participant2].find(({id}) => id != sender.id) || sender
  return (
    <View style={styles.container}>
      {_.orderBy(channels, ({messages: [{insertedAt}]}) => insertedAt, [
        'desc'
      ]).map((channel) => (
        <Channel
          key={channel.id}
          receiver={receiver(channel)}
          onPress={createHandler(onSelect, channel.id)}
          {...channel}
        />
      ))}
    </View>
  )
}
