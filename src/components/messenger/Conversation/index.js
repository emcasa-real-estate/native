import {View} from 'react-native'

import Message from '@/components/messenger/Message'

export default function Conversation({messages, sender}) {
  return (
    <View>
      {messages.map((message) => (
        <Message
          key={message.id}
          isSender={sender.id === message.sender.id}
          {...message}
        />
      ))}
    </View>
  )
}
