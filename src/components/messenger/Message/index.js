import {View} from 'react-native'

import Avatar from './Avatar'
import Body from './Body'
import styles from './styles'

export default function Message({message, sender: user, isSender, showAvatar}) {
  const align = !isSender ? 'right' : 'left'
  return (
    <View
      style={[
        styles.container,
        {flexDirection: align === 'right' ? 'row' : 'row-reverse'}
      ]}
    >
      <View style={styles.bodyContainer}>
        <Body align={align} isSender={isSender} showTip={showAvatar}>
          {message}
        </Body>
      </View>
      <View style={styles.avatarContainer}>
        {showAvatar && <Avatar {...user} />}
      </View>
    </View>
  )
}
