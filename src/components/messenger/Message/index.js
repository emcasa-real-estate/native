import {View} from 'react-native'

import Avatar from './Avatar'
import Body from './Body'
import styles from './styles'

export default function Message({message, sender: user, isSender}) {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: isSender ? 'row' : 'row-reverse'}
      ]}
    >
      <View style={styles.bodyContainer}>
        <Body>{message}</Body>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar {...user} />
      </View>
    </View>
  )
}
