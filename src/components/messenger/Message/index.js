import {View} from 'react-native'
import moment from 'moment'

import Text from '@/components/shared/Text'
import Avatar from './Avatar'
import Body from './Body'
import styles from './styles'

export default function Message({
  style,
  message,
  insertedAt,
  sender: user,
  isSender,
  showAvatar
}) {
  const align = !isSender ? 'left' : 'right'
  return (
    <View
      style={[
        styles.container,
        {flexDirection: align === 'right' ? 'row' : 'row-reverse'},
        style
      ]}
    >
      <View style={styles.bodyContainer}>
        <Body align={align} isSender={isSender} showTip={showAvatar}>
          <Text selectable style={[styles.text, {textAlign: align}]}>
            {message}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {moment.utc(insertedAt).format('HH:mm, DD [de] MMMM')}{' '}
              {String.fromCharCode(0x2500)} {user.name.split(' ')[0]}
            </Text>
          </View>
        </Body>
      </View>
      <View style={styles.avatarContainer}>
        {showAvatar && <Avatar {...user} isSender={isSender} />}
      </View>
    </View>
  )
}
