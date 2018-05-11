import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Avatar from '@/components/account/Avatar'
import styles from './styles'

const firstName = ({name}) => name.split(' ')[0]

export default function Header({user}) {
  return (
    <View style={styles.container}>
      <Avatar />
      {user && <Text style={styles.title}>Olá, {firstName(user)}</Text>}
    </View>
  )
}
