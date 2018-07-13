import {View} from 'react-native'

import Message from '@/components/messenger/Message'
import styles from './styles'

export default function Conversation({messages, sender}) {
  let previousMessage = undefined
  return (
    <View style={styles.container}>
      {messages.map((message) => {
        const showAvatar =
          !previousMessage || previousMessage.sender.id !== message.sender.id
        const marginTop = showAvatar && previousMessage ? 10 : 0
        previousMessage = message
        return (
          <Message
            key={message.id}
            style={{marginTop}}
            isSender={sender.id == message.sender.id}
            showAvatar={showAvatar}
            {...message}
          />
        )
      })}
    </View>
  )
}
