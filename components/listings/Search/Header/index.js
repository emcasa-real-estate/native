import {View, TouchableOpacity} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Link from '@/components/shared/Link'
import styles, {iconColor} from './styles'

export default function Header({title, onReturn, onReset}) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={onReturn}>
          <Icon name="chevron-left" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Link style={styles.resetButton} onPress={onReset}>
        Limpar
      </Link>
    </View>
  )
}
