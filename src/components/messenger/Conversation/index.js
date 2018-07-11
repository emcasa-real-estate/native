import {View} from 'react-native'

import Message from '@/components/messenger/Message'
import styles from './styles'

export default function Conversation({messages, sender}) {
  let threadSenderId = undefined
  return (
    <View style={styles.container}>
      {messages.map((message) => {
        const showAvatar = threadSenderId !== message.sender.id
        threadSenderId = message.sender.id
        return (
          <Message
            key={message.id}
            isSender={sender.id == message.sender.id}
            showAvatar={showAvatar}
            {...message}
          />
        )
      })}
    </View>
  )
}
