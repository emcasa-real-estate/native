import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Text from '@/components/shared/Text'
import Link from '@/components/shared/Link'
import styles from './styles'

export default function Header({title, onReturn, onReset}) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={onReturn}>
          <Icon style={styles.buttonIcon} name="chevron-left" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Link style={styles.resetButton} onPress={onReset}>
        Limpar
      </Link>
    </View>
  )
}
