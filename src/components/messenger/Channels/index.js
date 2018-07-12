import {Fragment} from 'react'
import {View, TouchableHighlight} from 'react-native'

import * as format from '@/assets/format'
import Text from '@/components/shared/Text'
import styles, {underlayColor} from './styles'

const initials = (name) => {
  const nameParts = name.split(' ', 2)
  if (nameParts.length === 1) return name.slice(0, 2).toUpperCase()
  else return (name[0][0] + name[1][0]).toUpperCase()
}

function Avatar({name}) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials(name)}</Text>
    </View>
  )
}

function Channel({
  receiver,
  listing: {address},
  lastMessage: {insertedAt, message},
  onPress
}) {
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

export default function MessengerChannels({channels, sender, onSelect}) {
  const receiver = ({participant1, participant2}) =>
    [participant1, participant2].find(({id}) => id != sender.id) || sender
  return (
    <View style={styles.container}>
      {channels.map((channel) => (
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
