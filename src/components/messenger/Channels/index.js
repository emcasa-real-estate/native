import {View} from 'react-native'
import moment from 'moment'

import Text from '@/components/shared/Text'
import styles from './styles'

function Channel({
  listing,
  unreadCount,
  lastMessage: {insertedAt, receiver, message}
}) {
  return (
    <View style={styles.channel}>
      <View style={styles.avatar}>
        {/*
        <Avatar {...receiver} />
        */}
      </View>
      <View style={styles.body}>
        <Text>{receiver.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {message}
        </Text>
      </View>
      <View style={styles.stats}>
        <Text>{moment(insertedAt).from(Date.now())}</Text>
      </View>
    </View>
  )
}

export default function MessengerChannels({channels}) {
  return (
    <View style={styles.container}>
      {channels.map((channel) => <Channel key={channel.id} {...channel} />)}
    </View>
  )
}
