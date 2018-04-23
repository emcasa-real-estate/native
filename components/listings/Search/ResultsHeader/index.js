import {View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Text from '@/components/shared/Text'
import Link from '@/components/shared/Link'
import styles from './styles'

export default function Header({onPress, value}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon style={styles.icon} name="chevron-left" />
        <Text style={[styles.text, value && styles.textActive]}>
          {value ? 'Filtros aplicados' : 'Sem filtros'}
        </Text>
        <Link style={styles.button}>Filtrar</Link>
      </View>
    </TouchableOpacity>
  )
}
