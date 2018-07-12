import {View, Image} from 'react-native'

import UserAvatar from '@/components/account/Avatar'
import styles from './styles'

function AdminAvatar() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('@/assets/img/icon-android.png')}
      />
    </View>
  )
}

export default function MessengerAvatar({role}) {
  return (
    <View>
      {role === 'user' && <UserAvatar />}
      {role === 'admin' && <AdminAvatar />}
    </View>
  )
}
